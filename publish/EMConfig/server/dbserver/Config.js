// --------------------------------------------------------
// 世界服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'dbserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    dbserver: {
        host: '192.168.1.14',
        port: 2209,
    },
    database: {
        host: '192.168.1.11',
        port: 3306,
        db: '37sport',
        readNum: 1,
        userRead: 'root',
        passwordRead: '3.141592653589793',
        writeNum: 1,
        userWrite: 'root',
        passwordWrite: '3.141592653589793',
    },
    redis: {
        name: 'DBRedis',
        host: '192.168.1.11',
        port: 6379,
        password: '3.141592653589793',
        dbnum: 0,
    }
};

module.exports = config;