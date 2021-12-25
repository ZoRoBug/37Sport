// --------------------------------------------------------
// 三国鼎立入口
// --------------------------------------------------------
// 主要功能：
// （1）三国鼎立逻辑
// （3）同步三国鼎立游戏记录数据到数据库服务器redis
// --------------------------------------------------------
"use strict";
require('../../public/Remould');
const config = require('./Config');
const common = require('../../protocol/Common');
const Clients = require('../common/Clients');
const order = require('../../public/Order');
const Redis = require('../common/Redis');
global.g_log = require('../../public/Log');
global.g_handler = require('./handler');
global.g_king3 = require('./King3');
global.g_refund = require('../common/Refund');
global.g_player = require('../common/Player');
global.g_withhold = require('../common/Withhold');
global.g_cnclients = new Clients();
global.g_gmredis = new Redis();
global.g_dbredis = new Redis();

// 初始命令
order.Init();

// 初始日志生成器
g_log.Init(config.log);

// 初始链接服客户端
g_cnclients.Init(config.connserver);

// 初始游戏存储器
g_gmredis.Init(config.gmredis);

// 初始数据库存储器
g_dbredis.Init(config.dbredis);

// 初始消息处理器
g_handler.Init();

// 初始三国鼎立
g_king3.Init();

// 初始预扣退还
g_refund.Init(common.Location.KING3);

// 注册执行命令
order.Register('eval', '执行代码', function (cmds) {
    try { eval(cmds[0]); }
    catch (err) { console.log(err); }
});

// 捕获程序异常
process.on('uncaughtException', function (err) {
    g_log.Error(err.stack);
    process.emit('SIGINT');
});

// 捕获退出信号
process.on('SIGINT', function () {
    g_log.Info('等待各模块释放完成...');
    g_king3.Uninit();
    g_handler.Uninit();
    g_dbredis.Uninit();
    g_gmredis.Uninit();
    g_cnclients.Uninit();
    setTimeout(function () {
        g_log.Info('释放完成，正在结束服务...');
        g_log.Uninit();
        order.Uninit();
        process.exit();
    }, 3000);
});