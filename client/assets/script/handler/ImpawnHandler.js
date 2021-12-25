"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const MSG_IMPAWN_LOGIN_CLIM = require('../protocol/MSG_IMPAWN_LOGIN_CLIM')['MSG_IMPAWN_LOGIN_CLIM'];
const MSG_IMPAWN_LOGIN_CNCL = require('../protocol/MSG_IMPAWN_LOGIN_CNCL')['MSG_IMPAWN_LOGIN_CNCL'];
const MSG_IMPAWN_LOGOUT_CLCN = require('../protocol/MSG_IMPAWN_LOGOUT_CLCN')['MSG_IMPAWN_LOGOUT_CLCN'];
const MSG_IMPAWN_BET_CLIM = require('../protocol/MSG_IMPAWN_BET_CLIM')['MSG_IMPAWN_BET_CLIM'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('../protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];
const MSG_IMPAWN_NEW_BET_IMCL = require('../protocol/MSG_IMPAWN_NEW_BET_IMCL')['MSG_IMPAWN_NEW_BET_IMCL'];
const MSG_IMPAWN_GAMEINFO_IMCL = require('../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];
const MSG_IMPAWN_SETTLEMENT_IMCL = require('../protocol/MSG_IMPAWN_SETTLEMENT_IMCL')['MSG_IMPAWN_SETTLEMENT_IMCL'];

g_handler.SendImpawnLoginMsg = function (client) {
    client.Send(MSG_IMPAWN_LOGIN_CLIM.encode({
        msgID: protocol.GetMsgId('MSG_IMPAWN_LOGIN_CLIM')
    }).finish());
}

g_handler.SendImpawnLogoutMsg = function (client) {
    client.Send(MSG_IMPAWN_LOGOUT_CLCN.encode({
        msgID: protocol.GetMsgId('MSG_IMPAWN_LOGOUT_CLCN')
    }).finish());
}

g_handler.SendImpawnBetMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_IMPAWN_BET_CLIM');
    client.Send(MSG_IMPAWN_BET_CLIM.encode(msg).finish());
}

g_connclient.on('MSG_IMPAWN_LOGIN_CNCL', function (data) {
    let msg = MSG_IMPAWN_LOGIN_CNCL.decode(data);
    if (msg.result !== MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS) {
        console.error('进入楚汉相争失败：', msg.result);
    } else {
        console.debug('进入楚汉相争成功');
    }
    g_uiemitter.emit('UI_IMPAWN_LOGIN', msg);
});

g_connclient.on('MSG_IMPAWN_BET_FAIL_IMCL', function (data) {
    let msg = MSG_IMPAWN_BET_FAIL_IMCL.decode(data);
    console.error('楚汉相争投放粮饷失败：', msg.reason);
    g_player.SetProp(common.PropID.COIN, msg.coinSum);
    g_player.SetProp(common.PropID.SUBCOIN, msg.subcoinSum);
    g_uiemitter.emit('UI_IMPAWN_BET_FAIL', msg);
});

g_connclient.on('MSG_IMPAWN_NEW_BET_IMCL', function (data) {
    let msg = MSG_IMPAWN_NEW_BET_IMCL.decode(data);
    let gameState = g_impawn.GetGameState();
    if (gameState.round != msg.round) {
        console.error('楚汉相争新投放粮饷轮次错误：%s != %s',
            gameState.round, msg.round);
        return;
    }
    g_impawn.AddNewBet(msg);
    g_uiemitter.emit('UI_IMPAWN_NEW_BET', msg);
});

g_connclient.on('MSG_IMPAWN_GAMEINFO_IMCL', function (data) {
    let msg = MSG_IMPAWN_GAMEINFO_IMCL.decode(data);
    g_impawn.SetGameInfo(msg);
    g_uiemitter.emit('UI_IMPAWN_GAMEINFO', msg);
});

g_connclient.on('MSG_IMPAWN_GAMESTATE_IMCL', function (data) {
    let msg = MSG_IMPAWN_GAMESTATE_IMCL.decode(data);
    g_impawn.SetGameState(msg);
    g_uiemitter.emit('UI_IMPAWN_GAMESTATE', msg);
});

g_connclient.on('MSG_IMPAWN_SETTLEMENT_IMCL', function (data) {
    let msg = MSG_IMPAWN_SETTLEMENT_IMCL.decode(data);
    if (msg.gainCoin > 0) {
        g_player.SetProp(common.PropID.COIN, msg.gainCoin);
    } else if (-msg.gainCoin === msg.coinSum + msg.subcoinSum) {
        g_player.SetProp(common.PropID.COIN, msg.coinSum);
        g_player.SetProp(common.PropID.SUBCOIN, msg.subcoinSum);
    }
    g_uiemitter.emit('UI_IMPAWN_SETTLEMENT', msg);
});