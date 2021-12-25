// --------------------------------------------------------
// 楚汉相争所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'impawn.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    impawn: {
        id: 4,
        name: '楚汉相争',

        headHour: 1, // 游戏进行配置头部时间（0-23）
        tailHour: 8, // 游戏进行配置尾部时间（0-23），与headHour相等则不暂停
        isPause: true, //headHour<=当前小时<tailHour时间段，true暂停游戏，其他时间段进行游戏；false进行游戏，其他时间段暂停游戏

        maxLossCoin: 50000000000, // 最大损失金额
        clearWinLossHour: 0, // 几点清空输赢记录

        waitStartTime: 7000, // 等待开始时长
        startingTime: 50000, // 游戏进行时长
        waitEndTime: 3000, // 等待结束时长
    },
    connserver: [
        { id: 1, name: '1号ConnClient', address: 'ws://172.27.0.12:2208' },
    ],
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