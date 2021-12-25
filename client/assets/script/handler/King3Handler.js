"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const MSG_KING3_LOGIN_CLKG = require('../protocol/MSG_KING3_LOGIN_CLKG')['MSG_KING3_LOGIN_CLKG'];
const MSG_KING3_LOGIN_KGCL = require('../protocol/MSG_KING3_LOGIN_KGCL')['MSG_KING3_LOGIN_KGCL'];
const MSG_KING3_LOGOUT_CLKG = require('../protocol/MSG_KING3_LOGOUT_CLKG')['MSG_KING3_LOGOUT_CLKG'];
const MSG_KING3_GAMEINFO_KGCL = require('../protocol/MSG_KING3_GAMEINFO_KGCL')['MSG_KING3_GAMEINFO_KGCL'];
const MSG_KING3_GAMESTATE_KGCL = require('../protocol/MSG_KING3_GAMESTATE_KGCL')['MSG_KING3_GAMESTATE_KGCL'];
const MSG_KING3_PREPARE_CLKG = require('../protocol/MSG_KING3_PREPARE_CLKG')['MSG_KING3_PREPARE_CLKG'];
const MSG_KING3_PREPARE_FAIL_KGCL = require('../protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const MSG_KING3_PLAYOBJECT_CLKG = require('../protocol/MSG_KING3_PLAYOBJECT_CLKG')['MSG_KING3_PLAYOBJECT_CLKG'];
const MSG_KING3_PLAYOBJECT_KGCL = require('../protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];
const MSG_KING3_WITHHOLD_KGCL = require('../protocol/MSG_KING3_WITHHOLD_KGCL')['MSG_KING3_WITHHOLD_KGCL'];
const MSG_KING3_SETTLEMENT_KGCL = require('../protocol/MSG_KING3_SETTLEMENT_KGCL')['MSG_KING3_SETTLEMENT_KGCL'];
const MSG_KING3_ROOMLIST_CLKG = require('../protocol/MSG_KING3_ROOMLIST_CLKG')['MSG_KING3_ROOMLIST_CLKG'];
const MSG_KING3_ROOMLIST_KGCL = require('../protocol/MSG_KING3_ROOMLIST_KGCL')['MSG_KING3_ROOMLIST_KGCL'];

g_handler.SendKing3LoginMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_KING3_LOGIN_CLKG');
    client.Send(MSG_KING3_LOGIN_CLKG.encode(msg).finish());
}

g_handler.SendKing3LogoutMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_KING3_LOGOUT_CLKG');
    client.Send(MSG_KING3_LOGOUT_CLKG.encode(msg).finish());
}

g_handler.SendKing3PrepareMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_KING3_PREPARE_CLKG');
    client.Send(MSG_KING3_PREPARE_CLKG.encode(msg).finish());
}

g_handler.SendKing3PlayObjectMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_KING3_PLAYOBJECT_CLKG');
    client.Send(MSG_KING3_PLAYOBJECT_CLKG.encode(msg).finish());
}

g_handler.SendKing3RoomListMsg = function (client) {
    client.Send(MSG_KING3_ROOMLIST_CLKG.encode({
        msgID: protocol.GetMsgId('MSG_KING3_ROOMLIST_CLKG')
    }).finish());
}

g_connclient.on('MSG_KING3_LOGIN_KGCL', function (data) {
    let msg = MSG_KING3_LOGIN_KGCL.decode(data);
    if (msg.result !== MSG_KING3_LOGIN_KGCL.Result.SUCCESS) {
        console.error('进入三国鼎立失败：', msg.result);
        if (msg.cost > 0) g_player.SetProp(common.PropID.COIN, msg.cost);
    }
    g_uiemitter.emit('UI_KING3_LOGIN', msg);
});

g_connclient.on('MSG_KING3_GAMEINFO_KGCL', function (data) {
    let msg = MSG_KING3_GAMEINFO_KGCL.decode(data);
    if (g_king3.GetRID() && g_king3.GetRID() !== msg.rid) {
        console.error('同时进入了两个三国鼎立房间');
        return;
    }
    g_king3.SetGameInfo(msg);
    g_uiemitter.emit('UI_KING3_GAMEINFO', msg);
});

g_connclient.on('MSG_KING3_GAMESTATE_KGCL', function (data) {
    let msg = MSG_KING3_GAMESTATE_KGCL.decode(data);
    if (g_king3.GetRID() && g_king3.GetRID() !== msg.rid) {
        console.error('同时进入了两个三国鼎立房间');
        return;
    }
    g_king3.SetGameState(msg);
    g_uiemitter.emit('UI_KING3_GAMESTATE', msg);
});

g_connclient.on('MSG_KING3_PREPARE_FAIL_KGCL', function (data) {
    let msg = MSG_KING3_PREPARE_FAIL_KGCL.decode(data);
    console.error('三国鼎立准备失败：', msg.reason);
    msg.pid = g_player.GetPID();
    g_king3.RemovePlayer(msg);
    g_uiemitter.emit('UI_KING3_PREPARE_FAIL', msg);
});

g_connclient.on('MSG_KING3_PLAYOBJECT_KGCL', function (data) {
    let msg = MSG_KING3_PLAYOBJECT_KGCL.decode(data);
    if (msg.result !== MSG_KING3_PLAYOBJECT_KGCL.Result.SUCCESS) {
        console.error('三国鼎立出战失败：', msg.result);
        msg.pid = g_player.GetPID();
        g_king3.RemoveObject(msg);
    }
    g_uiemitter.emit('UI_KING3_PLAYOBJECT', msg);
});

g_connclient.on('MSG_KING3_WITHHOLD_KGCL', function (data) {
    let msg = MSG_KING3_WITHHOLD_KGCL.decode(data);
    msg.success = g_player.SetProp(common.PropID.COIN, -msg.coin);
    if (!msg.success) console.error('三国鼎立预扣失败');
    g_uiemitter.emit('UI_KING3_WITHHOLD', msg);
});

g_connclient.on('MSG_KING3_SETTLEMENT_KGCL', function (data) {
    let msg = MSG_KING3_SETTLEMENT_KGCL.decode(data);
    if (msg.gainCoin > 0) {
        g_player.SetProp(common.PropID.COIN, msg.gainCoin);
    }
    g_uiemitter.emit('UI_KING3_SETTLEMENT', msg);
});

g_connclient.on('MSG_KING3_ROOMLIST_KGCL', function (data) {
    let msg = MSG_KING3_ROOMLIST_KGCL.decode(data);
    for (let i = 0, len = msg.roomList.length; i < len; ++i) {
        g_king3.UpdateRoom(msg.roomList[i]);
    }
    g_uiemitter.emit('UI_KING3_ROOMLIST', msg);
});