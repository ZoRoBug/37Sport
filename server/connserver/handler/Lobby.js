// --------------------------------------------------------
// 大厅相关消息协议处理
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const helper = require('../../../public/Helper');
const common = require('../../../protocol/Common');
const constant = require('../../../protocol/Constant');
const protocol = require('../../../protocol/protocol');
const MSG_LOGIN_CLDB = require('../../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_LOGOUT_CLGM = require('../../../protocol/MSG_LOGOUT_CLGM')['MSG_LOGOUT_CLGM'];
const MSG_KICK_CLCN = require('../../../protocol/MSG_KICK_CLCN')['MSG_KICK_CLCN'];
const MSG_KICK_LBCL = require('../../../protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_ALTER_NAME_CLDB = require('../../../protocol/MSG_ALTER_NAME_CLDB')['MSG_ALTER_NAME_CLDB'];
const MSG_ALTER_NAME_DBCL = require('../../../protocol/MSG_ALTER_NAME_DBCL')['MSG_ALTER_NAME_DBCL'];
const MSG_SEND_MAIL_CLLB = require('../../../protocol/MSG_SEND_MAIL_CLLB')['MSG_SEND_MAIL_CLLB'];
const MSG_SEND_MAIL_LBCL = require('../../../protocol/MSG_SEND_MAIL_LBCL')['MSG_SEND_MAIL_LBCL'];
const MSG_EXCHANGE_CLLB = require('../../../protocol/MSG_EXCHANGE_CLLB')['MSG_EXCHANGE_CLLB'];
const MSG_EXCHANGE_LBCL = require('../../../protocol/MSG_EXCHANGE_LBCL')['MSG_EXCHANGE_LBCL'];
const MSG_SIGNIN_CLLB = require('../../../protocol/MSG_SIGNIN_CLLB')['MSG_SIGNIN_CLLB'];
const MSG_SIGNIN_LBCL = require('../../../protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];
const MSG_ADD_EXCH_CODE_CLLB = require('../../../protocol/MSG_ADD_EXCH_CODE_CLLB')['MSG_ADD_EXCH_CODE_CLLB'];
const MSG_ADD_EXCH_CODE_LBCL = require('../../../protocol/MSG_ADD_EXCH_CODE_LBCL')['MSG_ADD_EXCH_CODE_LBCL'];
const MSG_VIEW_RECORD_CLDB = require('../../../protocol/MSG_VIEW_RECORD_CLDB')['MSG_VIEW_RECORD_CLDB'];
const MSG_VIEW_RECORD_DBCL = require('../../../protocol/MSG_VIEW_RECORD_DBCL')['MSG_VIEW_RECORD_DBCL'];
const MSG_PLAYER_REGISTER_CLDB = require('../../../protocol/MSG_PLAYER_REGISTER_CLDB')['MSG_PLAYER_REGISTER_CLDB'];
const MSG_PLAYER_REGISTER_DBCL = require('../../../protocol/MSG_PLAYER_REGISTER_DBCL')['MSG_PLAYER_REGISTER_DBCL'];

g_handler.SendLogoutMsg = function (pid, ip) {
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!gameClient) return;
    gameClient.Send(MSG_LOGOUT_CLGM.encode({
        msgID: protocol.GetMsgId('MSG_LOGOUT_CLGM'),
        pid: pid, ip: ip
    }).finish());
}

g_connserver.on('MSG_LOGIN_CLDB', function (client, data) {
    let msgIn = null;
    try {
        msgIn = MSG_LOGIN_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    try {
        if (g_connserver.PlayerIsOvertop()) {
            throw MSG_LOGIN_DBCL.Result.OVER_PLAYER;
        }

        if (!helper.IsValidPlatform(msgIn.platform)) {
            throw MSG_LOGIN_DBCL.Result.PARAM_ERROR;
        }

        if (helper.IsOfficialPlatform(msgIn.platform) &&
            (msgIn.account.length === 0 || msgIn.account.length > constant.MAX_ACCOUNT_MAX_SIZE)) {
            throw MSG_LOGIN_DBCL.Result.ACCOUNT_NOEXIST;
        }

        if (helper.IsOfficialPlatform(msgIn.platform) && !constant.PasswordIsValid(msgIn.password)) {
            throw MSG_LOGIN_DBCL.Result.PASSWORD_ERROR;
        }

        if (helper.IsWeiXinPlatform(msgIn.platform) &&
            (msgIn.wxCode.length === 0 || msgIn.wxCode.length > constant.MAX_WXCODE_MAX_SIZE)) {
            throw MSG_LOGIN_DBCL.Result.WX_CODE_INVALID;
        }

        if (!g_handler.DelTicket(msgIn.ticket)) {
            throw MSG_LOGIN_DBCL.Result.TICKET_ERROR;
        }

        let gameClient = g_connserver.GetGame(common.Location.LOBBY);
        if (!gameClient) {
            throw MSG_LOGIN_DBCL.Result.LOBBY_NO_CONNECT;
        }

        msgIn.loginID = g_handler.GetLoginID();
        if (!g_connserver.AddWait(msgIn.loginID, client)) {
            throw MSG_LOGIN_DBCL.Result.UNKNOW1;
        }

        msgIn.ip = client.GetIP();
        gameClient.Send(MSG_LOGIN_CLDB.encode(msgIn).finish());
    } catch (result) {
        if (typeof result !== 'number') {
            g_log.Error('MSG_LOGIN_CLDB意外异常出现%s', result);
            result = MSG_LOGIN_DBCL.Result.UNKNOW2;
        }
        client.Send(MSG_LOGIN_DBCL.encode({
            msgID: protocol.GetMsgId('MSG_LOGIN_DBCL'),
            result: result
        }).finish(), function () {
            client.Close();
        });
    }
});

g_connserver.on('MSG_LOGOUT_CLGM', function (client, data) {
    try {
        MSG_LOGOUT_CLGM.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }
    g_connserver.DelWait(client);
    g_connserver.DelPlayer(client);
    client.Close();
});

g_connserver.on('MSG_ALTER_NAME_CLDB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_ALTER_NAME_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_ALTER_NAME_DBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_ALTER_NAME_DBCL.Result.OFFLINE;
    } else if (msg.cost !== 0 && msg.cost !== constant.ALTER_NAME_COST) {
        msg.result = MSG_ALTER_NAME_DBCL.Result.COST_ERROR;
    } else if (!constant.NameIsValid(msg.newName)) {
        msg.result = MSG_ALTER_NAME_DBCL.Result.NAME_INVALID;
    } else if (msg.newName === playerInfo.nickname ||
        g_handler.HasAlterName(msg.newName) ||
        g_connserver.GetPlayerByName(msg.newName)) {
        msg.result = MSG_ALTER_NAME_DBCL.Result.SAME_NAME;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_ALTER_NAME_DBCL');
        client.Send(MSG_ALTER_NAME_DBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        g_handler.AddAlterName(msg.newName);
        gameClient.Send(MSG_ALTER_NAME_CLDB.encode(msg).finish());
    }
});

g_connserver.on('MSG_VIEW_RECORD_CLDB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_VIEW_RECORD_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let cost = null;
    let strNowTime = (new Date()).format('yyyy-MM-dd');
    let beginTimestamp = constant.StrTimeToTimestamp(msg.beginTime);
    let endTimestamp = constant.StrTimeToTimestamp(msg.endTime);
    if (strNowTime === msg.endTime && beginTimestamp && endTimestamp &&
        beginTimestamp <= endTimestamp) {
        let diffTimestamp = endTimestamp - beginTimestamp;
        let diffDays = Math.ceil(diffTimestamp / constant.ONE_DAY_MSEL);
        cost = constant.VIEW_RECORD_COST[diffDays + 1];
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_VIEW_RECORD_DBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_VIEW_RECORD_DBCL.Result.OFFLINE;
    } else if (cost !== msg.cost) {
        msg.result = MSG_VIEW_RECORD_DBCL.Result.PARAM_ERROR;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_VIEW_RECORD_DBCL');
        client.Send(MSG_VIEW_RECORD_DBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        let queryEndTimestamp = endTimestamp + constant.ONE_DAY_MSEL;
        msg.endTime = (new Date(queryEndTimestamp)).format('yyyy-MM-dd');
        gameClient.Send(MSG_VIEW_RECORD_CLDB.encode(msg).finish());
    }
});

g_connserver.on('MSG_SEND_MAIL_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_SEND_MAIL_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_SEND_MAIL_LBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_SEND_MAIL_LBCL.Result.OFFLINE;
    } else if (msg.giftCoin !== 0 && msg.giftCoin < constant.GIFT_MIN_COIN) {
        msg.result = MSG_SEND_MAIL_LBCL.Result.PARAM_INVALID;
    } else if (msg.recvName.length === 0 || msg.content.length === 0 ||
        msg.recvName.length > constant.MAIL_NAME_MAX_SIZE ||
        msg.content.length > constant.MAIL_CONTENT_MAX_SIZE) {
        msg.result = MSG_SEND_MAIL_LBCL.Result.PARAM_INVALID;
    }

    if (!msg.result) {
        let recvClient = g_connserver.GetPlayerByName(msg.recvName);
        let recvPlayerInfo = g_connserver.GetPlayerInfo(recvClient);
        if (!recvPlayerInfo) {
            msg.result = MSG_SEND_MAIL_LBCL.Result.RECVER_OFFLINE;
        } else {
            if (playerInfo.pid === recvPlayerInfo.pid) {
                msg.result = MSG_SEND_MAIL_LBCL.Result.PARAM_INVALID;
            }
            msg.recvPID = recvPlayerInfo.pid;
        }
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_SEND_MAIL_LBCL');
        client.Send(MSG_SEND_MAIL_LBCL.encode(msg).finish());
    } else {
        msg.sendPID = playerInfo.pid;
        gameClient.Send(MSG_SEND_MAIL_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_EXCHANGE_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_EXCHANGE_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let exCoin = helper.GetExchangeSum(msg.ticket);
    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_EXCHANGE_LBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_EXCHANGE_LBCL.Result.OFFLINE;
    } else if (msg.ticket.length <= constant.EXCHANGE_TICKET_MIN_SIZE ||
        msg.ticket.length > constant.EXCHANGE_TICKET_MAX_SIZE || exCoin <= 0) {
        msg.result = MSG_EXCHANGE_LBCL.Result.PARAM_INVALID;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_EXCHANGE_LBCL');
        client.Send(MSG_EXCHANGE_LBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_EXCHANGE_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_SIGNIN_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_SIGNIN_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_SIGNIN_LBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_SIGNIN_LBCL.Result.OFFLINE;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_SIGNIN_LBCL');
        client.Send(MSG_SIGNIN_LBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_SIGNIN_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_ADD_EXCH_CODE_CLLB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_ADD_EXCH_CODE_CLLB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let minSum = constant.EXCHANGE_TICKET_MIN_SUM;
    let maxSum = constant.EXCHANGE_TICKET_MAX_SUM;
    if (msg.ticketSum >= minSum && msg.ticketSum <= maxSum) {
        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.SUCCESS;
        msg.newTicket = helper.CreateExchCode(msg.ticketSum);
        msg.msgID = protocol.GetMsgId('MSG_ADD_EXCH_CODE_LBCL');
        client.Send(MSG_ADD_EXCH_CODE_LBCL.encode(msg).finish());
        return;
    }

    let exCoin = helper.GetExchangeSum(msg.ticket);
    let playerInfo = g_connserver.GetPlayerInfo(client);
    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!playerInfo) {
        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.NO_CLIENT_INFO;
    } else if (!gameClient) {
        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.OFFLINE;
    } else if (msg.ticket.length <= constant.EXCHANGE_TICKET_MIN_SIZE ||
        msg.ticket.length > constant.EXCHANGE_TICKET_MAX_SIZE ||
        exCoin < minSum || exCoin > maxSum) {
        msg.result = MSG_ADD_EXCH_CODE_LBCL.Result.PARAM_INVALID;
    } else if (!helper.IsAdmin(playerInfo.identity)) {
        return;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_ADD_EXCH_CODE_LBCL');
        client.Send(MSG_ADD_EXCH_CODE_LBCL.encode(msg).finish());
    } else {
        msg.pid = playerInfo.pid;
        gameClient.Send(MSG_ADD_EXCH_CODE_CLLB.encode(msg).finish());
    }
});

g_connserver.on('MSG_PLAYER_REGISTER_CLDB', function (client, data) {
    let msg = null;
    try {
        msg = MSG_PLAYER_REGISTER_CLDB.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let gameClient = g_connserver.GetGame(common.Location.LOBBY);
    if (!gameClient) {
        msg.result = MSG_PLAYER_REGISTER_DBCL.Result.LOBBY_NO_CONNECT;
    } else if (!constant.NameIsValid(msg.nickname)) {
        msg.result = MSG_PLAYER_REGISTER_DBCL.Result.NAME_INVALID;
    } else if (!constant.PasswordIsValid(msg.password)) {
        msg.result = MSG_PLAYER_REGISTER_DBCL.Result.PASSWORD_INVALID;
    } else if (!helper.IsOfficialPlatform(msg.platform)) {
        msg.result = MSG_PLAYER_REGISTER_DBCL.Result.PARAM_ERROR;
    }

    if (msg.result) {
        msg.msgID = protocol.GetMsgId('MSG_PLAYER_REGISTER_DBCL');
        client.Send(MSG_PLAYER_REGISTER_DBCL.encode(msg).finish());
    } else {
        msg.loginID = g_handler.GetLoginID();
        g_connserver.AddWait(msg.loginID, client);
        gameClient.Send(MSG_PLAYER_REGISTER_CLDB.encode(msg).finish());
    }
});

g_connserver.on('MSG_KICK_CLCN', function (client, data) {
    let msg = null;
    try {
        msg = MSG_KICK_CLCN.decode(data);
    } catch (err) {
        g_log.Error('%s消息解析失败', client.GetIP());
        g_log.Error(err);
        return;
    }

    let playerInfo = g_connserver.GetPlayerInfo(client);
    if (!playerInfo || !helper.IsAdmin(playerInfo.identity)) return;

    let kickClient = g_connserver.GetPlayerByName(msg.nickname);
    if (!kickClient) return;

    msg.reason = MSG_KICK_LBCL.Reason.GM_KICK;
    msg.msgID = protocol.GetMsgId('MSG_KICK_LBCL');
    kickClient.Send(MSG_KICK_LBCL.encode(msg).finish());
});

g_connserver.on('MSG_LOGIN_DBCL', function (client, data) {
    let msg = MSG_LOGIN_DBCL.decode(data);

    let waitClient = g_connserver.GetWait(msg.loginID);
    if (!waitClient) {
        g_log.Error('未发现%s号登录消息链接', msg.loginID);
        return;
    }

    let wxSessionKey = msg.wxSessionKey;
    if (msg.pi && helper.IsWeiXinPlatform(msg.pi.platform)) {
        msg.wxSessionKey = null;
        data = MSG_LOGIN_DBCL.encode(msg).finish();
    }

    if (msg.result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        g_connserver.AddPlayer(waitClient, msg.pi, wxSessionKey);
        g_connserver.DelWait(waitClient, true);
    }

    waitClient.Send(data, function () {
        if (msg.result !== MSG_LOGIN_DBCL.Result.SUCCESS) {
            g_connserver.DelWait(waitClient);
        }
    });
});

g_connserver.on('MSG_KICK_LBCL', function (client, data) {
    let msg = MSG_KICK_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) {
        g_connserver.DelPlayer(playerClient, true, true);
        playerClient.Send(data, function () {
            playerClient.Close();
        });
    }
});

g_connserver.on('MSG_ALTER_NAME_DBCL', function (client, data) {
    let msg = MSG_ALTER_NAME_DBCL.decode(data);
    g_handler.DelAlterName(msg.newName);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    let playerInfo = g_connserver.GetPlayerInfo(playerClient);
    if (playerClient) playerClient.Send(data);
    if (playerInfo && msg.result === MSG_ALTER_NAME_DBCL.Result.SUCCESS) {
        g_connserver.AlterName(playerInfo.nickname, msg.newName);
        playerInfo.nickname = msg.newName;
    }
});

g_connserver.on('MSG_SEND_MAIL_LBCL', function (client, data) {
    let msg = MSG_SEND_MAIL_LBCL.decode(data);
    let sendClient = g_connserver.GetPlayer(msg.sendPID);
    if (sendClient) sendClient.Send(data);
    if (msg.result === MSG_SEND_MAIL_LBCL.Result.SUCCESS) {
        let recvClient = g_connserver.GetPlayer(msg.recvPID);
        if (recvClient) recvClient.Send(data);
    }
});

g_connserver.on('MSG_EXCHANGE_LBCL', function (client, data) {
    let msg = MSG_EXCHANGE_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_SIGNIN_LBCL', function (client, data) {
    let msg = MSG_SIGNIN_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_ADD_EXCH_CODE_LBCL', function (client, data) {
    let msg = MSG_ADD_EXCH_CODE_LBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_VIEW_RECORD_DBCL', function (client, data) {
    let msg = MSG_VIEW_RECORD_DBCL.decode(data);
    let playerClient = g_connserver.GetPlayer(msg.pid);
    if (playerClient) playerClient.Send(data);
});

g_connserver.on('MSG_PLAYER_REGISTER_DBCL', function (client, data) {
    let msg = MSG_PLAYER_REGISTER_DBCL.decode(data);
    let waitClient = g_connserver.GetWait(msg.loginID);
    if (waitClient) {
        waitClient.Send(data, function () {
            g_connserver.DelWait(waitClient);
        });
    }
});