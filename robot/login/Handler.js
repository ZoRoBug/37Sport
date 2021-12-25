"use strict";
const config = require('./Config');
const protocol = require('../../protocol/protocol');
const MSG_APPLY_CLGT = require('../../protocol/MSG_APPLY_CLGT')['MSG_APPLY_CLGT'];
const MSG_DISTRIBUTE_GTCL = require('../../protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];
const MSG_LOGIN_CLDB = require('../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KICK_LBCL = require('../../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];

function AlterLoginMsg(msg) {
    if (!config.login.errorTest) return msg;
    let randomAccount = Math.randomnum(1, 1000);
    if (randomAccount <= 1) {
        msg.account = null;
    } else if (randomAccount <= 2) {
        msg.account = '';
    } else if (randomAccount <= 3) {
        msg.account = 'account';
    } else if (randomAccount <= 4) {
        msg.account = 'accountaccountaccountaccountaccountaccountaccountaccount';
    }

    let randomPassword = Math.randomnum(1, 1000);
    if (randomPassword <= 1) {
        msg.password = null;
    } else if (randomPassword <= 2) {
        msg.password = '';
    } else if (randomPassword <= 3) {
        msg.password = 'password';
    } else if (randomPassword <= 4) {
        msg.password = 'passwordpasswordpasswordpasswordpasswordpasswordpassword';
    }

    let randomTicket = Math.randomnum(1, 1000);
    if (randomTicket <= 1) {
        msg.ticket = null;
    } else if (randomTicket <= 2) {
        msg.ticket = '';
    } else if (randomTicket <= 3) {
        msg.ticket = 'ticket';
    } else if (randomTicket <= 4) {
        msg.ticket = 'ticketticketticketticketticketticketticketticketticketticket';
    }

    let randomPlatform = Math.randomnum(1, 1000);
    if (randomPlatform <= 1) {
        msg.platform = null;
    } else if (randomPlatform <= 2) {
        msg.platform = 'abc';
    } else if (randomPlatform <= 3) {
        msg.platform = 7;
    } else if (randomPlatform <= 4) {
        msg.platform = 1111111;
    }

    return msg;
}

const handler = {
    Init: function () {
        g_login.on('MSG_DISTRIBUTE_GTCL', OnDistributeMsg);
        g_login.on('MSG_LOGIN_DBCL', OnLoginMsg);
        g_login.on('MSG_KICK_LBCL', OnKickMsg);
    },

    Uninit: function () {
    },

    SendApplyMsg: function (client) {
        if (!config.login.errorTest || Math.randomnum(1, 100) > 1) {
            client.Send(MSG_APPLY_CLGT.encode({
                msgID: protocol.GetMsgId('MSG_APPLY_CLGT')
            }).finish());
        }
    },

    SendLoginMsg: function (client, msgInfo) {
        msgInfo = AlterLoginMsg(msgInfo);
        msgInfo.msgID = protocol.GetMsgId('MSG_LOGIN_CLDB');
        let err = MSG_LOGIN_CLDB.verify(msgInfo);
        if (err) {
            g_log.Error('MSG_LOGIN_CLDB verify err: %s', err);
            return;
        }
        let random = Math.randomnum(1, 500);
        if (config.login.errorTest && random === 1) {
            client.Send(null);
        } else if (config.login.errorTest && random === 2) {
            client.Send('111111');
        } else if (config.login.errorTest && random === 3) {
            client.Send(Buffer.from('111111'));
        } else {
            client.Send(MSG_LOGIN_CLDB.encode(msgInfo).finish());
        }
    },

    SendLogoutMsg: function (client) {
        if (config.login.errorTest && Math.randomnum(1, 100) <= 1) {
            client.Close();
        } else {
            client.Send(MSG_LOGOUT_CLGM.encode({
                msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM')
            }).finish(), function () {
                client.Close();
            });
        }
    }
};

function OnDistributeMsg(client, data) {
    let msg = MSG_DISTRIBUTE_GTCL.decode(data);
    if (msg.result != MSG_DISTRIBUTE_GTCL.Result.SUCCESS) {
        g_log.Error('申请服务器失败，返回：%s', JSON.stringify(msg));
    } else {
        if (!config.login.errorTest || Math.randomnum(1, 100) > 1) {
            g_login.CreateConn(msg.address, msg.ticket);
        }
    }
    if (!config.login.errorTest || Math.randomnum(1, 100) > 5) client.Close();
}

function OnLoginMsg(client, data) {
    let msg = MSG_LOGIN_DBCL.decode(data);
    if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
        g_log.Error('登录服务器失败，返回：%s', JSON.stringify(msg));
        if (!config.login.errorTest || Math.randomnum(1, 100) > 5) client.Close();
    } else {
        g_log.Info('%s登录成功', msg.pi.nickname);
    }
}

function OnKickMsg(client, data) {
    let msg = MSG_KICK_LBCL.decode(data);
    g_log.Info('%s被其他玩家挤下线', msg.pid);
    if (!config.login.errorTest || Math.randomnum(1, 100) > 5) client.Close();
}

module.exports = handler;