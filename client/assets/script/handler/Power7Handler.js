"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const constant = require('../protocol/Constant');
const MSG_POWER7_LOGIN_CLPW = require('../protocol/MSG_POWER7_LOGIN_CLPW')['MSG_POWER7_LOGIN_CLPW'];
const MSG_POWER7_LOGIN_PWCL = require('../protocol/MSG_POWER7_LOGIN_PWCL')['MSG_POWER7_LOGIN_PWCL'];
const MSG_POWER7_LOGOUT_CLPW = require('../protocol/MSG_POWER7_LOGOUT_CLPW')['MSG_POWER7_LOGOUT_CLPW'];
const MSG_POWER7_GAMEINFO_PWCL = require('../protocol/MSG_POWER7_GAMEINFO_PWCL')['MSG_POWER7_GAMEINFO_PWCL'];
const MSG_POWER7_GAMESTATE_PWCL = require('../protocol/MSG_POWER7_GAMESTATE_PWCL')['MSG_POWER7_GAMESTATE_PWCL'];
const MSG_POWER7_PREPARE_CLPW = require('../protocol/MSG_POWER7_PREPARE_CLPW')['MSG_POWER7_PREPARE_CLPW'];
const MSG_POWER7_PREPARE_FAIL_PWCL = require('../protocol/MSG_POWER7_PREPARE_FAIL_PWCL')['MSG_POWER7_PREPARE_FAIL_PWCL'];
const MSG_POWER7_PLAYOBJECT_CLPW = require('../protocol/MSG_POWER7_PLAYOBJECT_CLPW')['MSG_POWER7_PLAYOBJECT_CLPW'];
const MSG_POWER7_PLAYOBJECT_PWCL = require('../protocol/MSG_POWER7_PLAYOBJECT_PWCL')['MSG_POWER7_PLAYOBJECT_PWCL'];
const MSG_POWER7_WITHHOLD_PWCL = require('../protocol/MSG_POWER7_WITHHOLD_PWCL')['MSG_POWER7_WITHHOLD_PWCL'];
const MSG_POWER7_SETTLEMENT_PWCL = require('../protocol/MSG_POWER7_SETTLEMENT_PWCL')['MSG_POWER7_SETTLEMENT_PWCL'];
const MSG_POWER7_ROOMLIST_CLPW = require('../protocol/MSG_POWER7_ROOMLIST_CLPW')['MSG_POWER7_ROOMLIST_CLPW'];
const MSG_POWER7_ROOMLIST_PWCL = require('../protocol/MSG_POWER7_ROOMLIST_PWCL')['MSG_POWER7_ROOMLIST_PWCL'];

g_handler.SendPower7LoginMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_POWER7_LOGIN_CLPW');
    client.Send(MSG_POWER7_LOGIN_CLPW.encode(msg).finish());
}

g_handler.SendPower7LogoutMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_POWER7_LOGOUT_CLPW');
    client.Send(MSG_POWER7_LOGOUT_CLPW.encode(msg).finish());
}

g_handler.SendPower7PrepareMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_POWER7_PREPARE_CLPW');
    client.Send(MSG_POWER7_PREPARE_CLPW.encode(msg).finish());
}

g_handler.SendPower7PlayObjectMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_POWER7_PLAYOBJECT_CLPW');
    client.Send(MSG_POWER7_PLAYOBJECT_CLPW.encode(msg).finish());
}

g_handler.SendPower7RoomListMsg = function (client) {
    client.Send(MSG_POWER7_ROOMLIST_CLPW.encode({
        msgID: protocol.GetMsgId('MSG_POWER7_ROOMLIST_CLPW')
    }).finish());
}

g_connclient.on('MSG_POWER7_LOGIN_PWCL', function (data) {
    let msg = MSG_POWER7_LOGIN_PWCL.decode(data);
    if (msg.result !== MSG_POWER7_LOGIN_PWCL.Result.SUCCESS) {
        console.error('进入七雄争霸失败：', msg.result);
        if (msg.cost > 0) g_player.SetProp(common.PropID.COIN, msg.cost);
    }
    g_uiemitter.emit('UI_POWER7_LOGIN', msg);
});

g_connclient.on('MSG_POWER7_GAMEINFO_PWCL', function (data) {
    let msg = MSG_POWER7_GAMEINFO_PWCL.decode(data);
    if (g_power7.GetRID() && g_power7.GetRID() !== msg.rid) {
        console.error('同时进入了两个七雄争霸房间');
        return;
    }
    g_power7.SetGameInfo(msg);
    g_uiemitter.emit('UI_POWER7_GAMEINFO', msg);
});

g_connclient.on('MSG_POWER7_GAMESTATE_PWCL', function (data) {
    let msg = MSG_POWER7_GAMESTATE_PWCL.decode(data);
    if (g_power7.GetRID() && g_power7.GetRID() !== msg.rid) {
        console.error('同时进入了两个七雄争霸房间');
        return;
    }
    g_power7.SetGameState(msg);
    g_uiemitter.emit('UI_POWER7_GAMESTATE', msg);
});

g_connclient.on('MSG_POWER7_PREPARE_FAIL_PWCL', function (data) {
    let msg = MSG_POWER7_PREPARE_FAIL_PWCL.decode(data);
    console.error('七雄争霸准备失败：', msg.reason);
    msg.pid = g_player.GetPID();
    g_power7.RemovePlayer(msg);
    g_uiemitter.emit('UI_POWER7_PREPARE_FAIL', msg);
});

g_connclient.on('MSG_POWER7_PLAYOBJECT_PWCL', function (data) {
    let msg = MSG_POWER7_PLAYOBJECT_PWCL.decode(data);
    if (msg.result !== MSG_POWER7_PLAYOBJECT_PWCL.Result.SUCCESS) {
        console.error('七雄争霸出战失败：', msg.result);
        g_player.SetProp(common.PropID.COIN, msg.betCoin);
    } else {
        msg.pid = g_player.GetPID();
        g_power7.AddBetCoin(msg);
    }
    g_uiemitter.emit('UI_POWER7_PLAYOBJECT', msg);
});

g_connclient.on('MSG_POWER7_WITHHOLD_PWCL', function (data) {
    let msg = MSG_POWER7_WITHHOLD_PWCL.decode(data);
    msg.success = g_player.SetProp(common.PropID.COIN, -msg.coin);
    if (!msg.success) console.error('七雄争霸预扣失败');
    g_uiemitter.emit('UI_POWER7_WITHHOLD', msg);
});

g_connclient.on('MSG_POWER7_SETTLEMENT_PWCL', function (data) {
    let msg = MSG_POWER7_SETTLEMENT_PWCL.decode(data);
    if (msg.gainCoin > 0) {
        let gainCoin = msg.gainCoin;
        if (!msg.gameOver) gainCoin -= constant.POWER7_MIN_BETCOIN;
        g_player.SetProp(common.PropID.COIN, gainCoin);
    }
    g_uiemitter.emit('UI_POWER7_SETTLEMENT', msg);
});

g_connclient.on('MSG_POWER7_ROOMLIST_PWCL', function (data) {
    let msg = MSG_POWER7_ROOMLIST_PWCL.decode(data);
    for (let i = 0, len = msg.roomList.length; i < len; ++i) {
        g_power7.UpdateRoom(msg.roomList[i]);
    }
    g_uiemitter.emit('UI_POWER7_ROOMLIST', msg);
});