// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const protocol = require('../../protocol/protocol');
const MSG_LOGOUT_CLGM = require('../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_REFUND_GMCL = require('../../protocol/MSG_REFUND_GMCL')['MSG_REFUND_GMCL'];
const MSG_REGISTER_GMCN = require('../../protocol/MSG_REGISTER_GMCN')['MSG_REGISTER_GMCN'];
const MSG_REGISTER_CNGM = require('../../protocol/MSG_REGISTER_CNGM')['MSG_REGISTER_CNGM'];
const MSG_POWER7_LOGIN_CLPW = require('../../protocol/MSG_POWER7_LOGIN_CLPW')['MSG_POWER7_LOGIN_CLPW'];
const MSG_POWER7_LOGIN_PWCL = require('../../protocol/MSG_POWER7_LOGIN_PWCL')['MSG_POWER7_LOGIN_PWCL'];
const MSG_POWER7_LOGOUT_CLPW = require('../../protocol/MSG_POWER7_LOGOUT_CLPW')['MSG_POWER7_LOGOUT_CLPW'];
const MSG_POWER7_GAMEINFO_PWCL = require('../../protocol/MSG_POWER7_GAMEINFO_PWCL')['MSG_POWER7_GAMEINFO_PWCL'];
const MSG_POWER7_GAMESTATE_PWCL = require('../../protocol/MSG_POWER7_GAMESTATE_PWCL')['MSG_POWER7_GAMESTATE_PWCL'];
const MSG_POWER7_PREPARE_CLPW = require('../../protocol/MSG_POWER7_PREPARE_CLPW')['MSG_POWER7_PREPARE_CLPW'];
const MSG_POWER7_PREPARE_FAIL_PWCL = require('../../protocol/MSG_POWER7_PREPARE_FAIL_PWCL')['MSG_POWER7_PREPARE_FAIL_PWCL'];
const MSG_POWER7_PLAYOBJECT_CLPW = require('../../protocol/MSG_POWER7_PLAYOBJECT_CLPW')['MSG_POWER7_PLAYOBJECT_CLPW'];
const MSG_POWER7_PLAYOBJECT_PWCL = require('../../protocol/MSG_POWER7_PLAYOBJECT_PWCL')['MSG_POWER7_PLAYOBJECT_PWCL'];
const MSG_POWER7_WITHHOLD_PWCL = require('../../protocol/MSG_POWER7_WITHHOLD_PWCL')['MSG_POWER7_WITHHOLD_PWCL'];
const MSG_POWER7_SETTLEMENT_PWCL = require('../../protocol/MSG_POWER7_SETTLEMENT_PWCL')['MSG_POWER7_SETTLEMENT_PWCL'];
const MSG_POWER7_ROOMLIST_CLPW = require('../../protocol/MSG_POWER7_ROOMLIST_CLPW')['MSG_POWER7_ROOMLIST_CLPW'];
const MSG_POWER7_ROOMLIST_PWCL = require('../../protocol/MSG_POWER7_ROOMLIST_PWCL')['MSG_POWER7_ROOMLIST_PWCL'];

const handler = {
    Init: function () {
        g_cnclients.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_cnclients.on('MSG_LOGOUT_CLGM', OnLogoutMsg);
        g_cnclients.on('MSG_REGISTER_CNGM', OnRegisterMsg);
        g_cnclients.on('MSG_POWER7_LOGIN_CLPW', OnPower7LoginMsg);
        g_cnclients.on('MSG_POWER7_LOGOUT_CLPW', OnPower7LogoutMsg);
        g_cnclients.on('MSG_POWER7_PREPARE_CLPW', OnPower7PrepareMsg);
        g_cnclients.on('MSG_POWER7_PLAYOBJECT_CLPW', OnPower7PlayObjectMsg);
        g_cnclients.on('MSG_POWER7_ROOMLIST_CLPW', OnPower7RoomListMsg);
    },

    Uninit: function () {
    },

    SendPower7LoginMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_LOGIN_PWCL');
        client.Send(MSG_POWER7_LOGIN_PWCL.encode(msg).finish());
    },

    SendPower7GameInfoMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_GAMEINFO_PWCL');
        client.Send(MSG_POWER7_GAMEINFO_PWCL.encode(msg).finish());
    },

    SendPower7GameStateMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_GAMESTATE_PWCL');
        client.Send(MSG_POWER7_GAMESTATE_PWCL.encode(msg).finish());
    },

    SendPower7PrepareMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_PREPARE_FAIL_PWCL');
        client.Send(MSG_POWER7_PREPARE_FAIL_PWCL.encode(msg).finish());
    },

    SendPower7PlayObjectMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_PLAYOBJECT_PWCL');
        client.Send(MSG_POWER7_PLAYOBJECT_PWCL.encode(msg).finish());
    },

    SendPower7WithholdMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_WITHHOLD_PWCL');
        client.Send(MSG_POWER7_WITHHOLD_PWCL.encode(msg).finish());
    },

    SendPower7SettlementMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_SETTLEMENT_PWCL');
        client.Send(MSG_POWER7_SETTLEMENT_PWCL.encode(msg).finish());
    },

    SendPower7RoomListMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_ROOMLIST_PWCL');
        client.Send(MSG_POWER7_ROOMLIST_PWCL.encode(msg).finish());
    },

    SendRefundMsg: function (msg) {
        msg.msgID = protocol.GetMsgId('MSG_REFUND_GMCL');
        g_cnclients.Send(MSG_REFUND_GMCL.encode(msg).finish());
    },
};

function OnWSCOpen(client) {
    client.Send(MSG_REGISTER_GMCN.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_GMCN'),
        id: config.power7.id, name: config.power7.name
    }).finish());
}

function OnRegisterMsg(client, data) {
    let msg = MSG_REGISTER_CNGM.decode(data);
    let strID = String(msg.connID);
    if (msg.success) {
        g_log.Info(strID + '号链接服务器注册成功');
    } else {
        throw new Error(strID + '号链接服务器注册失败');
    }
}

function OnLogoutMsg(client, data) {
    let msg = MSG_LOGOUT_CLGM.decode(data);
    g_power7.Logout(msg);
}

function OnPower7LoginMsg(client, data) {
    let msg = MSG_POWER7_LOGIN_CLPW.decode(data);
    g_power7.Login(msg);
}

function OnPower7LogoutMsg(client, data) {
    let msg = MSG_POWER7_LOGOUT_CLPW.decode(data);
    g_power7.Logout(msg);
}

function OnPower7PrepareMsg(client, data) {
    let msg = MSG_POWER7_PREPARE_CLPW.decode(data);
    g_power7.Prepare(msg);
}

function OnPower7PlayObjectMsg(client, data) {
    let msg = MSG_POWER7_PLAYOBJECT_CLPW.decode(data);
    g_power7.PlayObject(msg);
}

function OnPower7RoomListMsg(client, data) {
    let msg = MSG_POWER7_ROOMLIST_CLPW.decode(data);
    g_power7.ApplyRoomList(msg);
}

module.exports = handler;