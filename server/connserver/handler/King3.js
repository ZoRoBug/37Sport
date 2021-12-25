// --------------------------------------------------------
// 三国鼎立相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const common = require('../../../protocol/Common');
const protocol = require('../../../protocol/protocol');
const MSG_LOGOUT_CLGM = require('../../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KING3_LOGIN_CLKG = require('../../../protocol/MSG_KING3_LOGIN_CLKG')['MSG_KING3_LOGIN_CLKG'];
const MSG_KING3_LOGIN_KGCL = require('../../../protocol/MSG_KING3_LOGIN_KGCL')['MSG_KING3_LOGIN_KGCL'];
const MSG_KING3_LOGOUT_CLKG = require('../../../protocol/MSG_KING3_LOGOUT_CLKG')['MSG_KING3_LOGOUT_CLKG'];
const MSG_KING3_GAMEINFO_KGCL = require('../../../protocol/MSG_KING3_GAMEINFO_KGCL')['MSG_KING3_GAMEINFO_KGCL'];
const MSG_KING3_GAMESTATE_KGCL = require('../../../protocol/MSG_KING3_GAMESTATE_KGCL')['MSG_KING3_GAMESTATE_KGCL'];
const MSG_KING3_PREPARE_CLKG = require('../../../protocol/MSG_KING3_PREPARE_CLKG')['MSG_KING3_PREPARE_CLKG'];
const MSG_KING3_PREPARE_FAIL_KGCL = require('../../../protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const MSG_KING3_PLAYOBJECT_CLKG = require('../../../protocol/MSG_KING3_PLAYOBJECT_CLKG')['MSG_KING3_PLAYOBJECT_CLKG'];
const MSG_KING3_PLAYOBJECT_KGCL = require('../../../protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];
const MSG_KING3_WITHHOLD_KGCL = require('../../../protocol/MSG_KING3_WITHHOLD_KGCL')['MSG_KING3_WITHHOLD_KGCL'];
const MSG_KING3_SETTLEMENT_KGCL = require('../../../protocol/MSG_KING3_SETTLEMENT_KGCL')['MSG_KING3_SETTLEMENT_KGCL'];
const MSG_KING3_ROOMLIST_CLKG = require('../../../protocol/MSG_KING3_ROOMLIST_CLKG')['MSG_KING3_ROOMLIST_CLKG'];
const MSG_KING3_ROOMLIST_KGCL = require('../../../protocol/MSG_KING3_ROOMLIST_KGCL')['MSG_KING3_ROOMLIST_KGCL'];

const playerLogoutList = []; // 玩家发送不成功的退出消息缓存，避免三国与链接服务器断开的情况

g_handler.SendLogoutMsgToKing3 = function (pid) {
    let gameClient = g_connserver.GetGame(common.Location.KING3);
    if (gameClient) {
        gameClient.Send(MSG_LOGOUT_CLGM.encode({
            msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'), pid: pid
        }).finish());
    } else {
        playerLogoutList.push({ pid: pid });
    }
}

g_connserver.on('GAME_CONNECTED', function (type) {
    if (type !== common.Location.KING3) return;
    let gameClient = g_connserver.GetGame(common.Location.KING3);
    if (!gameClient || playerLogoutList.length === 0) return;

    for (let i = 0; i < playerLogoutList.length; ++i) {
        let msgLogout = playerLogoutList[i];
        if (msgLogout.rid) {
            gameClient.Send(MSG_KING3_LOGOUT_CLKG.encode({
                msgID: protocol.GetMsgId('MSG_KING3_LOGOUT_CLKG'),
                pid: msgLogout.pid, rid: msgLogout.rid
            }).finish());
        } else {
            gameClient.Send(MSG_LOGOUT_CLGM.encode({
                msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'),
                pid: msgLogout.pid
            }).finish());
        }
    }

    g_log.Info('向三国发送%s条未成功退出消息', playerLogoutList.length);
    playerLogoutList.splice(0, playerLogoutList.length);
});

g_connserver.on('MSG_KING3_LOGIN_CLKG', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KING3_LOGIN_CLKG.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.KING3);
    if (!playerInfo) msg.result = MSG_KING3_LOGIN_KGCL.Result.NO_CLIENT_INFO;
    if (!gameClient) msg.result = MSG_KING3_LOGIN_KGCL.Result.OFFLINE;

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_LOGIN_KGCL');
        client.Send(MSG_KING3_LOGIN_KGCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_KING3_LOGIN_CLKG.encode(msg).finish());
    }
});

