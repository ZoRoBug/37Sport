// --------------------------------------------------------
// 登录相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const https = require('https');
const helper = require('../../../public/Helper');
const dblog = require('../../../protocol/DBLog');
const constant = require('../../../protocol/Constant');
const protocol = require('../../../protocol/protocol');
const MSG_LOGIN_CLDB = require('../../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KICK_LBCL = require('../../../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_PLAYER_REGISTER_CLDB = require('../../../protocol/MSG_PLAYER_REGISTER_CLDB')['MSG_PLAYER_REGISTER_CLDB'];
const MSG_PLAYER_REGISTER_DBCL = require('../../../protocol/MSG_PLAYER_REGISTER_DBCL')['MSG_PLAYER_REGISTER_DBCL'];

function AddLoginLog(pid, ip, loginTime, logoutTime) {
    let msgLog = {
        pid: pid, ip: ip, guid: '',
        loginTime: loginTime || '1970-01-01 00:00:00',
        logoutTime: logoutTime || '1970-01-01 00:00:00',
    };
    let msgData = dblog.DBLoginLog.encode(msgLog).finish();
    g_dbredis.Batch([['RPUSH', 'login_log', msgData]], function (err) {
        if (err) g_log.Matter('保存登录日志失败：%s', JSON.stringify(msgLog));
    });
}

function SendKickMsg(pid, reason) {
    g_cnclients.Send(MSG_KICK_LBCL.encode({
        msgID: protocol.GetMsgId('MSG_KICK_LBCL'),
        pid: pid, reason: reason
    }).finish());
}

function SendLoginMsg(loginID, result, pi, propList) {
    let msg = {
        msgID: protocol.GetMsgId('MSG_LOGIN_DBCL'),
        loginID: loginID, result: result
    };
    if (result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        msg.pi = pi, msg.propList = propList;
    }
    g_cnclients.Send(MSG_LOGIN_DBCL.encode(msg).finish());
}

function WXAuthCode(client, msg) {
    https.get(g_wxaccess.GetAuthCodeUrl(msg.wxCode), function (result) {
        result.on('data', function (data) {
            let arrData = null;
            try {
                arrData = JSON.parse(data);
                if (arrData.errcode == -1) {
                    throw MSG_LOGIN_DBCL.Result.WX_SYSTEM_BUSY;
                } else if (arrData.errcode == 40029) {
                    throw MSG_LOGIN_DBCL.Result.WX_CODE_INVALID;
                } else if (arrData.errcode == 45011) {
                    throw MSG_LOGIN_DBCL.Result.WX_LOGIN_TOOMUCH;
                } else if (arrData.errcode && arrData.errcode != 0) {
                    throw MSG_LOGIN_DBCL.Result.WX_UNKNOW_ERROR;
                }
            } catch (retCode) {
                if (typeof retCode !== 'number') {
                    g_log.Error('WXAuthCode parse error: %s', retCode);
                    retCode = MSG_LOGIN_DBCL.Result.WX_PARSE_FAIL;
                } else {
                    g_log.Error('WXAuthCode errcode: %s, errmsg: %s', arrData.errcode, arrData.errmsg);
                }
                SendLoginMsg(msg.loginID, retCode);
                return;
            }

            if (typeof arrData.openid !== 'string' || arrData.openid.length === 0 ||
                typeof arrData.session_key !== 'string' || arrData.session_key.length === 0) {
                SendLoginMsg(msg.loginID, MSG_LOGIN_DBCL.Result.WX_DATA_ERROR);
                return;
            }

            msg.wxCode = null;
            msg.account = arrData.openid;
            msg.wxSessionKey = arrData.session_key;
            let owner = client.GetOwner();
            if (owner) owner.emit('MSG_LOGIN_CLDB', client, MSG_LOGIN_CLDB.encode(msg).finish());
        });
    }).on('error', function (err) {
        g_log.Error('WXAuthCode error: %s', err);
        SendLoginMsg(msg.loginID, MSG_LOGIN_DBCL.Result.WX_URL_GET_ERROR);
    });
}

g_cnclients.on('MSG_LOGIN_CLDB', async function (client, data) {
    let msgIn = MSG_LOGIN_CLDB.decode(data);
    if (helper.IsWeiXinPlatform(msgIn.platform) && msgIn.wxCode.length !== 0) {
        WXAuthCode(client, msgIn);
        return;
    }
    let replys = await g_gmredis.Batch([['GET', g_player.GetAcctKey(msgIn.account)]]);
    if (replys === null) {
        SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.REDIS_GET_ERROR);
        return;
    }
    let pid = replys[0];
    if (pid === null) {
        g_dbclient.Send(data);
        return;
    }
    g_gmredis.Watch(g_player.GetKey(pid), async function (err) {
        if (err) {
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.UNKNOW3);
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }
        let cmds = g_player.FillCmd(pid, [
            ['HGET', 'password'],
            ['HGET', 'loginTime']
        ]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.UNKNOW4);
            g_gmredis.Unwatch();
            return;
        }
        if (replies[0] !== String(msgIn.password)) {
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.PASSWORD_ERROR);
            g_gmredis.Unwatch();
            return;
        }
        let oldLoginTime = replies[1];
        let newLoginTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
        cmds = g_player.FillCmd(pid, [
            ['HSET', 'online', 1],
            ['HSET', 'loginTime', newLoginTime]
        ]);
        let result = await g_gmredis.Multi(cmds);
        if (result === null) {
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.UNKNOW5);
            return;
        }
        if (!result) {
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.UNKNOW6);
            return;
        }
        AddLoginLog(pid, msgIn.ip, oldLoginTime, newLoginTime);
        SendKickMsg(pid, MSG_KICK_LBCL.Reason.OTHER_LOGIN);
        g_player.ToObject(pid, function (replies) {
            if (!replies) {
                SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.UNKNOW7);
                return;
            }
            SendLoginMsg(msgIn.loginID, MSG_LOGIN_DBCL.Result.SUCCESS, replies.pi, replies.propList);
        });
    });
});

