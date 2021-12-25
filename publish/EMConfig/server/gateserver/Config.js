// --------------------------------------------------------
// 网关服务器所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const config = {
    log: {
        fileName: 'gateserver.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },
    gateserver: {
        host: '192.168.1.14',
        port: 2207,
    },
};

module.exports = config;