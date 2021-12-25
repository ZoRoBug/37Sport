// --------------------------------------------------------
// 七雄争霸相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_LOGOUT_CLGM = require('../../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_POWER7_LOGIN_CLPW = require('../../../protocol/MSG_POWER7_LOGIN_CLPW')['MSG_POWER7_LOGIN_CLPW'];
const MSG_POWER7_LOGIN_PWCL = require('../../../protocol/MSG_POWER7_LOGIN_PWCL')['MSG_POWER7_LOGIN_PWCL'];
const MSG_POWER7_LOGOUT_CLPW = require('../../../protocol/MSG_POWER7_LOGOUT_CLPW')['MSG_POWER7_LOGOUT_CLPW'];
const MSG_POWER7_GAMEINFO_PWCL = require('../../../protocol/MSG_POWER7_GAMEINFO_PWCL')['MSG_POWER7_GAMEINFO_PWCL'];
const MSG_POWER7_GAMESTATE_PWCL = require('../../../protocol/MSG_POWER7_GAMESTATE_PWCL')['MSG_POWER7_GAMESTATE_PWCL'];
const MSG_POWER7_PREPARE_CLPW = require('../../../protocol/MSG_POWER7_PREPARE_CLPW')['MSG_POWER7_PREPARE_CLPW'];
const MSG_POWER7_PREPARE_FAIL_PWCL = require('../../../protocol/MSG_POWER7_PREPARE_FAIL_PWCL')['MSG_POWER7_PREPARE_FAIL_PWCL'];
const MSG_POWER7_PLAYOBJECT_CLPW = require('../../../protocol/MSG_POWER7_PLAYOBJECT_CLPW')['MSG_POWER7_PLAYOBJECT_CLPW'];
const MSG_POWER7_PLAYOBJECT_PWCL = require('../../../protocol/MSG_POWER7_PLAYOBJECT_PWCL')['MSG_POWER7_PLAYOBJECT_PWCL'];
const MSG_POWER7_WITHHOLD_PWCL = require('../../../protocol/MSG_POWER7_WITHHOLD_PWCL')['MSG_POWER7_WITHHOLD_PWCL'];
const MSG_POWER7_SETTLEMENT_PWCL = require('../../../protocol/MSG_POWER7_SETTLEMENT_PWCL')['MSG_POWER7_SETTLEMENT_PWCL'];
const MSG_POWER7_ROOMLIST_CLPW = require('../../../protocol/MSG_POWER7_ROOMLIST_CLPW')['MSG_POWER7_ROOMLIST_CLPW'];
const MSG_POWER7_ROOMLIST_PWCL = require('../../../protocol/MSG_POWER7_ROOMLIST_PWCL')['MSG_POWER7_ROOMLIST_PWCL'];

const playerLogoutList = []; // 玩家发送不成功的退出消息缓存，避免七雄与链接服务器断开的情况

g_handler.SendLogoutMsgToPower7 = function (pid) {
    let gameClient = g_connserver.GetGame(common.Location.POWER7);
    if (gameClient) {
        gameClient.Send(MSG_LOGOUT_CLGM.encode({
            msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'), pid: pid
        }).finish());
    } else {
        playerLogoutList.push({ pid: pid });
    }
}

g_connserver.on('GAME_CONNECTED', function (type) {
    if (type !== common.Location.POWER7) return;
    let gameClient = g_connserver.GetGame(common.Location.POWER7);
    if (!gameClient || playerLogoutList.length === 0) return;

    for (let i = 0; i < playerLogoutList.length; ++i) {
        let msgLogout = playerLogoutList[i];
        if (msgLogout.rid) {
            gameClient.Send(MSG_POWER7_LOGOUT_CLPW.encode({
                msgID: protocol.GetMsgId('MSG_POWER7_LOGOUT_CLPW'),
                pid: msgLogout.pid, rid: msgLogout.rid
            }).finish());
        } else {
            gameClient.Send(MSG_LOGOUT_CLGM.encode({
                msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'),
                pid: msgLogout.pid
            }).finish());
        }
    }

    g_log.Info('向七雄发送%s条未成功退出消息', playerLogoutList.length);
    playerLogoutList.splice(0, playerLogoutList.length);
});

g_connserver.on('MSG_POWER7_LOGIN_CLPW', function (client, data) {
    let msg = null;
    try {
        msg = MSG_POWER7_LOGIN_CLPW.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.POWER7);
    if (!playerInfo) msg.result = MSG_POWER7_LOGIN_PWCL.Result.NO_CLIENT_INFO;
    if (!gameClient) msg.result = MSG_POWER7_LOGIN_PWCL.Result.OFFLINE;

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_LOGIN_PWCL');
        client.Send(MSG_POWER7_LOGIN_PWCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_POWER7_LOGIN_CLPW.encode(msg).finish());
    }
});

