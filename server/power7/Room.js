// --------------------------------------------------------
// 七雄争霸房间核心逻辑
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const round = require('../common/Round');
const dblog = require('../../protocol/DBLog');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const PREPARE = require('../../protocol/MSG_POWER7_PREPARE_FAIL_PWCL')['MSG_POWER7_PREPARE_FAIL_PWCL'];
const PLAYOBJECT = require('../../protocol/MSG_POWER7_PLAYOBJECT_PWCL')['MSG_POWER7_PLAYOBJECT_PWCL'];

const MIN_PLAYER_COUNT = 3; // 最少玩家数量
const ROUND_SESSION_COUNT = 3; // 每轮场次数

function ResetData(isAll) {
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (isAll) this.playerList[i].isOut = null;
        this.playerList[i].betCoin = null;
        this.playerList[i].success = null;
        this.playerList[i].rate = null;
    }
}

function PlayerAliveEnough() {
    let playerCount = 0;
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (!this.playerList[i].isOut) playerCount++;
    }
    return playerCount >= MIN_PLAYER_COUNT;
}

function GetPlayer(pid) {
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].pid !== pid) continue;
        return this.playerList[i];
    }
}

function StopGame(noSendState) {
    ResetData.call(this, true);
    this.session = ROUND_SESSION_COUNT;
    this.state = common.Power7State.PREPARE;
    if (!noSendState) this.SendGameState();
    clearTimeout(this.timerStartGame);
    g_log.Debug('游戏暂停重新准备');
}

function CheckCanContinue() {
    if (this.session !== ROUND_SESSION_COUNT) return true;
    let canContinue = true;
    let isDisconnect = !g_cnclients.IsOpen();
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        let isViewer = this.IsViewer(this.playerList[i].pid);
        if (isDisconnect || !isViewer) {
            this.playerList[i] = {};
            canContinue = false;
        }
    }
    if (!canContinue) {
        this.SendGameInfo();
        StopGame.call(this);
    }
    return canContinue;
}

function OnSettlement() {
    if (this.state !== common.Power7State.WAIT_END) {
        g_log.Error('错误状态%s开始游戏结算', this.state);
        return;
    }
    g_log.Debug('游戏正在进行结算');
    this.state = common.Power7State.SETTLEMENT;
    this.SendGameState();
    this.CountRate();
    this.Settlement();
}

function OnWaitEnd() {
    if (this.state !== common.Power7State.STARTING) {
        g_log.Error('错误状态%s等待结束游戏', this.state);
        return;
    }
    this.state = common.Power7State.WAIT_END;
    this.SendGameState();
    setTimeout(OnSettlement.bind(this), config.power7.waitEndTime);
    g_log.Debug('%s毫秒后游戏开始结算', config.power7.waitEndTime);
}

function OnStarting() {
    if (this.state !== common.Power7State.WAIT_START &&
        this.state !== common.Power7State.WITHHOLD) {
        g_log.Error('错误状态%s开始进行游戏', this.state);
        return;
    }
    this.state = common.Power7State.STARTING;
    this.startTimestamp = new Date().getTime();
    this.SendGameState();
    setTimeout(OnWaitEnd.bind(this), config.power7.startingTime);
    g_log.Debug('%s毫秒游戏进行时间', config.power7.startingTime);
}

function StartGame() {
    if (this.state !== common.Power7State.PREPARE &&
        this.state !== common.Power7State.SETTLEMENT) {
        g_log.Error('错误状态%s重新开始游戏', this.state);
        return;
    }
    if (!CheckCanContinue.call(this)) return;
    if (!PlayerAliveEnough.call(this)) {
        StopGame.call(this, true);
        StartGame.call(this);
        return;
    }
    this.state = common.Power7State.WAIT_START;
    this.SendGameState();
    this.timerStartGame = setTimeout(function () {
        if (this.session < ROUND_SESSION_COUNT) {
            ResetData.call(this, false);
            for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
                if (this.playerList[i].isOut) continue;
                this.playerList[i].betCoin = constant.POWER7_MIN_BETCOIN;
            }
            this.session++;
            OnStarting.call(this);
        } else if (this.session === ROUND_SESSION_COUNT) {
            if (!CheckCanContinue.call(this)) return;
            this.state = common.Power7State.WITHHOLD;
            this.round = round.NewRound(), this.session = 1;
            ResetData.call(this, true);
            this.Withhold();
        } else {
            g_log.Error('第%s轮错误场次%s', this.round, this.session);
        }
    }.bind(this), config.power7.waitStartTime);
    g_log.Debug('%s毫秒游戏开始', config.power7.waitStartTime);
}

