// --------------------------------------------------------
// 整个项目消息协议
// --------------------------------------------------------
// msg数组为通信消息协议；bag数组为数据包，辅助消息协议
// gateserver(GT)网关服务器；connserver(CN)链接服务器；dbserver(DB)数据库服务器
// lobby(LB)游戏大厅；king3(KG)三国鼎立；power7(PW)七雄争霸；impawn(IM)楚汉相争
// client(CL)客户端；GM后缀代表lobby，king3，power7，impawn集合
// 消息后缀代表消息流向，比如CLGT就代表 客户端 -> 网关服务器
// --------------------------------------------------------
"use strict";

const protocol = {
    // 通过消息ID获取消息名称
    GetMsgName: function (id) {
        if (typeof id != 'number' || id < 0) return;
        return this.msg[id];
    },

    // 通过消息名称获取消息ID
    GetMsgId: function (name) {
        if (typeof name != 'string' || name.length === 0) return;
        if (!this.msgid) {
            this.msgid = new Array();
            for (let i = 0, len = this.msg.length; i < len; ++i) {
                this.msgid[this.msg[i]] = i;
            }
        }
        return this.msgid[name];
    },

    msg: [
        'MSG_PING', // PING（用于客户端检查链接是否断开）
        'MSG_PONG', // PONG（用于客户端检查链接是否断开）

        'MSG_APPLY_CLGT', // 申请链接服务器
        'MSG_DISTRIBUTE_GTCL', // 分配链接服务器

        'MSG_REGISTER_CNGT', // 链接服务器注册
        'MSG_REGISTER_GTCN', // 链接服务器注册返回
        'MSG_REPORT_CNGT', // 链接服务器报告人数
        'MSG_TICKET_GTCN', // 通知链接服务器登录票据

        'MSG_REGISTER_GMCN', // 功能模块注册
        'MSG_REGISTER_CNGM', // 功能模块注册返回

        'MSG_LOGIN_CLDB', // 玩家登录
        'MSG_LOGIN_DBCL', // 玩家登录返回
        'MSG_LOGOUT_CLGM', // 玩家登出

        'MSG_PLAYER_REGISTER_CLDB', // 玩家注册
        'MSG_PLAYER_REGISTER_DBCL', // 玩家注册返回

        'MSG_KICK_CLCN', // GM踢出玩家
        'MSG_KICK_LBCL', // 踢出玩家通知

        'MSG_REFUND_GMCL', // 失效预扣退还

        'MSG_ALTER_NAME_CLDB', // 修改昵称
        'MSG_ALTER_NAME_DBCL', // 修改昵称返回

        'MSG_SEND_MAIL_CLLB', // 发送信件
        'MSG_SEND_MAIL_LBCL', // 发送信件返回

        'MSG_EXCHANGE_CLLB', // 兑换军饷
        'MSG_EXCHANGE_LBCL', // 兑换军饷返回

        'MSG_SIGNIN_CLLB', // 签到领奖
        'MSG_SIGNIN_LBCL', // 签到领奖返回

        'MSG_ADD_EXCH_CODE_CLLB', // 添加兑换码
        'MSG_ADD_EXCH_CODE_LBCL', // 添加兑换码返回

        'MSG_VIEW_RECORD_CLDB', // 查看记录
        'MSG_VIEW_RECORD_DBCL', // 查看记录返回

        'MSG_IMPAWN_LOGIN_CLIM', // 登入楚汉
        'MSG_IMPAWN_LOGIN_CNCL', // 登入楚汉返回
        'MSG_IMPAWN_LOGOUT_CLCN', // 登出楚汉
        'MSG_IMPAWN_BET_CLIM', // 楚汉投注
        'MSG_IMPAWN_BET_FAIL_IMCL', // 楚汉投注失败
        'MSG_IMPAWN_NEW_BET_IMCL', // 楚汉新投注
        'MSG_IMPAWN_GAMEINFO_IMCL', // 楚汉游戏信息
        'MSG_IMPAWN_GAMESTATE_IMCL', // 楚汉游戏状态
        'MSG_IMPAWN_SETTLEMENT_IMCL', // 楚汉结算

        'MSG_KING3_LOGIN_CLKG', // 进入三国
        'MSG_KING3_LOGIN_KGCL', // 进入三国返回
        'MSG_KING3_LOGOUT_CLKG', // 退出三国
        'MSG_KING3_GAMEINFO_KGCL', // 三国游戏信息
        'MSG_KING3_GAMESTATE_KGCL', // 三国游戏状态
        'MSG_KING3_PREPARE_CLKG', // 三国准备
        'MSG_KING3_PREPARE_FAIL_KGCL', // 三国准备失败返回
        'MSG_KING3_PLAYOBJECT_CLKG', // 三国出战
        'MSG_KING3_PLAYOBJECT_KGCL', // 三国出战返回
        'MSG_KING3_WITHHOLD_KGCL', // 三国预扣
        'MSG_KING3_SETTLEMENT_KGCL', // 三国结算
        'MSG_KING3_ROOMLIST_CLKG', // 三国房间列表请求
        'MSG_KING3_ROOMLIST_KGCL', // 三股房间列表返回（房间更新）

        'MSG_POWER7_LOGIN_CLPW', // 进入七雄
        'MSG_POWER7_LOGIN_PWCL', // 进入七雄返回
        'MSG_POWER7_LOGOUT_CLPW', // 退出七雄
        'MSG_POWER7_GAMEINFO_PWCL', // 七雄游戏信息
        'MSG_POWER7_GAMESTATE_PWCL', // 七雄游戏状态
        'MSG_POWER7_PREPARE_CLPW', // 七雄准备
        'MSG_POWER7_PREPARE_FAIL_PWCL', // 七雄准备失败返回
        'MSG_POWER7_PLAYOBJECT_CLPW', // 七雄出兵
        'MSG_POWER7_PLAYOBJECT_PWCL', // 七雄出兵返回
        'MSG_POWER7_WITHHOLD_PWCL', // 七雄结算
        'MSG_POWER7_SETTLEMENT_PWCL', // 七雄结算
        'MSG_POWER7_ROOMLIST_CLPW', // 七雄房间列表请求
        'MSG_POWER7_ROOMLIST_PWCL', // 七雄房间列表返回（房间更新）
    ],

    bag: [
        'MsgID', // 用于从消息编码数据中获取消息ID
        'Common', // 公共消息结构与公共枚举值
        'DBLog', // 数据库日志结构
    ],
};

module.exports = protocol;