g_connserver.on('MSG_POWER7_LOGOUT_CLPW', function (client, data) {
    let msg = null;
    try {
        msg = MSG_POWER7_LOGOUT_CLPW.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.POWER7);

    if (playerInfo && gameClient) {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_POWER7_LOGOUT_CLPW.encode(msg).finish());
    } else if (playerInfo) {
        playerLogoutList.push({ pid: playerInfo.pid, rid: msg.rid });
    }
});

g_connserver.on('MSG_POWER7_PREPARE_CLPW', function (client, data) {
    let msg = null;
    try {
        msg = MSG_POWER7_PREPARE_CLPW.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.POWER7);
    if (!playerInfo) msg.reason = MSG_POWER7_PREPARE_FAIL_PWCL.Reason.NO_CLIENT_INFO;
    if (!gameClient) msg.reason = MSG_POWER7_PREPARE_FAIL_PWCL.Reason.OFFLINE;

    if (msg.reason) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_PREPARE_FAIL_PWCL');
        client.Send(MSG_POWER7_PREPARE_FAIL_PWCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_POWER7_PREPARE_CLPW.encode(msg).finish());
    }
});

g_connserver.on('MSG_POWER7_PLAYOBJECT_CLPW', function (client, data) {
    let msg = null;
    try {
        msg = MSG_POWER7_PLAYOBJECT_CLPW.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.POWER7);
    if (!playerInfo) msg.result = MSG_POWER7_PLAYOBJECT_PWCL.Result.NO_CLIENT_INFO;
    if (!gameClient) msg.result = MSG_POWER7_PLAYOBJECT_PWCL.Result.OFFLINE;

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_POWER7_PLAYOBJECT_PWCL');
        client.Send(MSG_POWER7_PLAYOBJECT_PWCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_POWER7_PLAYOBJECT_CLPW.encode(msg).finish());
    }
});

g_connserver.on('MSG_POWER7_ROOMLIST_CLPW', function (client, data) {
    let msg = null;
    try {
        msg = MSG_POWER7_ROOMLIST_CLPW.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.POWER7);

    if (playerInfo && gameClient) {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_POWER7_ROOMLIST_CLPW.encode(msg).finish());
    }
});

g_connserver.on('MSG_POWER7_LOGIN_PWCL', function (client, data) {
    let msg = MSG_POWER7_LOGIN_PWCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_POWER7_PREPARE_FAIL_PWCL', function (client, data) {
    let msg = MSG_POWER7_PREPARE_FAIL_PWCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_POWER7_PLAYOBJECT_PWCL', function (client, data) {
    let msg = MSG_POWER7_PLAYOBJECT_PWCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_POWER7_WITHHOLD_PWCL', function (client, data) {
    let msg = MSG_POWER7_WITHHOLD_PWCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_POWER7_SETTLEMENT_PWCL', function (client, data) {
    let msg = MSG_POWER7_SETTLEMENT_PWCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_POWER7_GAMEINFO_PWCL', function (client, data) {
    let msg = MSG_POWER7_GAMEINFO_PWCL.decode(data);
    let pidList = msg.pidList;

    msg.pidList = [];
    let msgData = MSG_POWER7_GAMEINFO_PWCL.encode(msg).finish();

    let playerClient = null;
    for (let i = 0, len = pidList.length; i < len; ++i) {
        playerClient = g_connserver.GetPlayer(pidList[i]);
        if (playerClient) playerClient.Send(msgData);
    }
});

g_connserver.on('MSG_POWER7_GAMESTATE_PWCL', function (client, data) {
    let msg = MSG_POWER7_GAMESTATE_PWCL.decode(data);
    let pidList = msg.pidList;

    msg.pidList = [];
    let msgData = MSG_POWER7_GAMESTATE_PWCL.encode(msg).finish();

    let playerClient = null;
    for (let i = 0, len = pidList.length; i < len; ++i) {
        playerClient = g_connserver.GetPlayer(pidList[i]);
        if (playerClient) playerClient.Send(msgData);
    }
});

g_connserver.on('MSG_POWER7_ROOMLIST_PWCL', function (client, data) {
    let msg = MSG_POWER7_ROOMLIST_PWCL.decode(data);
    if (msg.pid > 0) {
        let playerClient = g_connserver.GetPlayer(msg.pid);
        if (playerClient) playerClient.Send(data);
    } else {
        g_connserver.Broadcast(data);
    }
});