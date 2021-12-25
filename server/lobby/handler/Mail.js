// --------------------------------------------------------
// 信件相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const dblog = require('../../../protocol/DBLog');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_SEND_MAIL_CLLB = require('../../../protocol/MSG_SEND_MAIL_CLLB')['MSG_SEND_MAIL_CLLB'];
const MSG_SEND_MAIL_LBCL = require('../../../protocol/MSG_SEND_MAIL_LBCL')['MSG_SEND_MAIL_LBCL'];

function SendSendMailMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_SEND_MAIL_LBCL');
    g_cnclients.Send(MSG_SEND_MAIL_LBCL.encode(msg).finish());
}

function SaveUpdateLog(log) {
    log.propID = common.PropID.COIN;
    log.reason = common.Reason.MAIL_SEND_GIFT;
    log.time = (new Date()).format('yyyy-MM-dd hh:mm:ss');
    let logData = dblog.DBUpdateLog.encode(log).finish();
    g_dbredis.Batch([['RPUSH', 'update_log', logData]], function (err) {
        if (err) g_log.Matter('保存道具更新日志失败：%s', JSON.stringify(log));
    });
}

g_cnclients.on('MSG_SEND_MAIL_CLLB', function (client, data, hasCheck) {
    let msg = MSG_SEND_MAIL_CLLB.decode(data);

    if (!hasCheck) {
        g_wxaccess.CheckValid(msg.content, function (result) {
            if (result) {
                let owner = client.GetOwner();
                if (owner) owner.emit('MSG_SEND_MAIL_CLLB', client, data, true);
            } else {
                msg.result = MSG_SEND_MAIL_LBCL.Result.CONTENT_INVALID;
                SendSendMailMsg(msg);
            }
        });
        return;
    }

    let sendKey = g_player.GetKey(msg.sendPID);
    let recvKey = g_player.GetKey(msg.recvPID);
    g_gmredis.Watch([sendKey, recvKey], async function (err) {
        if (err) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.REDIS_ERROR;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }
        let cmds = g_player.FillCmd(msg.sendPID, [
            ['HGET', 'nickname'],
            ['HGET', common.PropID.COIN]
        ]);
        cmds = cmds.concat(g_player.FillCmd(msg.recvPID, [
            ['EXISTS'],
            ['HGET', 'online'],
            ['HGET', common.PropID.COIN]
        ]));
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.REDIS_ERROR;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        msg.sendName = replies[0];
        let sendCoin = replies[1] ? Number(replies[1]) : 0;
        if (!msg.sendName || msg.sendName.length === 0) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.SENDER_LACK_NAME;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }
        if (sendCoin < msg.giftCoin) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.SENDER_LACK_COIN;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }
        if (msg.sendName === msg.recvName) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.PARAM_INVALID;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let recvExist = (replies[2] === 1);
        if (!recvExist) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.RECVER_OFFLINE;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let recvOnline = (Number(replies[3]) === 1);
        if (!recvOnline) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.RECVER_OFFLINE;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        if (msg.giftCoin <= 0) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.SUCCESS;
            SendSendMailMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let recvCoin = replies[4] ? Number(replies[4]) : 0;
        cmds = g_player.FillCmd(msg.sendPID, [
            ['HSET', common.PropID.COIN, sendCoin - msg.giftCoin]
        ]);
        cmds = cmds.concat(g_player.FillCmd(msg.recvPID, [
            ['HSET', common.PropID.COIN, recvCoin + msg.giftCoin]
        ]));
        let result = await g_gmredis.Multi(cmds);
        if (!result) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.REDIS_ERROR;
            SendSendMailMsg(msg);
            return;
        }

        SaveUpdateLog({
            pid: msg.sendPID,
            update: -msg.giftCoin,
            result: sendCoin - msg.giftCoin,
            note: msg.recvName + '-' + msg.recvPID
        });
        SaveUpdateLog({
            pid: msg.recvPID,
            update: msg.giftCoin,
            result: recvCoin + msg.giftCoin,
            note: msg.sendName + '-' + msg.sendPID
        });

        msg.result = MSG_SEND_MAIL_LBCL.Result.SUCCESS;
        SendSendMailMsg(msg);
    });
});