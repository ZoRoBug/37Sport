// --------------------------------------------------------
// 三国鼎立房间核心逻辑
// --------------------------------------------------------
// 蜀克魏，吴克蜀，魏克吴
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const round = require('../common/Round');
const helper = require('../../public/Helper');
const dblog = require('../../protocol/DBLog');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const PREPARE = require('../../protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const PLAYOBJECT = require('../../protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];

function ClearData(isPlayer1) {
    if (isPlayer1) {
        this.player1 = {};
    } else {
        this.player2 = {};
    }
}

function ResetData() {
    this.player1.object = null;
    this.player2.object = null;
    this.player1.success = false;
    this.player2.success = false;
}

function RandomObject() {
    let min = common.King3Object.MIN + 1;
    let max = common.King3Object.MAX - 1;
    return Math.randomnum(min, max);
}

function StopGame() {
    ResetData.call(this);
    this.state = common.King3State.PREPARE;
    this.SendGameState();
    clearTimeout(this.timerStartGame);
    g_log.Debug('游戏暂停重新准备');
}

function CheckCanContinue() {
    let isDisconnect = !g_cnclients.IsOpen();
    let p1InRoom = this.IsViewer(this.player1.pid);
    let p2InRoom = this.IsViewer(this.player2.pid);
    if (!p1InRoom || isDisconnect) ClearData.call(this, true);
    if (!p2InRoom || isDisconnect) ClearData.call(this, false);
    if (!p1InRoom || !p2InRoom || isDisconnect) {
        this.SendGameInfo();
        StopGame.call(this);
        return false;
    }
    return true;
}

function OnSettlement() {
    if (this.state !== common.King3State.WAIT_END) {
        g_log.Error('错误状态%s开始游戏结算', this.state);
        return;
    }
    g_log.Debug('游戏正在进行结算');
    this.state = common.King3State.SETTLEMENT;
    this.SendGameState();
    this.Settlement(this.Result());
}

function OnWaitEnd() {
    if (this.state !== common.King3State.STARTING) {
        g_log.Error('错误状态%s等待结束游戏', this.state);
        return;
    }

    this.player1.object = this.player1.object || RandomObject();
    this.player2.object = this.player2.object || RandomObject();

    this.state = common.King3State.WAIT_END;
    this.SendGameState();
    setTimeout(OnSettlement.bind(this), config.king3.waitEndTime);
    g_log.Debug('%s毫秒后游戏开始结算', config.king3.waitEndTime);
}

function OnStarting() {
    if (this.state !== common.King3State.WITHHOLD) {
        g_log.Error('错误状态%s开始进行游戏', this.state);
        return;
    }
    this.state = common.King3State.STARTING;
    this.startTimestamp = new Date().getTime();
    this.SendGameState();
    setTimeout(OnWaitEnd.bind(this), config.king3.startingTime);
    g_log.Debug('%s毫秒游戏进行时间', config.king3.startingTime);
}

function StartGame() {
    if (this.state !== common.King3State.PREPARE &&
        this.state !== common.King3State.SETTLEMENT) {
        g_log.Error('错误状态%s重新开始游戏', this.state);
        return;
    }
    if (!CheckCanContinue.call(this)) return;
    this.state = common.King3State.WAIT_START;
    this.SendGameState();
    this.timerStartGame = setTimeout(function () {
        if (!CheckCanContinue.call(this)) return;
        this.state = common.King3State.WITHHOLD;
        this.round = round.NewRound();
        ResetData.call(this);
        this.Withhold();
    }.bind(this), config.king3.waitStartTime);
    g_log.Debug('%s毫秒游戏开始', config.king3.waitStartTime);
}