function DoSettlement(pi, times) {
    let pKey = g_player.GetKey(pi.pid);
    let whKey = g_withhold.GetKey(pi.pid, common.Location.POWER7, this.round);
    g_gmredis.Watch([pKey, whKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, pi, times);
            }.bind(this), 3000);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(pi.pid, [
            ['EXISTS'],
            ['HGET', 'online'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds = cmds.concat(g_withhold.FillCmd(pi.pid, common.Location.POWER7, this.round, [
            ['HGET', common.PropID.COIN]
        ]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, pi, times);
            }.bind(this), 3000);
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            g_log.Error('玩家%s第%s轮%s场结算信息不存在，出兵金额: %s',
                pi.pid, this.round, this.session, pi.betCoin);
            g_gmredis.Unwatch();
            pi.success = true;
            this.JudgeOver();
            return;
        }

        let online = (Number(replies[1]) === 1);
        if (!online) g_power7.Logout({ rid: this.rid, pid: pi.pid });

        let coin = replies[2] ? Number(replies[2]) : 0;
        let whCoin = replies[3] ? Number(replies[3]) : 0;
        if (whCoin !== pi.betCoin) {
            g_log.Error('玩家%s第%s轮%s场预扣信息错误: %s != %s',
                pi.pid, this.round, this.session, whCoin, pi.betCoin);
            g_gmredis.Unwatch();
            pi.success = true;
            this.JudgeOver();
            return;
        }

        let gainCoin = 0;
        if (pi.rate === null) {
            gainCoin = whCoin;
        } else if (pi.rate > 0) {
            gainCoin = Math.floor(whCoin * pi.rate);
            gainCoin = gainCoin - gainCoin % 1000;
        }

        let gameOver = (!PlayerAliveEnough.call(this) || this.session === ROUND_SESSION_COUNT);
        let canContinueGame = (!gameOver && !pi.isOut);

        cmds = new Array();
        let resultCoin = coin + gainCoin;
        if (gainCoin > 0) {
            let resultCoinTrue = resultCoin;
            if (canContinueGame) resultCoinTrue = resultCoin - constant.POWER7_MIN_BETCOIN;
            cmds = cmds.concat(g_player.FillCmd(pi.pid, [
                ['HSET', common.PropID.COIN, resultCoinTrue]
            ]));
        }

        if (canContinueGame) {
            cmds = cmds.concat(g_withhold.FillCmd(pi.pid, common.Location.POWER7, this.round, [
                ['HSET', common.PropID.COIN, constant.POWER7_MIN_BETCOIN],
                ['HSET', 'session', this.session + 1],
            ]));
        } else {
            cmds.push(['DEL', g_withhold.GetKey(pi.pid, common.Location.POWER7, this.round)]);
        }

        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            setTimeout(function () {
                DoSettlement.call(this, pi, times);
            }.bind(this), 3000);
            return;
        }

        if (result) {
            g_power7.UpdatePlayerWinLoss(pi.pid, gainCoin - whCoin);
            g_handler.SendPower7SettlementMsg(g_cnclients, {
                rid: this.rid, pid: pi.pid, round: this.round, session: this.session,
                gameOver: gameOver, costCoin: whCoin, gainCoin: gainCoin
            });
            let msgLog = {
                pid: pi.pid, round: this.round, costCoin: whCoin,
                gainCoin: gainCoin, resultCoin: resultCoin, role: pi.object,
                time: (new Date()).format('yyyy-MM-dd hh:mm:ss')
            };
            let msgLogData = dblog.DB7PowerLog.encode(msgLog).finish();
            g_dbredis.Batch([['RPUSH', 'power7_log', msgLogData]], function (err) {
                if (err) g_log.Matter('保存七雄争霸押分日志失败：%s', JSON.stringify(msgLog));
            });
            g_player.Save(pi.pid);
            pi.success = true;
            this.JudgeOver();
        } else if (times < constant.REDIS_MAX_RETRY_TIMES) {
            setTimeout(function () {
                DoSettlement.call(this, pi, times + 1);
            }.bind(this), 10);
        } else {
            g_log.Error('玩家%s七雄第%s轮第%s场押分%s军饷对象%s奖励倍率%s结算失败',
                pi.pid, this.round, this.session, whCoin, pi.object, pi.rate);
            pi.success = true;
            this.JudgeOver();
        }
    }.bind(this));
}

