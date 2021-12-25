// --------------------------------------------------------
// 网关服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'gateserver.log',
        consoleLevel: 'debug',
        fileLevel: 'info',
    },
    gateserver: {
        host: '192.168.1.6',
        port: 2207,
    },
};

module.exports = config;