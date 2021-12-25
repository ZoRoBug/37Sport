// --------------------------------------------------------
// 楚汉相争核心逻辑
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const dblog = require('../../protocol/DBLog');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const BET_FAIL = require('../../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];

const SHOW_BETITEM_COUNT = 12; // 楚汉两边各显示押分条数
const SAVE_RECORD_COUNT = 60; // 保存游戏结果记录个数

function ResetData() {
    this.impawnChuList = new Array();
    this.impawnHanList = new Array();
    this.chuImpawnTotal = 0, this.hanImpawnTotal = 0;
    this.chuAwardRate = 100, this.hanAwardRate = 100;
}

function RandomTail(sum) {
    if (sum < 100000) return sum;
    let sumW = sum % 100000;
    let sum10W = Math.randomnum(1, 9);
    let sum100W = sum - sum % 1000000;
    return sum100W + sum10W * 100000 + sumW;
}

function ClearPlayerWinLoss() {
    let nowDate = new Date();
    let cfgHour = config.impawn.clearWinLossHour;
    if (nowDate.getHours() !== cfgHour) return;
    let nowDay = nowDate.format('yyyy-MM-dd');
    if (this.clearWinLossDate === nowDay) return;
    this.clearWinLossDate = nowDay;
    this.playerList.clear();
}

function UpdatePlayerWinLoss(pid, winLossCoin) {
    if (winLossCoin === 0) return;
    let player = this.playerList.get(pid);
    if (!player) {
        player = { winLossCoin: 0 };
        this.playerList.set(pid, player);
    }
    player.winLossCoin += winLossCoin;
}

function OnSettlement() {
    if (this.state !== common.ImpawnState.WAIT_END) {
        g_log.Error('错误状态%s开始游戏结算', this.state);
        return;
    }
    g_log.Debug('游戏正在进行结算');
    this.state = common.ImpawnState.SETTLEMENT;
    this.SendGameState();
    this.Settlement(this.Result());
}

function OnWaitEnd() {
    if (this.state !== common.ImpawnState.STARTING) {
        g_log.Error('错误状态%s等待结束游戏', this.state);
        return;
    }
    this.state = common.ImpawnState.WAIT_END;
    this.SendGameInfo();
    this.SendGameState();
    setTimeout(OnSettlement.bind(this), config.impawn.waitEndTime);
    g_log.Debug('%s毫秒后游戏开始结算', config.impawn.waitEndTime);
}

function OnStarting() {
    if (this.state !== common.ImpawnState.WAIT_START) {
        g_log.Error('错误状态%s开始进行游戏', this.state);
        return;
    }
    if (this.chuImpawnTotal > 0 || this.hanImpawnTotal > 0) {
        let cmds = [['SET', 'IMPAWN_ROUND', ++this.round]];
        let result = this.Result();
        if (result !== null) {
            let recordLength = this.recordList.push(result);
            if (recordLength > SAVE_RECORD_COUNT) this.recordList.shift();
            if (result) cmds.push(['SET', 'IMPAWN_CHU_RECORD', ++this.chuRecord]);
            if (!result) cmds.push(['SET', 'IMPAWN_HAN_RECORD', ++this.hanRecord]);
        }
        g_gmredis.Batch(cmds, function () { });
    }
    ResetData.call(this);
    this.state = common.ImpawnState.STARTING;
    this.startTimestamp = new Date().getTime();
    this.SendGameState();
    setTimeout(OnWaitEnd.bind(this), config.impawn.startingTime);
    g_log.Debug('%s毫秒游戏进行时间', config.impawn.startingTime);
}

function StartGame() {
    if (this.PauseGame()) return;
    if (this.state && this.state !== common.ImpawnState.PAUSE &&
        this.state !== common.ImpawnState.SETTLEMENT) {
        g_log.Error('错误状态%s重新开始游戏', this.state);
        return;
    }
    ClearPlayerWinLoss.call(this);
    this.state = common.ImpawnState.WAIT_START;
    this.SendGameState();
    setTimeout(OnStarting.bind(this), config.impawn.waitStartTime);
    g_log.Debug('%s毫秒游戏开始', config.impawn.waitStartTime);
}

function OpenGetArchiveTimer() {
    setTimeout(async function () {
        let replies = await g_gmredis.Batch([
            ['GET', 'IMPAWN_ROUND'],
            ['GET', 'IMPAWN_CHU_RECORD'],
            ['GET', 'IMPAWN_HAN_RECORD']
        ]);
        if (replies === null) { OpenGetArchiveTimer.call(this); return; }
        this.round = replies[0] ? Number(replies[0]) + 1 : 1;
        this.chuRecord = replies[1] ? Number(replies[1]) : 0;
        this.hanRecord = replies[2] ? Number(replies[2]) : 0;
        StartGame.call(this);
    }.bind(this), 3000);
}

function DoSettlement(impawnItem, awardRate, times) {
    let playerKey = g_player.GetKey(impawnItem.pid);
    let withholdKey = g_withhold.GetKey(impawnItem.pid, common.Location.IMPAWN, this.round);
    g_gmredis.Watch([playerKey, withholdKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, impawnItem, awardRate, times);
            }.bind(this), 3000);
            g_log.Error(err);
            return;
        }

        let cmds = g_withhold.FillCmd(impawnItem.pid, common.Location.IMPAWN, this.round, [
            ['HGET', common.PropID.COIN],
            ['HGET', common.PropID.SUBCOIN]
        ]);
        cmds = cmds.concat(g_player.FillCmd(impawnItem.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN],
            ['HGET', common.PropID.SUBCOIN]
        ]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                DoSettlement.call(this, impawnItem, awardRate, times);
            }.bind(this), 3000);
            return;
        }

        let whCoin = replies[0] ? Number(replies[0]) : 0;
        let whSubcoin = replies[1] ? Number(replies[1]) : 0;
        if (whCoin < impawnItem.coinSum || whSubcoin < impawnItem.subcoinSum) {
            g_log.Error('楚汉第%s轮预扣信息错误: %s/%s != %s',
                this.round, whCoin, whSubcoin, JSON.stringify(impawnItem));
            impawnItem.success = true;
            g_gmredis.Unwatch();
            this.JudgeOver();
            return;
        }

        let playerExist = (replies[2] === 1);
        if (!playerExist) {
            g_log.Error('楚汉第%s轮结算玩家不在线，结算信息：%s',
                this.round, JSON.stringify(impawnItem));
            impawnItem.success = true;
            g_gmredis.Unwatch();
            this.JudgeOver();
            return;
        }

        let coin = replies[3] ? Number(replies[3]) : 0;
        let subcoin = replies[4] ? Number(replies[4]) : 0;
        let betSum = impawnItem.coinSum + impawnItem.subcoinSum;
        let gainCoin = Math.floor(betSum * awardRate / 100);
        let gainCoinTrue = 0, gainSubcoinTrue = 0;
        cmds = new Array();
        if (gainCoin < 0) {
            gainCoinTrue = impawnItem.coinSum;
            gainSubcoinTrue = impawnItem.subcoinSum;
            cmds = g_player.FillCmd(impawnItem.pid, [
                ['HSET', common.PropID.COIN, coin + impawnItem.coinSum],
                ['HSET', common.PropID.SUBCOIN, subcoin + impawnItem.subcoinSum],
            ]);
        } else if (gainCoin > 0) {
            gainCoinTrue = gainCoin, gainSubcoinTrue = 0;
            cmds = g_player.FillCmd(impawnItem.pid, [
                ['HSET', common.PropID.COIN, coin + gainCoin]
            ]);
        }

        let remainWhCoin = whCoin - impawnItem.coinSum;
        let remainWhSubcoin = whSubcoin - impawnItem.subcoinSum;
        if (remainWhCoin === 0 && remainWhSubcoin === 0) {
            cmds.push(['DEL', g_withhold.GetKey(impawnItem.pid, common.Location.IMPAWN, this.round)]);
        } else {
            cmds = cmds.concat(g_withhold.FillCmd(impawnItem.pid, common.Location.IMPAWN, this.round, [
                ['HSET', common.PropID.COIN, remainWhCoin],
                ['HSET', common.PropID.SUBCOIN, remainWhSubcoin]
            ]));
        }

        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            setTimeout(function () {
                DoSettlement.call(this, impawnItem, awardRate, times);
            }.bind(this), 3000);
            return;
        }

        if (result) {
            impawnItem.round = this.round, impawnItem.gainCoin = gainCoin;
            g_handler.SendImpawnSettlementMsg(g_cnclients, impawnItem);
            UpdatePlayerWinLoss.call(this, impawnItem.pid, gainCoinTrue + gainSubcoinTrue - betSum);
            let msgLog = {
                pid: impawnItem.pid,
                costCoin: impawnItem.coinSum, costSubcoin: impawnItem.subcoinSum,
                gainCoin: gainCoinTrue, gainSubcoin: gainSubcoinTrue,
                resultCoin: coin + gainCoinTrue, resultSubcoin: subcoin + gainSubcoinTrue,
                object: impawnItem.isChu ? 1 : 0, round: this.round, time: impawnItem.time
            };
            let msgLogData = dblog.DBImpawnLog.encode(msgLog).finish();
            g_dbredis.Batch([['RPUSH', 'impawn_log', msgLogData]], function (err) {
                if (err) g_log.Matter('保存楚汉相争押分日志失败：%s', JSON.stringify(msgLog));
            });
            g_player.Save(impawnItem.pid);
            impawnItem.success = true;
            this.JudgeOver();
        } else if (times < constant.REDIS_MAX_RETRY_TIMES) {
            setTimeout(function () {
                DoSettlement.call(this, impawnItem, awardRate, times + 1);
            }.bind(this), 10);
        } else {
            g_log.Error('楚汉第%s轮结算失败：%s', this.round, JSON.stringify(impawnItem));
            impawnItem.success = true;
            this.JudgeOver();
        }
    }.bind(this));
}