function DoSettlement(pi, win, times) {
    let pKey = g_player.GetKey(pi.pid);
    let whKey = g_withhold.GetKey(pi.pid, common.Location.KING3, this.round);
    g_gmredis.Watch([pKey, whKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, pi, win, times);
            }.bind(this), 3000);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(pi.pid, [
            ['EXISTS'],
            ['HGET', 'online'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds = cmds.concat(g_withhold.FillCmd(pi.pid, common.Location.KING3, this.round, [
            ['HGET', common.PropID.COIN],
        ]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, pi, win, times);
            }.bind(this), 3000);
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            g_log.Error('玩家%s第%s轮结算信息不存在，出战金额：%s',
                pi.pid, this.round, this.betCoin);
            g_gmredis.Unwatch();
            pi.success = true;
            this.JudgeOver();
            return;
        }

        let online = (Number(replies[1]) === 1);
        if (!online) g_king3.Logout({ rid: this.rid, pid: pi.pid });

        let coin = replies[2] ? Number(replies[2]) : 0;
        let whCoin = replies[3] ? Number(replies[3]) : 0;
        if (whCoin !== this.betCoin) {
            g_log.Error('玩家%s第%s轮预扣信息错误: %s != %s',
                pi.pid, this.round, whCoin, this.betCoin);
            g_gmredis.Unwatch();
            pi.success = true;
            this.JudgeOver();
            return;
        }

        let gainCoin = 0;
        if (win === null) {
            gainCoin = whCoin;
        } else if (win) {
            gainCoin = whCoin * 2;
        }

        cmds = new Array();
        let resultCoin = coin + gainCoin;
        if (gainCoin > 0) {
            cmds = cmds.concat(g_player.FillCmd(pi.pid, [
                ['HSET', common.PropID.COIN, resultCoin]
            ]));
        }
        cmds.push(['DEL', g_withhold.GetKey(pi.pid, common.Location.KING3, this.round)]);

        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            setTimeout(function () {
                DoSettlement.call(this, pi, win, times);
            }.bind(this), 3000);
            return;
        }

        if (result) {
            g_king3.UpdatePlayerWinLoss(pi.pid, gainCoin - whCoin);
            g_handler.SendKing3SettlementMsg(g_cnclients, {
                rid: this.rid, pid: pi.pid, round: this.round,
                costCoin: whCoin, gainCoin: gainCoin
            });
            let msgLog = {
                pid: pi.pid, round: this.round,
                costCoin: whCoin, gainCoin: gainCoin,
                resultCoin: resultCoin, action: pi.object,
                time: (new Date()).format('yyyy-MM-dd hh:mm:ss')
            };
            let msgLogData = dblog.DB3KingLog.encode(msgLog).finish();
            g_dbredis.Batch([['RPUSH', 'king3_log', msgLogData]], function (err) {
                if (err) g_log.Matter('保存三国鼎立押分日志失败：%s', JSON.stringify(msgLog));
            });
            g_player.Save(pi.pid);
            pi.success = true;
            this.JudgeOver();
        } else if (times < constant.REDIS_MAX_RETRY_TIMES) {
            setTimeout(function () {
                DoSettlement.call(this, pi, win, times + 1);
            }.bind(this), 10);
        } else {
            g_log.Error('玩家%s三国第%s轮押分%s军饷对象%s胜负%s结算失败',
                pi.pid, this.round, whCoin, pi.object, win);
            pi.success = true;
            this.JudgeOver();
        }
    }.bind(this));
}

function Room(rid, betCoin) {
    ClearData.call(this, true);
    ClearData.call(this, false);
    this.viewerList = new Set();
    this.rid = rid, this.betCoin = betCoin;
    this.state = common.King3State.PREPARE;
    this.creator = { pid: 0, head: '', nickname: '' };
    this.desc = '', this.password = '';
}

Room.prototype.GetRID = function () {
    return this.rid;
}

Room.prototype.GetRound = function () {
    return this.round;
}

Room.prototype.GetBetCoin = function () {
    return this.betCoin;
}

Room.prototype.GetPassword = function () {
    return this.password;
}

Room.prototype.IsViewer = function (pid) {
    return this.viewerList.has(pid);
}

Room.prototype.IsPlayer = function (pid) {
    if (!pid) return false;
    if (this.player1.pid === pid) return true;
    if (this.player2.pid === pid) return true;
}

Room.prototype.IsStarting = function () {
    return this.state === common.King3State.STARTING;
}

Room.prototype.ViewerCount = function () {
    return this.viewerList.size;
}

