// --------------------------------------------------------
// 修改昵称相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const constant = require('../../../protocol/Constant');
const MSG_ALTER_NAME_DBCL = require('../../../protocol/MSG_ALTER_NAME_DBCL')['MSG_ALTER_NAME_DBCL'];
const MSG_ALTER_NAME_CLDB = require('../../../protocol/MSG_ALTER_NAME_CLDB')['MSG_ALTER_NAME_CLDB'];

function SendCLAlterNameMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_ALTER_NAME_CLDB');
    g_dbclient.Send(MSG_ALTER_NAME_CLDB.encode(msg).finish());
}

function SendDBAlterNameMsg(msg) {
    msg.msgID = protocol.GetMsgId('MSG_ALTER_NAME_DBCL');
    g_cnclients.Send(MSG_ALTER_NAME_DBCL.encode(msg).finish());
}

g_cnclients.on('MSG_ALTER_NAME_CLDB', function (client, data, hasCheck) {
    let msg = MSG_ALTER_NAME_CLDB.decode(data);

    if (!hasCheck) {
        g_wxaccess.CheckValid(msg.newName, function (result) {
            if (result) {
                let owner = client.GetOwner();
                if (owner) owner.emit('MSG_ALTER_NAME_CLDB', client, data, true);
            } else {
                msg.result = MSG_ALTER_NAME_DBCL.Result.NAME_INVALID;
                SendDBAlterNameMsg(msg);
            }
        });
        return;
    }

    g_gmredis.Watch(g_player.GetKey(msg.pid), async function (err) {
        if (err) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.REDIS_ERROR;
            SendDBAlterNameMsg(msg);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }

        let cmds = g_player.FillCmd(msg.pid, [
            ['HGET', 'nickname'],
            ['HGET', common.PropID.COIN]
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.REDIS_ERROR;
            SendDBAlterNameMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let nickname = replies[0];
        if (!nickname || nickname.length === 0) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.LACK_PI_INFO;
            SendDBAlterNameMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let cost = 0;
        if (!constant.FirstAlterName(nickname)) {
            cost = constant.ALTER_NAME_COST;
        }
        if (cost !== msg.cost) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.COST_ERROR;
            SendDBAlterNameMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        let coin = replies[1] ? Number(replies[1]) : 0;
        if (coin < cost) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.LACK_COIN;
            SendDBAlterNameMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        if (cost === 0) {
            msg.coin = coin;
            SendCLAlterNameMsg(msg);
            g_gmredis.Unwatch();
            return;
        }

        cmds = g_player.FillCmd(msg.pid, [
            ['HSET', common.PropID.COIN, coin - cost]
        ]);
        let result = g_gmredis.Multi(cmds);
        if (result === null) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.REDIS_ERROR;
            SendDBAlterNameMsg(msg);
            return;
        }
        if (!result) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.REDIS_FAIL;
            SendDBAlterNameMsg(msg);
            return;
        };

        msg.coin = coin;
        SendCLAlterNameMsg(msg);
    });
});

g_dbclient.on('MSG_ALTER_NAME_DBCL', function (client, data) {
    let msg = MSG_ALTER_NAME_DBCL.decode(data);
    let isSuccess = (msg.result === MSG_ALTER_NAME_DBCL.Result.SUCCESS);
    if (!isSuccess && msg.cost === 0) {
        SendDBAlterNameMsg(msg);
        return;
    }
    g_gmredis.Watch(g_player.GetKey(msg.pid), async function (err) {
        if (err) {
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
            g_gmredis.Unwatch();
            return;
        }

        let playerExist = (replies[0] === 1);
        if (!playerExist) {
            g_gmredis.Unwatch();
            return;
        }

        let coin = replies[1] ? Number(replies[1]) : 0;
        cmds = new Array();
        if (isSuccess) {
            cmds = g_player.FillCmd(msg.pid, [
                ['HSET', 'nickname', msg.newName]
            ]);
        } else if (msg.cost > 0) {
            cmds = g_player.FillCmd(msg.pid, [
                ['HSET', common.PropID.COIN, coin + msg.cost]
            ]);
        } else {
            g_gmredis.Unwatch();
            return;
        }
        let result = g_gmredis.Multi(cmds);
        if (!result) return;

        SendDBAlterNameMsg(msg);
    });
});