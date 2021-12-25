"use strict";
const config = require('./Config');
const EventEmitter = require('events');
const order = require('../../public/Order');
const WSClient = require('../../public/WSClient');
const protocol = require('../../protocol/protocol');
const MSG_PING = require('../../protocol/MSG_PING')['MSG_PING'];

function NewGate() {
    let client = new WSClient(this, config.login.address, this.emitter);
    if (!config.login.errorTest || Math.randomnum(1, 100) > 1) this.gateList.add(client);
}

function NewConn(address, ticket) {
    let client = new WSClient(this, address, this.emitter);
    if (!config.login.errorTest || Math.randomnum(1, 100) > 1) this.connList.set(client, ticket);
}

const login = {
    on: function () {
        this.emitter.on.apply(this.emitter, arguments);
    },

    emit: function () {
        this.emitter.emit.apply(this.emitter, arguments);
    },

    Init: function () {
        this.gateList = new Set();
        this.connList = new Map();
        this.emitter = new EventEmitter();

        order.Register('in', '开始登录', function () {
            clearInterval(this.timerLogin);
            this.timerLogin = setInterval(function () {
                this.CreateGate();
            }.bind(this), config.login.loginTime);
        }.bind(this));

        order.Register('sin', '停止登录', function () {
            clearInterval(this.timerLogin);
        }.bind(this));

        order.Register('out', '开始登出', function () {
            clearInterval(this.timerLogout);
            this.timerLogout = setInterval(function () {
                if (this.connList.size === 0) {
                    if (this.allPlayerOut) return;
                    this.allPlayerOut = true;
                    g_log.Info('所有登录玩家已退出完成');
                    clearInterval(this.timerLogout);
                    return;
                }
                this.allPlayerOut = false;
                for (let client of this.connList.keys()) {
                    g_handler.SendLogoutMsg(client);
                    break;
                }   
            }.bind(this), config.login.logoutTime);
        }.bind(this));

        order.Register('sout', '停止登出', function () {
            clearInterval(this.timerLogout);
        }.bind(this));

        order.Register('li', '登录信息', function () {
            console.log('登录人数%s/%s', this.connList.size, config.players.length);
        }.bind(this));

        this.pingTimeout = setInterval(function () {
            if (!this.msgPingData) {
                this.msgPingData = MSG_PING.encode({
                    msgID: protocol.GetMsgId('MSG_PING')
                }).finish();
            }
            for (let client of this.connList.keys()) {
                client.Send(this.msgPingData);
            }
        }.bind(this), 15000);
    },

    Uninit: function () {
        clearInterval(this.timerLogin);
        clearInterval(this.timerLogout);
        clearInterval(this.pingTimeout);
        this.emitter.removeAllListeners();
        for (let client of this.gateList) client.Close();
        for (let client of this.connList.keys()) client.Close();
    },

    CreateGate: function() {
        NewGate.call(this);
    },

    CreateConn: function(address, ticket) {
        NewConn.call(this, address, ticket);
    },

    WSCOpen: function (client) {
        if (this.gateList.has(client)) {
            if (config.login.errorTest && Math.randomnum(1, 100) <= 1) return;
            g_handler.SendApplyMsg(client);
        } else if (this.connList.has(client)) {
            if (config.login.errorTest && Math.randomnum(1, 100) <= 1) return;
            if (config.players.length === 0) {
                g_log.Error('玩家列表为空，无法登录');
                return;
            }
            let random = Math.randomnum(0, config.players.length - 1);
            let msg = config.players[random];
            msg.ticket = this.connList.get(client);
            g_handler.SendLoginMsg(client, msg);
        }
    },

    WSCClose: function (client) {
        this.gateList.delete(client);
        this.connList.delete(client);
    },
};

module.exports = login;