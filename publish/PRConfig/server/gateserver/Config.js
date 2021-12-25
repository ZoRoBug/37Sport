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
        host: '172.27.0.12',
        port: 2207,
    },
};

module.exports = config;