// --------------------------------------------------------
// 界面消息通知
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const EventEmitter = require('events');

const msgList = [
    'UI_DISCONNECT', // 服务器链接断开

    'UI_WXLOGIN_FAIL', // 微信登录失败
    'UI_DISTRIBUTE_FAIL', // 分配服务器失败
    'UI_LOGIN_RESULT', // 登录结果
    'UI_KICK', // 被提下线

    'UI_REFUND', // 失效预扣退还
    'UI_ALTER_NAME', // 修改昵称
    'UI_SEND_MAIL', // 发送信件
    'UI_EXCHANGE', // 兑换军饷
    'UI_SIGNIN', // 签到领奖
    'UI_ADD_EXCHCODE', // 添加兑换码
    'UI_VIEW_RECORD', // 查看记录
    'UI_PLAYER_REGISTER', // 玩家注册

    'UI_IMPAWN_LOGIN', // 楚汉相争登录
    'UI_IMPAWN_LOGOUT', // 楚汉相争登出
    'UI_IMPAWN_BET_FAIL', // 楚汉相争投注失败
    'UI_IMPAWN_NEW_BET', // 楚汉相争新投注
    'UI_IMPAWN_GAMEINFO', // 楚汉相争游戏信息
    'UI_IMPAWN_GAMESTATE', // 楚汉相争游戏状态
    'UI_IMPAWN_SETTLEMENT', // 楚汉相争结算

    'UI_KING3_LOGIN', // 三国鼎立登录
    'UI_KING3_LOGOUT', // 三国鼎立登出
    'UI_KING3_GAMEINFO', // 三国鼎立游戏信息
    'UI_KING3_GAMESTATE', // 三国鼎立游戏状态
    'UI_KING3_PREPARE_FAIL', // 三国鼎立准备失败
    'UI_KING3_PLAYOBJECT', // 三国鼎立出战
    'UI_KING3_WITHHOLD', // 三国鼎立预扣
    'UI_KING3_SETTLEMENT', // 三国鼎立结算
    'UI_KING3_ROOMLIST', // 三国鼎立房间列表

    'UI_POWER7_LOGIN', // 七雄争霸登录
    'UI_POWER7_LOGOUT', // 七雄争霸登出
    'UI_POWER7_GAMEINFO', // 七雄争霸游戏信息
    'UI_POWER7_GAMESTATE', // 七雄争霸游戏状态
    'UI_POWER7_PREPARE_FAIL', // 七雄争霸准备失败
    'UI_POWER7_PLAYOBJECT', // 七雄争霸出战
    'UI_POWER7_WITHHOLD', // 七雄争霸预扣
    'UI_POWER7_SETTLEMENT', // 七雄争霸结算
    'UI_POWER7_ROOMLIST', // 七雄争霸房间列表
];

const emitter = new EventEmitter();
const uiemitter = {
    on: function () {
        if (!this.msgList[arguments[0]]) {
            console.error('未定义的消息协议%s', arguments[0]);
            return;
        }
        emitter.on.apply(emitter, arguments);
    },

    emit: function () {
        if (!this.msgList[arguments[0]]) {
            console.error('未定义的消息协议%s', arguments[0]);
            return;
        }
        emitter.emit.apply(emitter, arguments);
    },

    Init: function () {
        this.msgList = {};
        for (let i = 0, len = msgList.length; i < len; ++i) {
            this.msgList[msgList[i]] = i + 1;
        }
    }
};

module.exports = uiemitter;