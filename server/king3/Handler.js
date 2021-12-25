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
const MSG_KING3_LOGIN_CLKG = require('../../protocol/MSG_KING3_LOGIN_CLKG')['MSG_KING3_LOGIN_CLKG'];
const MSG_KING3_LOGIN_KGCL = require('../../protocol/MSG_KING3_LOGIN_KGCL')['MSG_KING3_LOGIN_KGCL'];
const MSG_KING3_LOGOUT_CLKG = require('../../protocol/MSG_KING3_LOGOUT_CLKG')['MSG_KING3_LOGOUT_CLKG'];
const MSG_KING3_GAMEINFO_KGCL = require('../../protocol/MSG_KING3_GAMEINFO_KGCL')['MSG_KING3_GAMEINFO_KGCL'];
const MSG_KING3_GAMESTATE_KGCL = require('../../protocol/MSG_KING3_GAMESTATE_KGCL')['MSG_KING3_GAMESTATE_KGCL'];
const MSG_KING3_PREPARE_CLKG = require('../../protocol/MSG_KING3_PREPARE_CLKG')['MSG_KING3_PREPARE_CLKG'];
const MSG_KING3_PREPARE_FAIL_KGCL = require('../../protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const MSG_KING3_PLAYOBJECT_CLKG = require('../../protocol/MSG_KING3_PLAYOBJECT_CLKG')['MSG_KING3_PLAYOBJECT_CLKG'];
const MSG_KING3_PLAYOBJECT_KGCL = require('../../protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];
const MSG_KING3_WITHHOLD_KGCL = require('../../protocol/MSG_KING3_WITHHOLD_KGCL')['MSG_KING3_WITHHOLD_KGCL'];
const MSG_KING3_SETTLEMENT_KGCL = require('../../protocol/MSG_KING3_SETTLEMENT_KGCL')['MSG_KING3_SETTLEMENT_KGCL'];
const MSG_KING3_ROOMLIST_CLKG = require('../../protocol/MSG_KING3_ROOMLIST_CLKG')['MSG_KING3_ROOMLIST_CLKG'];
const MSG_KING3_ROOMLIST_KGCL = require('../../protocol/MSG_KING3_ROOMLIST_KGCL')['MSG_KING3_ROOMLIST_KGCL'];

const handler = {
    Init: function () {
        g_cnclients.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_cnclients.on('MSG_LOGOUT_CLGM', OnLogoutMsg);
        g_cnclients.on('MSG_REGISTER_CNGM', OnRegisterMsg);
        g_cnclients.on('MSG_KING3_LOGIN_CLKG', OnKing3LoginMsg);
        g_cnclients.on('MSG_KING3_LOGOUT_CLKG', OnKing3LogoutMsg);
        g_cnclients.on('MSG_KING3_PREPARE_CLKG', OnKing3PrepareMsg);
        g_cnclients.on('MSG_KING3_PLAYOBJECT_CLKG', OnKing3PlayObjectMsg);
        g_cnclients.on('MSG_KING3_ROOMLIST_CLKG', OnKing3RoomListMsg);
    },

    Uninit: function () {
    },

    SendKing3LoginMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_LOGIN_KGCL');
        client.Send(MSG_KING3_LOGIN_KGCL.encode(msg).finish());
    },

    SendKing3GameInfoMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_GAMEINFO_KGCL');
        client.Send(MSG_KING3_GAMEINFO_KGCL.encode(msg).finish());
    },

    SendKing3GameStateMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_GAMESTATE_KGCL');
        client.Send(MSG_KING3_GAMESTATE_KGCL.encode(msg).finish());
    },

    SendKing3PrepareMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_PREPARE_FAIL_KGCL');
        client.Send(MSG_KING3_PREPARE_FAIL_KGCL.encode(msg).finish());
    },

    SendKing3PlayObjectMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_PLAYOBJECT_KGCL');
        client.Send(MSG_KING3_PLAYOBJECT_KGCL.encode(msg).finish());
    },

    SendKing3WithholdMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_WITHHOLD_KGCL');
        client.Send(MSG_KING3_WITHHOLD_KGCL.encode(msg).finish());
    },

    SendKing3SettlementMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_SETTLEMENT_KGCL');
        client.Send(MSG_KING3_SETTLEMENT_KGCL.encode(msg).finish());
    },

    SendKing3RoomListMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_ROOMLIST_KGCL');
        client.Send(MSG_KING3_ROOMLIST_KGCL.encode(msg).finish());
    },

    SendRefundMsg: function (msg) {
        msg.msgID = protocol.GetMsgId('MSG_REFUND_GMCL');
        g_cnclients.Send(MSG_REFUND_GMCL.encode(msg).finish());
    },
};

function OnWSCOpen(client) {
    client.Send(MSG_REGISTER_GMCN.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_GMCN'),
        id: config.king3.id, name: config.king3.name
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
    g_king3.Logout(msg);
}

function OnKing3LoginMsg(client, data) {
    let msg = MSG_KING3_LOGIN_CLKG.decode(data);
    g_king3.Login(msg);
}

function OnKing3LogoutMsg(client, data) {
    let msg = MSG_KING3_LOGOUT_CLKG.decode(data);
    g_king3.Logout(msg);
}

function OnKing3PrepareMsg(client, data) {
    let msg = MSG_KING3_PREPARE_CLKG.decode(data);
    g_king3.Prepare(msg);
}

function OnKing3PlayObjectMsg(client, data) {
    let msg = MSG_KING3_PLAYOBJECT_CLKG.decode(data);
    g_king3.PlayObject(msg);
}

function OnKing3RoomListMsg(client, data) {
    let msg = MSG_KING3_ROOMLIST_CLKG.decode(data);
    g_king3.ApplyRoomList(msg);
}

module.exports = handler;