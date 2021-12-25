"use strict";
const config = require('../Config');
const utility = require('../public/Utility');
const protocol = require('../protocol/Protocol');
const MSG_APPLY_CLGT = require('../protocol/MSG_APPLY_CLGT')['MSG_APPLY_CLGT'];
const MSG_DISTRIBUTE_GTCL = require('../protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];

const handler = {
    Init: function () {
        require('./LoginHandler');
        require('./LobbyHandler');
        require('./King3Handler');
        require('./Power7Handler');
        require('./ImpawnHandler');
        g_gateclient.on('MSG_DISTRIBUTE_GTCL', OnDistributeMsg);
        g_gateclient.on('CLIENT_DISCONNECT', OnDisConnectMsg);
        g_gateclient.on('CLIENT_CONNECT', OnGateConnectMsg);
        g_connclient.on('CLIENT_DISCONNECT', OnDisConnectMsg);
        g_connclient.on('CLIENT_CONNECT', OnConnConnectMsg);
    },

    SetTicket: function (ticket) {
        this.ticket = ticket;
    },

    IsRegister: function () {
        return (this.registerNickname && this.registerPassword);
    },

    StartRegister: function (nickname, password) {
        this.registerNickname = nickname;
        this.registerPassword = password;
        g_gateclient.Connect(config.gateserver.address);
    },

    StartLogin: function (head, account, password) {
        let nowTimestamp = new Date().getTime();
        let loginTimestamp = cc.sys.localStorage.getItem(config.itemName.kickTime);
        if (loginTimestamp && nowTimestamp < loginTimestamp) {
            g_uiemitter.emit('UI_DISCONNECT');
            return;
        }

        this.loginHead = head;
        if (!utility.IsWeinXinPlatform()) {
            this.loginAccount = account;
            this.loginPassword = password;
            g_gateclient.Connect(config.gateserver.address);
            return;
        }

        wx.login({
            timeout: 7000,
            success: function (res) {
                if (res.code) {
                    this.wxCode = res.code;
                    g_gateclient.Connect(config.gateserver.address);
                } else {
                    console.error('微信登录错误：' + res.errMsg);
                    g_uiemitter.emit('UI_WXLOGIN_FAIL', res.errMsg);
                }
            }.bind(this)
        })
    },

    SendApplyMsg: function (client) {
        client.Send(MSG_APPLY_CLGT.encode({
            msgID: protocol.GetMsgId('MSG_APPLY_CLGT')
        }).finish());
    },
};

function OnGateConnectMsg() {
    g_handler.SendApplyMsg(g_gateclient);
}

function OnConnConnectMsg() {
    if (g_handler.IsRegister()) {
        g_handler.SendRegisterMsg(g_connclient);
    } else {
        g_handler.SendLoginMsg(g_connclient);
    }
}

function OnDisConnectMsg(name) {
    g_uiemitter.emit('UI_DISCONNECT', name);
}

function OnDistributeMsg(data) {
    let msg = MSG_DISTRIBUTE_GTCL.decode(data);
    if (msg.result === MSG_DISTRIBUTE_GTCL.Result.SUCCESS) {
        g_handler.SetTicket(msg.ticket);
        g_connclient.Connect(msg.address);
    } else {
        console.error('服务器分配失败：' + msg.result);
        g_uiemitter.emit('UI_DISTRIBUTE_FAIL', msg);
    }
    g_gateclient.Close();
}

module.exports = handler;