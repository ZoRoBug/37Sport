// --------------------------------------------------------
// 游戏大厅所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'lobby.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    lobby: {
        id: 1,
        name: '游戏大厅',
    },
    signin: {
        interval: 3600, // 签到领奖间隔时间(秒)
        awardMinSubcoin: 50000, // 签到领奖最小军粮金额
        awardMaxSubcoin: 200000, // 签到领奖最大军粮金额
        pauseHeadHour: 1, // 签到配置头部时间
        pauseTailHour: 8, // 签到配置尾部时间（pauseHeadHour<=小时<pauseTailHour暂停签到）
    },
    connserver: [
        { id: 1, name: '1号ConnClient', address: 'ws://192.168.1.6:2208' },
    ],
    dbserver: {
        name: 'DBClient',
        address: 'ws://192.168.1.6:2209'
    },
    dbredis: {
        name: 'DBRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 0,
    },
    gmredis: {
        name: 'GMRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 1,
    },
};

module.exports = config;