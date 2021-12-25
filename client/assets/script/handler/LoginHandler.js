"use strict";
const common = require('../protocol/Common');
const utility = require('../public/Utility');
const protocol = require('../protocol/Protocol');
const MSG_LOGIN_CLDB = require('../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KICK_CLCN = require('../protocol/MSG_KICK_CLCN')['MSG_KICK_CLCN'];
const MSG_KICK_LBCL = require('../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_PLAYER_REGISTER_CLDB = require('../protocol/MSG_PLAYER_REGISTER_CLDB')['MSG_PLAYER_REGISTER_CLDB'];
const MSG_PLAYER_REGISTER_DBCL = require('../protocol/MSG_PLAYER_REGISTER_DBCL')['MSG_PLAYER_REGISTER_DBCL'];

g_handler.SendRegisterMsg = function (client) {
    client.Send(MSG_PLAYER_REGISTER_CLDB.encode({
        msgID: protocol.GetMsgId('MSG_PLAYER_REGISTER_CLDB'),
        nickname: this.registerNickname,
        password: this.registerPassword,
        platform: common.Platform.OFFICIAL,
    }).finish());
    this.registerNickname = null;
    this.registerPassword = null;
}

g_handler.SendLoginMsg = function (client) {
    let msg = {
        msgID: protocol.GetMsgId('MSG_LOGIN_CLDB'),
        wxCode: this.wxCode, ticket: this.ticket,
        platform: common.Platform.WX_MINIGAME,
        head: this.loginHead,
    };
    if (!utility.IsWeinXinPlatform()) {
        msg.account = this.loginAccount;
        msg.password = this.loginPassword;
        msg.platform = common.Platform.OFFICIAL;
    }
    client.Send(MSG_LOGIN_CLDB.encode(msg).finish());
}

g_handler.SendLogoutMsg = function (client) {
    client.Send(MSG_LOGOUT_CLGM.encode({
        msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM')
    }).finish());
}

g_handler.SendKickMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_KICK_CLCN');
    client.Send(MSG_KICK_CLCN.encode(msg).finish());
}

g_connclient.on('MSG_PLAYER_REGISTER_DBCL', function (data) {
    let msg = MSG_PLAYER_REGISTER_DBCL.decode(data);
    g_uiemitter.emit('UI_PLAYER_REGISTER', msg);
    g_connclient.Close();
});

g_connclient.on('MSG_LOGIN_DBCL', function (data) {
    let msg = MSG_LOGIN_DBCL.decode(data);
    if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
        console.error('登录失败：', msg.result);
        g_connclient.Close();
    } else {
        console.info('%s登录成功', msg.pi.account);
        g_player.SetPropList(msg.propList);
        g_player.SetPlayerInfo(msg.pi);
    }
    g_uiemitter.emit('UI_LOGIN_RESULT', msg);
});

g_connclient.on('MSG_KICK_LBCL', function (data) {
    let msg = MSG_KICK_LBCL.decode(data);
    g_uiemitter.emit('UI_KICK', msg);
    if (msg.timeSec !== 1024) g_connclient.Close();
});