function Room(rid, maxBetCoin) {
    this.viewerList = new Set();
    this.playerList = new Array();
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        this.playerList[i] = {};
    }
    this.rid = rid, this.maxBetCoin = maxBetCoin;
    this.state = common.Power7State.PREPARE;
    this.creator = { pid: 0, head: '', nickname: '' };
    this.desc = '', this.password = '';
    this.session = ROUND_SESSION_COUNT;
}

Room.prototype.GetRID = function () {
    return this.rid;
}

Room.prototype.GetRound = function () {
    return this.round;
}

Room.prototype.GetPassword = function () {
    return this.password;
}

Room.prototype.GetMaxBetCoin = function () {
    return this.maxBetCoin;
}

Room.prototype.IsStarting = function () {
    return this.state === common.Power7State.STARTING;
}

Room.prototype.IsViewer = function (pid) {
    return this.viewerList.has(pid);
}

Room.prototype.ViewerCount = function () {
    return this.viewerList.size;
}

Room.prototype.PlayerCount = function () {
    let playerCount = 0;
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].pid) playerCount++;
    }
    return playerCount;
}

Room.prototype.GetRoomInfo = function () {
    return {
        rid: this.rid,
        desc: this.desc,
        pid: this.creator.pid,
        head: this.creator.head,
        nickname: this.creator.nickname,
        isPassword: this.password.length > 0
    };
}

Room.prototype.SetRoomInfo = function (desc, password, creator) {
    this.desc = desc;
    this.creator = creator;
    this.password = password;
}

Room.prototype.Enter = function (pid) {
    this.viewerList.add(pid);
    this.SendGameInfo(pid);
    this.SendGameState(pid);
}

Room.prototype.Leave = function (pid) {
    this.viewerList.delete(pid);
    let player = GetPlayer.call(this, pid);
    if (!player) return;
    let maxSession = (this.session === ROUND_SESSION_COUNT);
    if (this.state === common.Power7State.PREPARE ||
        (this.state === common.Power7State.WAIT_START && maxSession)) {
        this.playerList[player.object] = {};
        this.SendGameInfo();
        StopGame.call(this);
    }
}

Room.prototype.Prepare = function (msg) {
    if (GetPlayer.call(this, msg.pid)) return;

    if (!g_cnclients.IsOpen()) {
        msg.reason = PREPARE.Reason.SERVER_NO_READY;
        g_handler.SendPower7PrepareMsg(g_cnclients, msg);
        return;
    }

    if (this.state !== common.Power7State.PREPARE) {
        msg.reason = PREPARE.Reason.NO_PREPARE_STATE;
        g_handler.SendPower7PrepareMsg(g_cnclients, msg);
        return;
    }

    if (g_power7.IsOverMaxLoss(msg.pid)) {
        msg.reason = PREPARE.Reason.OVER_MAX_LOSS;
        g_handler.SendPower7PrepareMsg(g_cnclients, msg);
        return;
    }

    if (this.PlayerCount() === constant.POWER7_PLAYER_COUNT) {
        msg.reason = PREPARE.Reason.OTHER_PREPARE;
        g_handler.SendPower7PrepareMsg(g_cnclients, msg);
        return;
    }

    let cmds = g_player.FillCmd(msg.pid, [
        ['HGET', 'head'],
        ['HGET', 'nickname'],
        ['HGET', common.PropID.COIN]
    ]);
    g_gmredis.Batch(cmds, function (err, replies) {
        if (err) {
            msg.reason = PREPARE.Reason.REDIS_ERROR;
            g_handler.SendPower7PrepareMsg(g_cnclients, msg);
            g_log.Error(err);
            return;
        }

        let head = replies[0], nickname = replies[1];
        if (!nickname || nickname.length === 0) {
            msg.reason = PREPARE.Reason.REDIS_NO_PI;
            g_handler.SendPower7PrepareMsg(g_cnclients, msg);
            return;
        }

        let coin = replies[2] ? Number(replies[2]) : 0;
        if (coin < constant.POWER7_MIN_BETCOIN) {
            msg.reason = PREPARE.Reason.LACK_COIN;
            g_handler.SendPower7PrepareMsg(g_cnclients, msg);
            return;
        }

        if (this.PlayerCount() === constant.POWER7_PLAYER_COUNT) {
            msg.reason = PREPARE.Reason.OTHER_PREPARE;
            g_handler.SendPower7PrepareMsg(g_cnclients, msg);
            return;
        }

        let player = { pid: msg.pid, head: head, nickname: nickname };
        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            if (this.playerList[i].pid) continue;
            player.object = i;
            this.playerList[i] = player;
            break;
        }

        this.SendGameInfo();
        if (this.PlayerCount() === constant.POWER7_PLAYER_COUNT) {
            StartGame.call(this);
        }
    }.bind(this));
}

