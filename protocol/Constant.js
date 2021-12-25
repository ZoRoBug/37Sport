// --------------------------------------------------------
// 整个项目常量
// --------------------------------------------------------
// 客户端与服务器共用
// --------------------------------------------------------
"use strict";

const constant = {
    ///////////////////////////////////////////////////////
    // 游戏系统相关
    MAX_REGISTER_TIMES: 3, // 最大注册次数

    REDIS_MAX_RETRY_TIMES: 10, // Redis最大重试次数

    EXCHANGE_TICKET_MIN_SIZE: 32, // 兑换码最小长度
    EXCHANGE_TICKET_MAX_SIZE: 42, // 兑换码最大长度
    EXCHANGE_FAIL_MAX_TIMES: 3, // 兑换连续失败最大次数
    EXCHANGE_FAIL_EXPIRE_SEC: 600, // 兑换失败过期时间（秒）
    EXCHANGE_TICKET_MIN_SUM: 1000, // 兑换码兑换最小金额
    EXCHANGE_TICKET_MAX_SUM: 100000000000, // 兑换码兑换最大金额

    ROOM_DESC_MAX_SIZE: 8, // 房间描述最大长度
    ROOM_PASSWORD_MAX_SIZE: 6, // 房间密码最大长度

    GIFT_MIN_COIN: 10000, // 发送红包最小金额
    MAIL_NAME_MAX_SIZE: 32, // 信件昵称最大长度
    MAIL_CONTENT_MAX_SIZE: 50, // 信件内容最大长度

    ALTER_NAME_COST: 200000000, // 修改昵称费用
    ALTER_NAME_MAX_SIZE: 6, // 修改昵称最大长度

    ONE_DAY_MSEL: 86400000, // 一天的毫秒数
    VIEW_RECORD_COST: [
        0, 0, 1000000, 5000000, 5000000, 10000000
    ], // 查看记录军饷消耗，下标是查看天数

    // 判断密码是否合法
    PasswordIsValid: function (password) {
        if (typeof password !== 'string') return false;
        if (password.indexOf('123456') === 0) return false;
        if (password.length < this.MAX_PASSWORD_MIN_SIZE ||
            password.length > this.MAX_PASSWORD_MAX_SIZE) return false;
        let patter = /^[A-Za-z0-9]+$/;
        return patter.test(password);
    },

    // 判断昵称是否合法
    NameIsValid: function (name) {
        if (this.FirstAlterName(name)) return false;
        if (name.length === 0 || name.length > this.ALTER_NAME_MAX_SIZE) return false;
        let patter = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        return patter.test(name);
    },

    // 判断是否为第一次修改昵称
    FirstAlterName: function (name) {
        if (typeof name !== 'string') return false;
        return name.indexOf('wx') === 0;
    },

    // 时间字符串转换为时间戳，时间无效返回NaN
    StrTimeToTimestamp: function (strTime) {
        strTime = strTime.substring(0, 19);
        strTime = strTime.replace(/-/g, '/');
        return new Date(strTime).getTime();
    },

    ///////////////////////////////////////////////////////
    // 登录模块相关
    MAX_WXCODE_MAX_SIZE: 64, // 微信最大长度
    MAX_ACCOUNT_MAX_SIZE: 20, // 账号最大长度
    MAX_PASSWORD_MAX_SIZE: 20, // 密码最大长度
    MAX_PASSWORD_MIN_SIZE: 6, // 密码最小长度

    ///////////////////////////////////////////////////////
    // 三国模块相关
    KING3_PLAYER_COUNT: 2, // 三国玩家数量
    KING3_MIN_BETCOIN: 1000, // 三国最小出战金额
    KING3_UNLOCK_COST: 1000000, // 三国房间开锁费用
    KING3_MATCH_BET_LIST: [
        100000, 500000, 1000000, 2000000,
        5000000, 10000000, 20000000, 50000000, 100000000
    ], // 三国匹配房出战金额列表

    ///////////////////////////////////////////////////////
    // 七雄模块相关
    POWER7_PLAYER_COUNT: 7, // 七雄玩家数量（齐，楚，燕，韩，赵，魏，秦）
    POWER7_MIN_BETCOIN: 100000, // 七雄最小出兵金额
    POWER7_MIN_MAXBETCOIN: 1000000, // 七雄最小出兵金额上限
    POWER7_UNLOCK_COST: 1000000, // 七雄房间开锁费用
    POWER7_MAX_BET_LIST: [
        1000000, 2000000, 5000000, 10000000,
        20000000, 50000000, 100000000, 200000000, 500000000
    ], // 七雄匹配房出兵最大上线列表

    ///////////////////////////////////////////////////////
    // 楚汉模块相关
    IMPAWN_MIN_BET_SUM: 1000, // 楚汉每次最小押分金额
    IMPAWN_MAX_BET_SUM: 500000000, // 楚汉每次最大押分金额
    IMPAWN_MAX_BET_TIMES: 3, // 楚汉每轮押分次数

    // 楚汉相争结果，返回null无效，true楚赢，false汉赢
    ImpawnResult: function (chuImpawnTotal, hanImpawnTotal) {
        if (!chuImpawnTotal || !hanImpawnTotal) return null;

        let strChuImpawnTotal = String(chuImpawnTotal);
        let strChu10wan = strChuImpawnTotal.slice(-6, -5);
        if (strChuImpawnTotal.length < 6) {
            strChu10wan = strChuImpawnTotal.slice(0, 1);
        }
        if (isNaN(strChu10wan)) return null;

        let strHanImpawnTotal = String(hanImpawnTotal);
        let strHan10wan = strHanImpawnTotal.slice(-6, -5);
        if (strHanImpawnTotal.length < 6) {
            strHan10wan = strHanImpawnTotal.slice(0, 1);
        }
        if (isNaN(strHan10wan)) return null;

        let result = Number(strChu10wan) + Number(strHan10wan);
        result = String(result).slice(-1);
        return Number(result) <= 2;
    },
};

module.exports = constant;