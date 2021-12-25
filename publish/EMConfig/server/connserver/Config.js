// --------------------------------------------------------
// 链接服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'connserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    connserver: {
        id: 1,
        host: '192.168.1.14',
        port: 2208,
        maxPlayer: 1000,
        overPlayer: 1200,
        address: 'ws://192.168.1.14:2208'
    },
    gateserver: {
        name: 'GateClient',
        address: 'ws://192.168.1.14:2207'
    },
};

module.exports = config;