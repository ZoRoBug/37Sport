// --------------------------------------------------------
// 服务websocket功能封装
// --------------------------------------------------------
// owner可实现以下回调函数接受信息：
// （1）WSSConnection 有客户端链接
// （2）WSSClose 端口监听已关闭
// （3）WSSHeartbeat 通知发生心跳包
// --------------------------------------------------------
"use strict";
const WS = require('ws');
const log = require('./Log');

const MAX_MSG_SIZE = 100 * 1024;

function Title() {
    let options = this.wss.options;
    return '【WSS】' + options.host + ':' + options.port;
}

function WSServer(owner, port, host) {
    this.owner = owner;

    this.wss = new WS.Server({
        port: port, host: host,
        clientTracking: false, maxPayload: MAX_MSG_SIZE
    });

    this.wss.on('listening', function () {
        log.Info('%s已开启监听', Title.call(this));
    }.bind(this));

    this.wss.on('error', function (err) {
        throw new Error(Title.call(this) + '发生错误：' + err);
    }.bind(this));

    this.wss.on('close', function () {
        this.isClosed = true;
        clearInterval(this.timerHeartbeat);
        log.Info('%s已关闭监听', Title.call(this));
        if (this.owner && typeof this.owner.WSSClose === 'function') {
            this.owner.WSSClose(this);
        }
    }.bind(this));

    this.wss.on('connection', function (client, request) {
        client.ip = request.connection.remoteAddress;
        log.Debug('%s终端（%s）已连入', Title.call(this), client.ip);
        if (this.owner && typeof this.owner.WSSConnection === 'function') {
            this.owner.WSSConnection(client, request);
        }
    }.bind(this));

    this.timerHeartbeat = setInterval(function () {
        if (this.owner && typeof this.owner.WSSHeartbeat === 'function') {
            this.owner.WSSHeartbeat(this);
        }
    }.bind(this), 1500);
}

WSServer.prototype.Close = function () {
    if (this.isClosed) return;
    log.Debug('%s准备关闭监听', Title.call(this));
    clearInterval(this.timerHeartbeat);
    this.isClosed = true;
    this.wss.close();
}

module.exports = WSServer;