g_connserver.on('MSG_KING3_LOGOUT_CLKG', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KING3_LOGOUT_CLKG.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.KING3);

    if (playerInfo && gameClient) {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_KING3_LOGOUT_CLKG.encode(msg).finish());
    } else if (playerInfo) {
        playerLogoutList.push({ pid: playerInfo.pid, rid: msg.rid });
    }
});

g_connserver.on('MSG_KING3_PREPARE_CLKG', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KING3_PREPARE_CLKG.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.KING3);
    if (!playerInfo) msg.reason = MSG_KING3_PREPARE_FAIL_KGCL.Reason.NO_CLIENT_INFO;
    if (!gameClient) msg.reason = MSG_KING3_PREPARE_FAIL_KGCL.Reason.OFFLINE;

    if (msg.reason) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_PREPARE_FAIL_KGCL');
        client.Send(MSG_KING3_PREPARE_FAIL_KGCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_KING3_PREPARE_CLKG.encode(msg).finish());
    }
});

g_connserver.on('MSG_KING3_PLAYOBJECT_CLKG', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KING3_PLAYOBJECT_CLKG.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.KING3);
    if (!playerInfo) msg.result = MSG_KING3_PLAYOBJECT_KGCL.Result.NO_CLIENT_INFO;
    if (!gameClient) msg.result = MSG_KING3_PLAYOBJECT_KGCL.Result.OFFLINE;

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_KING3_PLAYOBJECT_KGCL');
        client.Send(MSG_KING3_PLAYOBJECT_KGCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_KING3_PLAYOBJECT_CLKG.encode(msg).finish());
    }
});

g_connserver.on('MSG_KING3_ROOMLIST_CLKG', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KING3_ROOMLIST_CLKG.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.KING3);

    if (playerInfo && gameClient) {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_KING3_ROOMLIST_CLKG.encode(msg).finish());
    }
});

g_connserver.on('MSG_KING3_LOGIN_KGCL', function (client, data) {
    let msg = MSG_KING3_LOGIN_KGCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_KING3_PREPARE_FAIL_KGCL', function (client, data) {
    let msg = MSG_KING3_PREPARE_FAIL_KGCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_KING3_PLAYOBJECT_KGCL', function (client, data) {
    let msg = MSG_KING3_PLAYOBJECT_KGCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_KING3_WITHHOLD_KGCL', function (client, data) {
    let msg = MSG_KING3_WITHHOLD_KGCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_KING3_SETTLEMENT_KGCL', function (client, data) {
    let msg = MSG_KING3_SETTLEMENT_KGCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_KING3_GAMEINFO_KGCL', function (client, data) {
    let msg = MSG_KING3_GAMEINFO_KGCL.decode(data);
    let pidList = msg.pidList;

    msg.pidList = [];
    let msgData = MSG_KING3_GAMEINFO_KGCL.encode(msg).finish();

    let playerClient = null;
    for (let i = 0, len = pidList.length; i < len; ++i) {
        playerClient = g_connserver.GetPlayer(pidList[i]);
        if (playerClient) playerClient.Send(msgData);
    }
});

g_connserver.on('MSG_KING3_GAMESTATE_KGCL', function (client, data) {
    let msg = MSG_KING3_GAMESTATE_KGCL.decode(data);
    let pidList = msg.pidList;

    msg.pidList = [];
    let msgData = MSG_KING3_GAMESTATE_KGCL.encode(msg).finish();

    let playerClient = null;
    for (let i = 0, len = pidList.length; i < len; ++i) {
        playerClient = g_connserver.GetPlayer(pidList[i]);
        if (playerClient) playerClient.Send(msgData);
    }
});

g_connserver.on('MSG_KING3_ROOMLIST_KGCL', function (client, data) {
    let msg = MSG_KING3_ROOMLIST_KGCL.decode(data);
    if (msg.pid > 0) {
        let playerClient = g_connserver.GetPlayer(msg.pid);
        if (playerClient) playerClient.Send(data);
    } else {
        g_connserver.Broadcast(data);
    }
});