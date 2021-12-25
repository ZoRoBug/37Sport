"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const MSG_REFUND_GMCL = require('../protocol/MSG_REFUND_GMCL')['MSG_REFUND_GMCL'];
const MSG_ALTER_NAME_DBCL = require('../protocol/MSG_ALTER_NAME_DBCL')['MSG_ALTER_NAME_DBCL'];
const MSG_ALTER_NAME_CLDB = require('../protocol/MSG_ALTER_NAME_CLDB')['MSG_ALTER_NAME_CLDB'];
const MSG_SEND_MAIL_CLLB = require('../protocol/MSG_SEND_MAIL_CLLB')['MSG_SEND_MAIL_CLLB'];
const MSG_SEND_MAIL_LBCL = require('../protocol/MSG_SEND_MAIL_LBCL')['MSG_SEND_MAIL_LBCL'];
const MSG_EXCHANGE_CLLB = require('../protocol/MSG_EXCHANGE_CLLB')['MSG_EXCHANGE_CLLB'];
const MSG_EXCHANGE_LBCL = require('../protocol/MSG_EXCHANGE_LBCL')['MSG_EXCHANGE_LBCL'];
const MSG_SIGNIN_CLLB = require('../protocol/MSG_SIGNIN_CLLB')['MSG_SIGNIN_CLLB'];
const MSG_SIGNIN_LBCL = require('../protocol/MSG_SIGNIN_LBCL')['MSG_SIGNIN_LBCL'];
const MSG_ADD_EXCH_CODE_CLLB = require('../protocol/MSG_ADD_EXCH_CODE_CLLB')['MSG_ADD_EXCH_CODE_CLLB'];
const MSG_ADD_EXCH_CODE_LBCL = require('../protocol/MSG_ADD_EXCH_CODE_LBCL')['MSG_ADD_EXCH_CODE_LBCL'];
const MSG_VIEW_RECORD_CLDB = require('../protocol/MSG_VIEW_RECORD_CLDB')['MSG_VIEW_RECORD_CLDB'];
const MSG_VIEW_RECORD_DBCL = require('../protocol/MSG_VIEW_RECORD_DBCL')['MSG_VIEW_RECORD_DBCL'];

g_handler.SendAlterNameMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_ALTER_NAME_CLDB');
    client.Send(MSG_ALTER_NAME_CLDB.encode(msg).finish());
}

g_handler.SendMailMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_SEND_MAIL_CLLB');
    client.Send(MSG_SEND_MAIL_CLLB.encode(msg).finish());
}

g_handler.SendExchangeMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_EXCHANGE_CLLB');
    client.Send(MSG_EXCHANGE_CLLB.encode(msg).finish());
}

g_handler.SendSigninMsg = function (client) {
    client.Send(MSG_SIGNIN_CLLB.encode({
        msgID: protocol.GetMsgId('MSG_SIGNIN_CLLB')
    }).finish());
}

g_handler.SendAddExchCodeMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_ADD_EXCH_CODE_CLLB');
    client.Send(MSG_ADD_EXCH_CODE_CLLB.encode(msg).finish());
}

g_handler.SendViewRecordMsg = function (client, msg) {
    msg.msgID = protocol.GetMsgId('MSG_VIEW_RECORD_CLDB');
    client.Send(MSG_VIEW_RECORD_CLDB.encode(msg).finish());
}

g_connclient.on('MSG_REFUND_GMCL', function (data) {
    let msg = MSG_REFUND_GMCL.decode(data);
    g_uiemitter.emit('UI_REFUND', msg);
});

g_connclient.on('MSG_ALTER_NAME_DBCL', function (data) {
    let msg = MSG_ALTER_NAME_DBCL.decode(data);
    if (msg.result === MSG_ALTER_NAME_DBCL.Result.SUCCESS) {
        g_player.SetNickname(msg.newName);
    } else if (msg.cost > 0) {
        g_player.SetProp(common.PropID.COIN, msg.cost);
    }
    g_uiemitter.emit('UI_ALTER_NAME', msg);
});

g_connclient.on('MSG_SEND_MAIL_LBCL', function (data) {
    let msg = MSG_SEND_MAIL_LBCL.decode(data);
    if (msg.result === MSG_SEND_MAIL_LBCL.Result.SUCCESS) {
        let isRecv = (g_player.GetPID() === msg.recvPID);
        if (isRecv) g_player.SetProp(common.PropID.COIN, msg.giftCoin);
    } else if (msg.giftCoin > 0) {
        g_player.SetProp(common.PropID.COIN, msg.giftCoin);
    }
    g_uiemitter.emit('UI_SEND_MAIL', msg);
});

g_connclient.on('MSG_EXCHANGE_LBCL', function (data) {
    let msg = MSG_EXCHANGE_LBCL.decode(data);
    if (msg.result === MSG_EXCHANGE_LBCL.Result.SUCCESS) {
        g_player.SetProp(common.PropID.COIN, msg.coin);
    }
    g_uiemitter.emit('UI_EXCHANGE', msg);
});

g_connclient.on('MSG_SIGNIN_LBCL', function (data) {
    let msg = MSG_SIGNIN_LBCL.decode(data);
    if (msg.result === MSG_SIGNIN_LBCL.Result.SUCCESS) {
        g_player.SetProp(common.PropID.SUBCOIN, msg.subcoin);
    }
    g_uiemitter.emit('UI_SIGNIN', msg);
});

g_connclient.on('MSG_ADD_EXCH_CODE_LBCL', function (data) {
    let msg = MSG_ADD_EXCH_CODE_LBCL.decode(data);
    g_uiemitter.emit('UI_ADD_EXCHCODE', msg);
});

g_connclient.on('MSG_VIEW_RECORD_DBCL', function (data) {
    let msg = MSG_VIEW_RECORD_DBCL.decode(data);
    if (msg.result !== MSG_VIEW_RECORD_DBCL.Result.SUCCESS) {
        g_player.SetProp(common.PropID.COIN, msg.cost);
    }
    g_uiemitter.emit('UI_VIEW_RECORD', msg);
});