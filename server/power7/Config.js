// --------------------------------------------------------
// 七雄争霸所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'power7.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    power7: {
        id: 3,
        name: '七雄争霸',
        
        lockRoomMaxID: 20, // 锁定房最大ID
        matchRoomMaxID: 200, // 匹配房最大ID（包含了锁定房ID）
        maxPlayerCount: 100, // 每个房间最大进入玩家数

        maxLossCoin: 50000000000, // 最大损失金额
        clearWinLossHour: 0, // 几点清空输赢记录

        waitStartTime: 5000, // 等待开始时长
        startingTime: 20000, // 游戏进行时长
        waitEndTime: 3000, // 等待结束时长
    },
    connserver: [
        { id: 1, name: '1号ConnClient', address: 'ws://192.168.1.6:2208' },
    ],
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