const impawn = {
    Init: function () {
        ResetData.call(this);
        this.playerList = new Map();
        this.recordList = new Array();
        OpenGetArchiveTimer.call(this);
    },

    Uninit: function () {
        ResetData.call(this);
        clearInterval(this.restartTimer);
    },

    GetMinRound: function () {
        return this.round;
    },

    SendGameState: function (pid) {
        let remainTime = null;
        if (this.state === common.ImpawnState.STARTING) {
            let nowTimestamp = new Date().getTime();
            remainTime = config.impawn.startingTime - (nowTimestamp - this.startTimestamp);
            remainTime = Math.max(0, remainTime);
        }
        g_handler.SendImpawnGameStateMsg(g_cnclients, {
            pid: pid, remainTime: remainTime, state: this.state, round: this.round
        });
    },

    SendGameInfo: function (pid) {
        let chuImpawnTotal = this.chuImpawnTotal;
        let hanImpawnTotal = this.hanImpawnTotal;
        if (this.state === common.ImpawnState.STARTING) {
            chuImpawnTotal = RandomTail(this.chuImpawnTotal);
            hanImpawnTotal = RandomTail(this.hanImpawnTotal);
        }
        let objMsg = {
            chuImpawnTotal: chuImpawnTotal, hanImpawnTotal: hanImpawnTotal,
            chuAwardRate: this.chuAwardRate, hanAwardRate: this.hanAwardRate
        };
        if (pid) {
            let impawnList = new Array();
            let playerChuImpawnTimes = 0, playerHanImpawnTimes = 0;
            let playerChuImpawnTotal = 0, playerHanImpawnTotal = 0;
            for (let i = 0, len = this.impawnChuList.length; i < len; ++i) {
                let betSum = this.impawnChuList[i].coinSum + this.impawnChuList[i].subcoinSum;
                if (pid === this.impawnChuList[i].pid) {
                    playerChuImpawnTimes++;
                    playerChuImpawnTotal += betSum;
                }
                if (i < SHOW_BETITEM_COUNT) {
                    impawnList.push({
                        isChu: this.impawnChuList[i].isChu, betSum: betSum,
                        nickname: this.impawnChuList[i].nickname
                    });
                }
            }
            for (let i = 0, len = this.impawnHanList.length; i < len; ++i) {
                let betSum = this.impawnHanList[i].coinSum + this.impawnHanList[i].subcoinSum;
                if (pid === this.impawnHanList[i].pid) {
                    playerHanImpawnTimes++;
                    playerHanImpawnTotal += betSum;
                }
                if (i < SHOW_BETITEM_COUNT) {
                    impawnList.push({
                        isChu: this.impawnHanList[i].isChu, betSum: betSum,
                        nickname: this.impawnHanList[i].nickname
                    });
                }
            }
            objMsg.pid = pid;
            objMsg.impawnList = impawnList;
            objMsg.recordList = this.recordList;
            objMsg.chuWinRecord = this.chuRecord;
            objMsg.hanWinRecord = this.hanRecord;
            objMsg.playerChuImpawnTimes = playerChuImpawnTimes;
            objMsg.playerHanImpawnTimes = playerHanImpawnTimes;
            objMsg.playerChuImpawnTotal = playerChuImpawnTotal;
            objMsg.playerHanImpawnTotal = playerHanImpawnTotal;

            let cfgIsPause = config.impawn.isPause;
            let cfgHeadHour = config.impawn.headHour;
            let cfgTailHour = config.impawn.tailHour;
            objMsg.restartHour = cfgIsPause ? cfgTailHour : cfgHeadHour;
            objMsg.pauseHour = cfgIsPause ? cfgHeadHour : cfgTailHour;
        }
        g_handler.SendImpawnGameInfoMsg(g_cnclients, objMsg);
    },

    Result: function () {
        return constant.ImpawnResult(this.chuImpawnTotal, this.hanImpawnTotal);
    },

    Count: function (pid, nickname, isChu, coinSum, subcoinSum) {
        let impawnList = isChu ? this.impawnChuList : this.impawnHanList;
        let betSum = coinSum + subcoinSum;
        let i = 0, len = impawnList.length;
        for (; i < len; ++i) {
            if (impawnList[i].coinSum + impawnList[i].subcoinSum < betSum) break;
        }
        impawnList.splice(i, 0, {
            pid: pid, nickname: nickname, isChu: isChu,
            coinSum: coinSum, subcoinSum: subcoinSum,
            time: (new Date()).format('yyyy-MM-dd hh:mm:ss')
        });

        if (isChu) {
            this.chuImpawnTotal += betSum;
        } else {
            this.hanImpawnTotal += betSum;
        }

        if (this.chuImpawnTotal > 0) {
            this.chuAwardRate = (this.chuImpawnTotal + this.hanImpawnTotal) / this.chuImpawnTotal;
            this.chuAwardRate = Math.floor(this.chuAwardRate * 100);
        }
        if (this.hanImpawnTotal > 0) {
            this.hanAwardRate = (this.chuImpawnTotal + this.hanImpawnTotal) / this.hanImpawnTotal;
            this.hanAwardRate = Math.floor(this.hanAwardRate * 100);
        }

        g_handler.SendImpawnNewBetMsg(g_cnclients, {
            pid: (i < SHOW_BETITEM_COUNT) ? null : pid, isChu: isChu,
            nickname: nickname, betSum: betSum, round: this.round
        });
        this.SendGameInfo();
    },

    Bet: function (betMsg) {
        if (betMsg.coinSum < 0 || betMsg.subcoinSum < 0 ||
            betMsg.coinSum + betMsg.subcoinSum < constant.IMPAWN_MIN_BET_SUM ||
            betMsg.coinSum + betMsg.subcoinSum > constant.IMPAWN_MAX_BET_SUM) {
            betMsg.reason = BET_FAIL.Reason.PARAM_ERROR;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }
        if (this.state !== common.ImpawnState.STARTING) {
            betMsg.reason = BET_FAIL.Reason.NO_STARTING;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }
        if (this.round !== betMsg.round) {
            betMsg.reason = BET_FAIL.Reason.ROUND_ERROR;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }

        let player = this.playerList.get(betMsg.pid);
        if (player && -player.winLossCoin >= config.impawn.maxLossCoin) {
            betMsg.reason = BET_FAIL.Reason.OVER_MAX_LOSS;
            g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
            return;
        }

        let playerKey = g_player.GetKey(betMsg.pid);
        let withholdKey = g_withhold.GetKey(betMsg.pid, common.Location.IMPAWN, betMsg.round);
        g_gmredis.Watch([playerKey, withholdKey], async function (err) {
            if (err) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                g_log.Error(err);
                return;
            }

            let cmds = g_withhold.FillCmd(betMsg.pid, common.Location.IMPAWN, betMsg.round, [
                ['HGET', common.PropID.COIN],
                ['HGET', common.PropID.SUBCOIN]
            ]);
            cmds = cmds.concat(g_player.FillCmd(betMsg.pid, [
                ['HGET', common.PropID.COIN],
                ['HGET', common.PropID.SUBCOIN],
                ['HGET', 'nickname'],
            ]));
            let replies = await g_gmredis.Batch(cmds);
            if (replies === null) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            let whCoin = replies[0] ? Number(replies[0]) : 0;
            let whSubcoin = replies[1] ? Number(replies[1]) : 0;
            let coin = replies[2] ? Number(replies[2]) : 0;
            let subcoin = replies[3] ? Number(replies[3]) : 0;
            if (coin < betMsg.coinSum || subcoin < betMsg.subcoinSum) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.COIN_NOT_ENOUGH;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            let nickname = replies[4];
            if (!nickname || nickname.length === 0) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                g_log.Error('投注获得昵称数据失败');
                return;
            }

            if (this.state !== common.ImpawnState.STARTING) {
                g_gmredis.Unwatch();
                betMsg.reason = BET_FAIL.Reason.NO_STARTING;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }

            cmds = g_player.FillCmd(betMsg.pid, [
                ['HSET', common.PropID.COIN, coin - betMsg.coinSum],
                ['HSET', common.PropID.SUBCOIN, subcoin - betMsg.subcoinSum]
            ]);
            cmds = cmds.concat(g_withhold.FillCmd(betMsg.pid, common.Location.IMPAWN, betMsg.round, [
                ['HSET', 'pid', betMsg.pid],
                ['HSET', 'isChu', betMsg.isChu],
                ['HSET', 'round', betMsg.round],
                ['HSET', common.PropID.COIN, whCoin + betMsg.coinSum],
                ['HSET', common.PropID.SUBCOIN, whSubcoin + betMsg.subcoinSum]
            ]));
            let result = await g_gmredis.Multi(cmds);
            if (result === null) {
                betMsg.reason = BET_FAIL.Reason.REDIS_ERROR;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }
            if (!result) {
                betMsg.reason = BET_FAIL.Reason.WRITE_REDIS_FAIL;
                g_handler.SendImpawnBetFailMsg(g_cnclients, betMsg);
                return;
            }
            g_impawn.Count(betMsg.pid, nickname, betMsg.isChu, betMsg.coinSum, betMsg.subcoinSum);
        }.bind(this));
    },

    JudgeOver: function () {
        let totalSuccess = true;
        for (let i = 0, len = this.impawnChuList.length; totalSuccess && i < len; ++i) {
            totalSuccess = this.impawnChuList[i].success;
        }
        for (let i = 0, len = this.impawnHanList.length; totalSuccess && i < len; ++i) {
            totalSuccess = this.impawnHanList[i].success;
        }
        if (totalSuccess) StartGame.call(this);
        return totalSuccess;
    },

    Settlement: function (result) {
        if (this.JudgeOver()) return;
        if (result === null) {
            for (let i = 0, len = this.impawnChuList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnChuList[i], -100, 1);
            for (let i = 0, len = this.impawnHanList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnHanList[i], -100, 1);
        } else if (result) {
            for (let i = 0, len = this.impawnChuList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnChuList[i], this.chuAwardRate, 1);
            for (let i = 0, len = this.impawnHanList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnHanList[i], 0, 1);
        } else {
            for (let i = 0, len = this.impawnChuList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnChuList[i], 0, 1);
            for (let i = 0, len = this.impawnHanList.length; i < len; ++i)
                DoSettlement.call(this, this.impawnHanList[i], this.hanAwardRate, 1);
        }
    },

    PauseGame: function () {
        function IsPauseGameTime() {
            let headHour = config.impawn.headHour;
            let tailHour = config.impawn.tailHour;
            if (headHour === tailHour) return;
            let nowHour = (new Date()).getHours();
            let inRange = nowHour >= headHour && nowHour < tailHour;
            return (inRange === config.impawn.isPause);
        }

        if (!IsPauseGameTime()) return;
        this.state = common.ImpawnState.PAUSE;
        this.SendGameState();

        this.restartTimer = setInterval(function () {
            ClearPlayerWinLoss.call(this);
            if (IsPauseGameTime()) return;
            clearInterval(this.restartTimer);
            StartGame.call(this);
        }.bind(this), 5000);

        return true;
    },
};

module.exports = impawn;