g_dbclient.on('MSG_LOGIN_DBCL', function (client, data) {
    let msgIn = MSG_LOGIN_DBCL.decode(data);
    if (msgIn.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
        g_cnclients.Send(data);
        return;
    }
    g_player.ToHash(msgIn.pi, msgIn.propList, function (result) {
        if (result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
            SendLoginMsg(msgIn.loginID, result);
            return;
        }
        g_cnclients.Send(data);
    });
});

g_cnclients.on('MSG_LOGOUT_CLGM', function (client, data, times) {
    if (!times) times = 1;
    if (times > constant.REDIS_MAX_RETRY_TIMES) return;
    let msgIn = MSG_LOGOUT_CLGM.decode(data);
    g_gmredis.Watch(g_player.GetKey(msgIn.pid), async function (err) {
        if (err) {
            g_gmredis.Unwatch();
            g_log.Error(err);
            return;
        }
        let cmds = g_player.FillCmd(msgIn.pid, [['HGET', 'loginTime']]);
        let replies = await g_gmredis.Batch(cmds);
        if (replies === null) {
            g_gmredis.Unwatch();
            return;
        }
        let loginTime = replies[0];
        if (loginTime === null) {
            g_gmredis.Unwatch();
            return;
        }
        let logoutTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
        cmds = g_player.FillCmd(msgIn.pid, [
            ['HSET', 'online', 0],
            ['HSET', 'logoutTime', logoutTime]
        ]);
        let result = await g_gmredis.Multi(cmds);
        if (result === null) return;
        if (!result) {
            let owner = client.GetOwner();
            if (owner) owner.emit('MSG_LOGOUT_CLGM', client, data, ++times);
        } else {
            AddLoginLog(msgIn.pid, msgIn.ip, loginTime, logoutTime);
            g_player.Save(msgIn.pid);
        }
    });
});

g_cnclients.on('MSG_PLAYER_REGISTER_CLDB', function (client, data) {
    let msg = MSG_PLAYER_REGISTER_CLDB.decode(data);
    g_wxaccess.CheckValid(msg.nickname, function (result) {
        if (result) {
            g_dbclient.Send(data);
        } else {
            msg.msgID = protocol.GetMsgId('MSG_PLAYER_REGISTER_DBCL');
            msg.result = MSG_PLAYER_REGISTER_DBCL.Result.NAME_INVALID;
            g_cnclients.Send(MSG_PLAYER_REGISTER_DBCL.encode(msg).finish());
        }
    });
});

g_dbclient.on('MSG_PLAYER_REGISTER_DBCL', function (client, data) {
    g_cnclients.Send(data);
});