Room.prototype.PlayerCount = function () {
    let playerCount = 0;
    if (this.player1.pid) playerCount++;
    if (this.player2.pid) playerCount++;
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
    if (!this.IsPlayer(pid)) return;
    if (this.state === common.King3State.PREPARE ||
        this.state === common.King3State.WAIT_START) {
        ClearData.call(this, (pid === this.player1.pid));
        this.SendGameInfo();
        StopGame.call(this);
    }
}

Room.prototype.Prepare = function (msg) {
    if (this.IsPlayer(msg.pid)) return;

    if (!g_cnclients.IsOpen()) {
        msg.reason = PREPARE.Reason.SERVER_NO_READY;
        g_handler.SendKing3PrepareMsg(g_cnclients, msg);
        return;
    }

    if (this.state !== common.King3State.PREPARE) {
        msg.reason = PREPARE.Reason.NO_PREPARE_STATE;
        g_handler.SendKing3PrepareMsg(g_cnclients, msg);
        return;
    }

    if (this.PlayerCount() === constant.KING3_PLAYER_COUNT) {
        msg.reason = PREPARE.Reason.OTHER_PREPARE;
        g_handler.SendKing3PrepareMsg(g_cnclients, msg);
        return;
    }

    if (g_king3.IsOverMaxLoss(msg.pid)) {
        msg.reason = PREPARE.Reason.OVER_MAX_LOSS;
        g_handler.SendKing3PrepareMsg(g_cnclients, msg);
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
            g_handler.SendKing3PrepareMsg(g_cnclients, msg);
            g_log.Error(err);
            return;
        }

        let head = replies[0], nickname = replies[1];
        if (!nickname || nickname.length === 0) {
            msg.reason = PREPARE.Reason.REDIS_NO_PI;
            g_handler.SendKing3PrepareMsg(g_cnclients, msg);
            return;
        }

        let coin = replies[2] ? Number(replies[2]) : 0;
        if (coin < this.betCoin) {
            msg.reason = PREPARE.Reason.LACK_COIN;
            g_handler.SendKing3PrepareMsg(g_cnclients, msg);
            return;
        }

        let object = { pid: msg.pid, head: head, nickname: nickname };
        if (!this.player1.pid) {
            this.player1 = object;
        } else if (!this.player2.pid) {
            this.player2 = object;
        } else {
            msg.reason = PREPARE.Reason.OTHER_PREPARE;
            g_handler.SendKing3PrepareMsg(g_cnclients, msg);
            return;
        }

        this.SendGameInfo();
        if (this.PlayerCount() === constant.KING3_PLAYER_COUNT) {
            StartGame.call(this);
        }
    }.bind(this));
}

Room.prototype.PlayObject = function (msg) {
    if (msg.round !== this.round) {
        msg.result = PLAYOBJECT.Result.ROUND_ERROR;
        g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
        return;
    }
    if (this.state !== common.King3State.STARTING) {
        msg.result = PLAYOBJECT.Result.NO_STARTING;
        g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
        return;
    }
    if (!helper.IsValidKing3Object(msg.object)) {
        msg.result = PLAYOBJECT.Result.OBJECT_ERROR;
        g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
        return;
    }
    if (this.player1.pid === msg.pid) {
        if (helper.IsValidKing3Object(this.player1.object)) return;
        this.player1.object = msg.object;
    } else if (this.player2.pid === msg.pid) {
        if (helper.IsValidKing3Object(this.player2.object)) return;
        this.player2.object = msg.object;
    } else {
        msg.result = PLAYOBJECT.Result.NO_PLAYER;
        g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
        return;
    }
    msg.result = PLAYOBJECT.Result.SUCCESS;
    g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
}

Room.prototype.Result = function () {
    if (this.player1.object === this.player2.object) return null;
    if (!this.player1.object || !this.player2.object) return null;

    let objWU = common.King3Object.WU, objWEI = common.King3Object.WEI;
    if (this.player1.object === objWU && this.player2.object === objWEI) return false;
    if (this.player1.object === objWEI && this.player2.object === objWU) return true;

    return (this.player1.object > this.player2.object);
}