Room.prototype.PlayObject = function (msg) {
    if (msg.round !== this.round) {
        msg.result = PLAYOBJECT.Result.ROUND_ERROR;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
        return;
    }

    if (msg.session !== this.session) {
        msg.result = PLAYOBJECT.Result.SESSION_ERROR;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
        return;
    }

    if (!this.IsStarting()) {
        msg.result = PLAYOBJECT.Result.NO_STARTING;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
        return;
    }

    let player = GetPlayer.call(this, msg.pid);
    if (!player) {
        msg.result = PLAYOBJECT.Result.NO_PLAYER;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
        return;
    }

    let totalBetCoin = player.betCoin + msg.betCoin;
    if (msg.betCoin < constant.POWER7_MIN_BETCOIN || totalBetCoin > this.maxBetCoin) {
        msg.result = PLAYOBJECT.Result.BET_COIN_ERROR;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
        return;
    }

    let pKey = g_player.GetKey(msg.pid);
    let whKey = g_withhold.GetKey(msg.pid, common.Location.POWER7, this.round);
    g_gmredis.Watch([pKey, whKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            msg.result = PLAYOBJECT.Result.REDIS_ERROR;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [['HGET', common.PropID.COIN]]);
        cmds = cmds.concat(g_withhold.FillCmd(msg.pid, common.Location.POWER7, this.round, [
            ['HGET', common.PropID.COIN]
        ]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            msg.result = PLAYOBJECT.Result.REDIS_ERROR;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            return;
        }

        let coin = replies[0] ? Number(replies[0]) : 0;
        let whCoin = replies[1] ? Number(replies[1]) : 0;
        if (coin < msg.betCoin) {
            g_gmredis.Unwatch();
            msg.result = PLAYOBJECT.Result.LACK_COIN;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            return;
        }

        if (player.betCoin !== whCoin || whCoin <= 0) {
            g_gmredis.Unwatch();
            msg.result = PLAYOBJECT.Result.WITHHOLD_ERROR;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            return;
        }

        if (!this.IsStarting()) {
            g_gmredis.Unwatch();
            msg.result = PLAYOBJECT.Result.NO_STARTING;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            return;
        }

        cmds = g_player.FillCmd(msg.pid, [['HSET', common.PropID.COIN, coin - msg.betCoin]]);
        cmds = cmds.concat(g_withhold.FillCmd(msg.pid, common.Location.POWER7, this.round, [
            ['HSET', common.PropID.COIN, whCoin + msg.betCoin]
        ]));
        let result = await g_gmredis.Multi(cmds);
        if (result === null || !result) {
            msg.result = PLAYOBJECT.Result.REDIS_ERROR;
            g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);
            return;
        }

        player.betCoin += msg.betCoin;
        msg.result = PLAYOBJECT.Result.SUCCESS;
        g_handler.SendPower7PlayObjectMsg(g_cnclients, msg);

        if (!this.IsStarting()) this.SendGameState();
    }.bind(this));
}

