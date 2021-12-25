// --------------------------------------------------------
// 游戏大厅所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'lobby.log',
        consoleLevel: 'verbose',
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
        { id: 1, name: '1号ConnClient', address: 'ws://172.27.0.12:2208' },
    ],
    dbserver: {
        name: 'DBClient',
        address: 'ws://127.0.0.1:2209'
    },
    dbredis: {
        name: 'DBRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 0,
    },
    gmredis: {
        name: 'GMRedis',
        host: '127.0.0.1',
        port: 6379,
        password: '3.141592653589793@Redis',
        dbnum: 1,
    },
};

module.exports = config;