Room.prototype.Withhold = function () {
    let p1Key = g_player.GetKey(this.player1.pid);
    let p2Key = g_player.GetKey(this.player2.pid);
    g_gmredis.Watch([p1Key, p2Key], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            StopGame.call(this);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(this.player1.pid, [['HGET', common.PropID.COIN]]);
        cmds = cmds.concat(g_player.FillCmd(this.player2.pid, [['HGET', common.PropID.COIN]]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            StopGame.call(this);
            return;
        }

        let p1Coin = replies[0] ? Number(replies[0]) : 0;
        let p2Coin = replies[1] ? Number(replies[1]) : 0;
        if (isNaN(this.betCoin) || p1Coin < this.betCoin || p2Coin < this.betCoin) {
            if (isNaN(this.betCoin) || p1Coin < this.betCoin) ClearData.call(this, true);
            if (isNaN(this.betCoin) || p2Coin < this.betCoin) ClearData.call(this, false);
            g_gmredis.Unwatch();
            StopGame.call(this);
            this.SendGameInfo();
            return;
        }

        cmds = g_player.FillCmd(this.player1.pid, [['HSET', common.PropID.COIN, p1Coin - this.betCoin]]);
        cmds = cmds.concat(g_player.FillCmd(this.player2.pid, [['HSET', common.PropID.COIN, p2Coin - this.betCoin]]));
        cmds = cmds.concat(g_withhold.FillCmd(this.player1.pid, common.Location.KING3, this.round, [
            ['HSET', 'pid', this.player1.pid],
            ['HSET', 'round', this.round],
            ['HSET', common.PropID.COIN, this.betCoin],
        ]));
        cmds = cmds.concat(g_withhold.FillCmd(this.player2.pid, common.Location.KING3, this.round, [
            ['HSET', 'pid', this.player2.pid],
            ['HSET', 'round', this.round],
            ['HSET', common.PropID.COIN, this.betCoin],
        ]));
        let result = await g_gmredis.Multi(cmds);
        if (result === null || !result) {
            StopGame.call(this);
            return;
        }

        g_handler.SendKing3WithholdMsg(g_cnclients, {
            rid: this.rid, pid: this.player1.pid, round: this.round, coin: this.betCoin
        });
        g_handler.SendKing3WithholdMsg(g_cnclients, {
            rid: this.rid, pid: this.player2.pid, round: this.round, coin: this.betCoin
        });
        OnStarting.call(this);
    }.bind(this));
}

Room.prototype.SendGameState = function (pid) {
    let msg = {
        rid: this.rid, round: this.round,
        pidList: [pid], state: this.state
    };
    if (this.state === common.King3State.STARTING) {
        let nowTimestamp = new Date().getTime();
        msg.remainTime = config.king3.startingTime - (nowTimestamp - this.startTimestamp);
        msg.remainTime = Math.max(0, msg.remainTime);
        if (pid === this.player1.pid) {
            msg.p1Object = this.player1.object;
        } else if (pid === this.player2.pid) {
            msg.p2Object = this.player2.object;
        }
    } else {
        msg.p1Object = this.player1.object;
        msg.p2Object = this.player2.object;
    }
    if (!pid) msg.pidList = Array.from(this.viewerList);
    g_handler.SendKing3GameStateMsg(g_cnclients, msg);
}

Room.prototype.SendGameInfo = function (pid) {
    let msg = {
        rid: this.rid, pidList: [pid], betCoin: this.betCoin,
        pid1: this.player1.pid, pid2: this.player2.pid,
        p1Head: this.player1.head, p2Head: this.player2.head,
        p1Nickname: this.player1.nickname,
        p2Nickname: this.player2.nickname
    };
    if (!pid) msg.pidList = Array.from(this.viewerList);
    g_handler.SendKing3GameInfoMsg(g_cnclients, msg);
}

Room.prototype.JudgeOver = function () {
    let totalSuccess = (this.player1.success && this.player2.success);
    if (totalSuccess) StartGame.call(this);
    return totalSuccess;
}

Room.prototype.Settlement = function (result) {
    if (result === null) {
        DoSettlement.call(this, this.player1, null, 1);
        DoSettlement.call(this, this.player2, null, 1);
    } else if (result) {
        DoSettlement.call(this, this.player1, true, 1);
        DoSettlement.call(this, this.player2, false, 1);
    } else {
        DoSettlement.call(this, this.player1, false, 1);
        DoSettlement.call(this, this.player2, true, 1);
    }
}

module.exports = Room;