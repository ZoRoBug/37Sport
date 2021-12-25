// --------------------------------------------------------
// 兑换军饷相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const helper = require('../../../public/Helper');
const dblog = require('../../../protocol/DBLog');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const constant = require('../../../protocol/Constant');
const MSG_EXCHANGE_CLLB = require('../../../protocol/MSG_EXCHANGE_CLLB')['MSG_EXCHANGE_CLLB'];
const MSG_EXCHANGE_LBCL = require('../../../protocol/MSG_EXCHANGE_LBCL')['MSG_EXCHANGE_LBCL'];
const MSG_ADD_EXCH_CODE_CLLB = require('../../../protocol/MSG_ADD_EXCH_CODE_CLLB')['MSG_ADD_EXCH_CODE_CLLB'];
const MSG_ADD_EXCH_CODE_LBCL = require('../../../protocol/MSG_ADD_EXCH_CODE_LBCL')['MSG_ADD_EXCH_CODE_LBCL'];

function GetExchangeKey() {
    return 'EXCHANGE';
}

function GetFailTimesKey(pid) {
    return 'EXCFAILTIMES' + String(pid);
}

function SendAddExchCodeMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_ADD_EXCH_CODE_LBCL');
    g_cnclients.Send(MSG_ADD_EXCH_CODE_LBCL.encode(msg).finish());
}

function SendExchangeMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_EXCHANGE_LBCL');
    g_cnclients.Send(MSG_EXCHANGE_LBCL.encode(msg).finish());
    if (!isNaN(msg.failTimes) && msg.failTimes >= 0) {
        let failTimesKey = GetFailTimesKey(msg.pid);
        g_gmredis.Batch([
            ['SET', failTimesKey, msg.failTimes],
            ['EXPIRE', failTimesKey, constant.EXCHANGE_FAIL_EXPIRE_SEC]
        ], function (err) {
            if (err) g_log.Error('修改兑换失败次数失败：%s', JSON.stringify(msg));
        });
    }
}

function SaveUpdateLog(log) {
    log.propID = common.PropID.COIN;
    log.reason = common.Reason.TICKET_EXCHANGE;
    log.time = (new Date()).format('yyyy-MM-dd hh:mm:ss');
    let logData = dblog.DBUpdateLog.encode(log).finish();
    g_dbredis.Batch([['RPUSH', 'update_log', logData]], function (err) {
        if (err) g_log.Matter('保存道具更新日志失败：%s', JSON.stringify(log));
    });
}

g_cnclients.on('MSG_EXCHANGE_CLLB', function (client, data) {
    let msg = MSG_EXCHANGE_CLLB.decode(data);

    let exCoin = helper.GetExchangeSum(msg.ticket);
    if (!exCoin || exCoin < constant.EXCHANGE_TICKET_MIN_SUM ||
        exCoin > constant.EXCHANGE_TICKET_MAX_SUM) {
        msg.result = MSG_EXCHANGE_LBCL.Result.PARAM_INVALID;
        SendExchangeMsg(msg);
        return;
    }

    let eKey = GetExchangeKey();
    let pKey = g_player.GetKey(msg.pid);
    g_gmredis.Watch([pKey, eKey], async function (err) {
        if (err) {
            msg.result = MSG_EXCHANGE_LBCL.Result.REDIS_ERROR;
            SendExchangeMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds.push(['SISMEMBER', eKey, msg.ticket]);
        cmds.push(['GET', GetFailTimesKey(msg.pid)]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_EXCHANGE_LBCL.Result.REDIS_ERROR;
            SendExchangeMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        let coin = replies[1] ? Number(replies[1]) : 0;
        let hasTicket = (replies[2] === 1);
        msg.failTimes = replies[3] ? Number(replies[3]) : 0;

        if (!playerExist) {
            msg.result = MSG_EXCHANGE_LBCL.Result.PLAYER_OFFLINE;
            SendExchangeMsg(msg);
            g_gmredis.Unwatch();
            return;
        }
        if (msg.failTimes >= constant.EXCHANGE_FAIL_MAX_TIMES) {
            msg.result = MSG_EXCHANGE_LBCL.Result.MAX_FAIL_TIMES;
            SendExchangeMsg(msg);
            g_gmredis.Unwatch();
            return;
        }
        if (!hasTicket) {
            msg.failTimes++;
            msg.result = MSG_EXCHANGE_LBCL.Result.TICKET_NO_EXIST;
            SendExchangeMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin + exCoin]
        ]);
        cmds.push(['SREM', eKey, msg.ticket]);
        let result = g_gmredis.Multi(cmds);
        if (!result) {
            msg.result = MSG_EXCHANGE_LBCL.Result.REDIS_ERROR;
            SendExchangeMsg(msg);
            return;
        }

        SaveUpdateLog({
            pid: msg.pid, update: exCoin, result: coin + exCoin
        });

        msg.failTimes = 0;
        msg.coin = exCoin;
        msg.result = MSG_EXCHANGE_LBCL.Result.SUCCESS;
        SendExchangeMsg(msg);
    });
});

g_cnclients.on('MSG_ADD_EXCH_CODE_CLLB', function (client, data) {
    let msg = MSG_ADD_EXCH_CODE_CLLB.decode(data);

    let exCoin = helper.GetExchangeSum(msg.ticket);
    if (!exCoin || exCoin < constant.EXCHANGE_TICKET_MIN_SUM ||
        exCoin > constant.EXCHANGE_TICKET_MAX_SUM) {
        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.PARAM_INVALID;
        SendAddExchCodeMsg(msg);
        return;
    }

    let eKey = GetExchangeKey();
    let cmds = [['SADD', eKey, msg.ticket]];
    g_gmredis.Batch(cmds, function (err, replies) {
        if (err) {
            msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.REDIS_ERROR;
            SendAddExchCodeMsg(msg);
            g_log.Error(err);
            return;
        }

        let addSuccess = (replies[0] === 1);
        if (!addSuccess) {
            msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.TICKET_EXIST;
            SendAddExchCodeMsg(msg);
            return;
        }

        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.SUCCESS;
        SendAddExchCodeMsg(msg);
    });
});