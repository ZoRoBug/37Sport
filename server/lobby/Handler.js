// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const config = require('./Config');
const protocol = require('../../protocol/protocol');
const MSG_REGISTER_GMCN = require('../../protocol/MSG_REGISTER_GMCN')['MSG_REGISTER_GMCN'];
const MSG_REGISTER_CNGM = require('../../protocol/MSG_REGISTER_CNGM')['MSG_REGISTER_CNGM'];

const handler = {
    Init: function () {
        require('./handler/Mail');
        require('./handler/Login');
        require('./handler/Signin');
        require('./handler/Exchange');
        require('./handler/AlterName');
        require('./handler/ViewRecord');
        g_cnclients.on('WS_CLIENT_OPEN', OnWSCOpen);
        g_cnclients.on('MSG_REGISTER_CNGM', OnRegisterMsg);
    },

    Uninit: function () {
    },
};

function OnWSCOpen(client) {
    client.Send(MSG_REGISTER_GMCN.encode({
        msgID: protocol.GetMsgId('MSG_REGISTER_GMCN'),
        id: config.lobby.id, name: config.lobby.name
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

module.exports = handler;