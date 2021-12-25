// --------------------------------------------------------
// 失效预扣退还处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const dblog = require('../../protocol/DBLog');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');

function RestartRefund(ms) {
    clearTimeout(this.restartTimer);
    this.restartTimer = setTimeout(function () {
        this.StartRefund();
    }.bind(this), ms || 10 * 60 * 1000);
}

function GetKeyName(type) {
    if (type === common.Location.KING3) {
        return 'KING3_REFUND_ROUND';
    } else if (type === common.Location.POWER7) {
        return 'POWER7_REFUND_ROUND';
    } else if (type === common.Location.IMPAWN) {
        return 'IMPAWN_REFUND_ROUND';
    }
}

function GetMinRound(type) {
    let objGame = null;
    if (type === common.Location.KING3) {
        objGame = g_king3;
    } else if (type === common.Location.POWER7) {
        objGame = g_power7;
    } else if (type === common.Location.IMPAWN) {
        objGame = g_impawn;
    } else {
        return 0;
    }
    if (typeof (objGame) !== 'object' ||
        typeof (objGame.GetMinRound) !== 'function') {
        return 0;
    }
    let minRound = objGame.GetMinRound();
    return minRound ? minRound - 1 : 0;
}

function SaveUpdateLog(log, type) {
    if (type === common.Location.KING3) {
        log.reason = common.Reason.KING3_REFUND;
    } else if (type === common.Location.POWER7) {
        log.reason = common.Reason.POWER7_REFUND;
    } else if (type === common.Location.IMPAWN) {
        log.reason = common.Reason.IMPAWN_REFUND;
    }
    log.time = (new Date()).format('yyyy-MM-dd hh:mm:ss');
    let logData = dblog.DBUpdateLog.encode(log).finish();
    g_dbredis.Batch([['RPUSH', 'update_log', logData]], function (err) {
        if (err) g_log.Matter('保存道具更新日志失败：%s', JSON.stringify(log));
    });
}

async function HandleRefund(whKey, times) {
    let replies = await g_gmredis.Batch([
        ['HGET', whKey, 'pid'],
        ['HGET', whKey, 'round'],
        ['HGET', whKey, 'isChu'],
        ['HGET', whKey, 'session'],
        ['HGET', whKey, common.PropID.COIN],
        ['HGET', whKey, common.PropID.SUBCOIN]
    ]);
    if (replies === null) {
        setTimeout(function () {
            HandleRefund.call(this, whKey, times);
        }.bind(this), 3000);
        return;
    }

    if (isNaN(replies[0]) || isNaN(replies[1]) || isNaN(replies[4])) {
        g_log.Matter('退还预扣数据错误%s/%s/%s/%s/%s/%s',
            replies[0], replies[1], replies[2], replies[3], replies[4], replies[5]);
        g_gmredis.Batch([['DEL', whKey]], function () { });
        return;
    }
    let pid = Number(replies[0]);
    let round = Number(replies[1]);
    let isChu = replies[2];
    let session = replies[3];
    let whCoin = Number(replies[4]);
    let whSubcoin = replies[5] ? Number(replies[5]) : 0;

    let pKey = g_player.GetKey(pid);
    g_gmredis.Watch([pKey, whKey], async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN],
            ['HGET', common.PropID.SUBCOIN]
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            return;
        }

        if (replies[0] !== 1) {
            g_gmredis.Unwatch();
            g_log.Matter('退还预扣玩家信息不存在%s/%s/%s/%s/%s/%s',
                pid, round, isChu, session, whCoin, whSubcoin);
            g_gmredis.Batch([['DEL', whKey]], function () { });
            return;
        }
        let coin = replies[1] ? Number(replies[1]) : 0;
        let subcoin = replies[2] ? Number(replies[2]) : 0;

        cmds = [['DEL', whKey]];
        cmds = cmds.concat(g_player.FillCmd(pid, [
            ['HSET', common.PropID.COIN, coin + whCoin],
            ['HSET', common.PropID.SUBCOIN, subcoin + whSubcoin]
        ]));
        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            setTimeout(function () {
                HandleRefund.call(this, whKey, times);
            }.bind(this), 3000);
            return;
        }

        let note = String(round);
        if (session !== null) note = note + '-' + session;
        if (isChu !== null) note = note + '-' + (isChu ? '1' : '0');

        if (result) {
            let log = { pid: pid, note: note };
            if (whCoin > 0) {
                log.update = whCoin;
                log.result = coin + whCoin;
                log.propID = common.PropID.COIN;
                SaveUpdateLog(log, this.type);
            }
            if (whSubcoin > 0) {
                log.update = whSubcoin;
                log.result = subcoin + whSubcoin;
                log.propID = common.PropID.SUBCOIN;
                SaveUpdateLog(log, this.type);
            }
            g_handler.SendRefundMsg({
                pid: pid, type: this.type,
                coin: whCoin, subcoin: whSubcoin
            });
            g_player.Save(pid);
        } else if (times < constant.REDIS_MAX_RETRY_TIMES) {
            setTimeout(function () {
                HandleRefund.call(this, whKey, times + 1);
            }.bind(this), 10);
        } else {
            g_log.Matter('多次退还预扣失败%s/%s/%s/%s/%s/%s',
                pid, round, isChu, session, whCoin, whSubcoin);
            g_gmredis.Batch([['DEL', whKey]], function () { });
        }
    }.bind(this));
}

function DoRefund() {
    clearInterval(this.timerRefund);
    this.timerRefund = setTimeout(function () {
        if (this.isStop || this.round > this.endRound) {
            RestartRefund.call(this);
            return;
        }
        g_gmredis.Batch([
            ['KEYS', g_withhold.GetKey('*', this.type, this.round)]
        ], function (err, replies) {
            if (err) {
                DoRefund.call(this);
                g_log.Error(err);
                return;
            }
            let whKeyList = replies[0];
            for (let i = 0, len = whKeyList.length; i < len; ++i) {
                HandleRefund.call(this, whKeyList[i], 1);
            }
            let key = GetKeyName(this.type);
            g_gmredis.Batch([['SET', key, ++this.round]], function () { });

            DoRefund.call(this);
        }.bind(this));
    }.bind(this), 100);
}

function OpenGetRoundTimer() {
    setTimeout(function () {
        let cmds = [['GET', GetKeyName(this.type)]];
        g_gmredis.Batch(cmds, function (err, replies) {
            if (err) {
                OpenGetRoundTimer.call(this);
                g_log.Error(err);
                return;
            }
            this.round = replies[0] ? Number(replies[0]) : 1;
            RestartRefund.call(this, 10 * 1000);
        }.bind(this));
    }.bind(this), 3000);
}

const refund = {
    Init: function (type) {
        this.type = type;
        if (!GetKeyName(this.type)) {
            g_log.Error('预扣退还游戏类型错误%s', type);
            return;
        }
        OpenGetRoundTimer.call(this);
    },

    StopRefund: function (isStop) {
        this.isStop = isStop;
    },

    StartRefund: function () {
        if (!this.round) return;
        if (!GetKeyName(this.type)) return;
        this.endRound = GetMinRound(this.type);
        DoRefund.call(this);
    },
};

module.exports = refund;