Room.prototype.Withhold = function () {
    let keyList = new Array();
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        keyList.push(g_player.GetKey(this.playerList[i].pid));
    }
    g_gmredis.Watch(keyList, async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            StopGame.call(this);
            g_log.Error(err);
            return;
        }

        let cmds = new Array();
        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            let player = this.playerList[i];
            cmds = cmds.concat(g_player.FillCmd(player.pid, [['HGET', common.PropID.COIN]]));
        }
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            StopGame.call(this);
            return;
        }

        let hasPlayerLackCoin = false;
        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            let coin = replies[i] ? Number(replies[i]) : 0;
            if (coin < constant.POWER7_MIN_BETCOIN) {
                this.playerList[i] = {};
                hasPlayerLackCoin = true;
            }
        }
        if (hasPlayerLackCoin) {
            g_gmredis.Unwatch();
            StopGame.call(this);
            this.SendGameInfo();
            return;
        }

        cmds = new Array();
        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            let player = this.playerList[i];
            let coin = replies[i] ? Number(replies[i]) : 0;
            cmds = cmds.concat(g_player.FillCmd(player.pid, [
                ['HSET', common.PropID.COIN, coin - constant.POWER7_MIN_BETCOIN]
            ]));
            cmds = cmds.concat(g_withhold.FillCmd(player.pid, common.Location.POWER7, this.round, [
                ['HSET', 'pid', player.pid],
                ['HSET', 'round', this.round],
                ['HSET', 'session', this.session],
                ['HSET', common.PropID.COIN, constant.POWER7_MIN_BETCOIN],
            ]));
        }
        let result = await g_gmredis.Multi(cmds);
        if (result === null || !result) {
            StopGame.call(this);
            return;
        }

        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            let player = this.playerList[i];
            player.betCoin = constant.POWER7_MIN_BETCOIN;
            g_handler.SendPower7WithholdMsg(g_cnclients, {
                rid: this.rid, pid: player.pid,
                round: this.round, coin: player.betCoin
            });
        }
        OnStarting.call(this);
    }.bind(this));
}

Room.prototype.SendGameState = function (pid) {
    let msg = {
        rid: this.rid, round: this.round, session: this.session,
        pidList: [pid], state: this.state
    };
    if (this.IsStarting()) {
        let nowTimestamp = new Date().getTime();
        msg.remainTime = config.power7.startingTime - (nowTimestamp - this.startTimestamp);
        msg.remainTime = Math.max(0, msg.remainTime);

        msg.playerList = new Array();
        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            msg.playerList.push({
                pid: this.playerList[i].pid,
                isOut: this.playerList[i].isOut,
            });
            if (this.playerList[i].pid === pid) {
                msg.playerList[i].betCoin = this.playerList[i].betCoin;
            }
        }
    } else {
        msg.playerList = this.playerList;
    }
    if (!pid) msg.pidList = Array.from(this.viewerList);
    g_handler.SendPower7GameStateMsg(g_cnclients, msg);
}

Room.prototype.SendGameInfo = function (pid) {
    let msg = {
        rid: this.rid, pidList: [pid],
        maxBetCoin: this.maxBetCoin,
        playerList: this.playerList
    };
    if (!pid) msg.pidList = Array.from(this.viewerList);
    g_handler.SendPower7GameInfoMsg(g_cnclients, msg);
}

Room.prototype.JudgeOver = function () {
    let totalSuccess = true;
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].success === null) continue;
        totalSuccess = totalSuccess && this.playerList[i].success;
    }
    if (totalSuccess) StartGame.call(this);
    return totalSuccess;
}

Room.prototype.CountRate = function () {
    let betRankList = new Array();
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].isOut) continue;
        betRankList.push(this.playerList[i].betCoin);
    }

    if (betRankList.length < MIN_PLAYER_COUNT) return;
    betRankList.sort(function (a, b) { return a - b });

    let minBetCoin = betRankList[0];
    let maxBetCoin = betRankList[betRankList.length - 1];
    let totalBetCoin = 0, middleBetCoinTotal = 0;
    for (let i = 0; i < betRankList.length; ++i) {
        totalBetCoin += betRankList[i];
        if (betRankList[i] === minBetCoin) continue;
        if (betRankList[i] === maxBetCoin) continue;
        middleBetCoinTotal += betRankList[i];
    }
    if (middleBetCoinTotal === 0) return;

    let awardRate = totalBetCoin / middleBetCoinTotal;
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].isOut) continue;
        this.playerList[i].rate = 0;
        if (this.playerList[i].betCoin === minBetCoin) continue;
        if (this.playerList[i].betCoin === maxBetCoin) continue;
        this.playerList[i].rate = awardRate;
    }
}

Room.prototype.Settlement = function () {
    for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
        if (this.playerList[i].isOut) continue;
        this.playerList[i].success = false;
        this.playerList[i].isOut = (this.playerList[i].rate === 0);
        DoSettlement.call(this, this.playerList[i], 1);
    }
}

module.exports = Room;