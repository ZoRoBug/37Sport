// --------------------------------------------------------
// 查看记录相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const dblog = require('../../../protocol/DBLog');
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_VIEW_RECORD_CLDB = require('../../../protocol/MSG_VIEW_RECORD_CLDB')['MSG_VIEW_RECORD_CLDB'];
const MSG_VIEW_RECORD_DBCL = require('../../../protocol/MSG_VIEW_RECORD_DBCL')['MSG_VIEW_RECORD_DBCL'];

function SendCLViewRecordMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_VIEW_RECORD_CLDB');
    g_dbclient.Send(MSG_VIEW_RECORD_CLDB.encode(msg).finish());
}

function SendDBViewRecordMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_VIEW_RECORD_DBCL');
    g_cnclients.Send(MSG_VIEW_RECORD_DBCL.encode(msg).finish());
}

function SaveUpdateLog(log) {
    log.propID = common.PropID.COIN;
    log.reason = common.Reason.VIEW_RECORD;
    log.time = (new Date()).format('yyyy-MM-dd hh:mm:ss');
    let logData = dblog.DBUpdateLog.encode(log).finish();
    g_dbredis.Batch([['RPUSH', 'update_log', logData]], function (err) {
        if (err) g_log.Matter('保存道具更新日志失败：%s', JSON.stringify(log));
    });
}

g_cnclients.on('MSG_VIEW_RECORD_CLDB', function (client, data) {
    let msg = MSG_VIEW_RECORD_CLDB.decode(data);
    g_gmredis.Watch(g_player.GetKey(msg.pid), async function (err) {
        if (err) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.REDIS_ERROR;
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN]
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.REDIS_ERROR;
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.NO_PLAYER_INFO;
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let coin = replies[1] ? Number(replies[1]) : 0;
        if (coin < msg.cost) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.LACK_COIN;
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        if (msg.cost === 0) {
            SendCLViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin - msg.cost]
        ]);
        let result = g_gmredis.Multi(cmds);
        if (result === null) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.REDIS_ERROR;
            SendDBViewRecordMsg(msg);
            return;
        }
        if (!result) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.REDIS_FAIL;
            SendDBViewRecordMsg(msg);
            return;
        };

        SaveUpdateLog({
            pid: msg.pid, update: -msg.cost,
            result: coin - msg.cost
        });

        SendCLViewRecordMsg(msg);
    });
});

g_dbclient.on('MSG_VIEW_RECORD_DBCL', function (client, data) {
    let msg = MSG_VIEW_RECORD_DBCL.decode(data);
    if (msg.result === MSG_VIEW_RECORD_DBCL.Result.SUCCESS || msg.cost === 0) {
        SendDBViewRecordMsg(msg);
        return;
    }

    g_gmredis.Watch(g_player.GetKey(msg.pid), async function (err) {
        if (err) {
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['EXISTS'],
            ['HGET', common.PropID.COIN]
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            SendDBViewRecordMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let coin = replies[1] ? Number(replies[1]) : 0;
        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin + msg.cost]
        ]);
        let result = g_gmredis.Multi(cmds);
        if (!result) {
            SendDBViewRecordMsg(msg);
            return;
        }

        SaveUpdateLog({
            pid: msg.pid, update: msg.cost,
            result: coin + msg.cost,
        });

        SendDBViewRecordMsg(msg);
    });
});