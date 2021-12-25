// --------------------------------------------------------
// 客户端所有配置
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";

const WXID = '三七竞技'; // 官方微信订阅号

const config = {
    gateserver: {
        address: 'ws://192.168.1.14:2207'
    },

    itemName: {
        king3: 'AgreeKing3Rule',
        power7: 'AgreePower7Rule',
        impawn: 'AgreeImpawnRule',
        kickTime: 'KickTimestamp',
        account: 'LoginAccount',
        password: 'LoginPassword',
        wxAuth: 'WXGetUserInfoAuth',
        record: 'ViewRecordCost',
        register: 'RegisterTimes',
        signTime: 'SignTimestamp',
    },

    wxAddTips: '\r\n欲了解详情，请微信搜一搜官方公众号‘' + WXID + '’进行咨询',

    recordCostTips: '本次搜索超出今日时间范围，按照搜索时间范围将收取%s军饷，您是否同意？\
    \r\n注：本次同意后搜索收费将不再提示，请留意界面红色提示',

    registerAward: '您初次登录，获得%s军粮奖励。军粮在‘楚汉相争’中变成军饷。\
如果您游戏中发现功能性问题，体验性问题可微信搜一搜官方公众号‘' + WXID + '’进行有奖反馈，祝您游戏愉快！\r\n注：前500名新人玩家才有此奖励，超过500人不再发放此奖励',

    gameRule: '游戏简介\r\n\r\n\（一）三七竞技小游戏，根据三国鼎立，七雄争霸，楚汉相争的历史斗争进行简化，游戏规则简单，操作易上手；\
\r\n（二）所有游戏模块公平、公正、公开，并且不收取任何服务费，特殊功能需消耗军饷才能使用；\
\r\n（三）所有游戏模块最终胜负结果，完全由玩家掌握，考验玩家智力、经验和勇气；\
\r\n（四）游戏中每隔一定时间可领取军粮奖励，军粮只能在‘楚汉相争’中使用，获胜后变成军饷，军饷可用于所有功能；\
\r\n（五）如果游戏中发现功能性问题，体验性问题可微信搜一搜官方公众号‘' + WXID + '’进行有奖反馈，谢谢您的支持。',

    king3: {
        rule: '（一）历史背景\r\n\
东汉末年，皇帝昏聩无能，宦官专权，朝廷腐败，百姓苦不堪言。乱世之中，一代枭雄与英雄人物竞相涌现。\
经过一系列大战之后，最终逐渐形成了三个相互鼎立的政权，分别是魏、蜀、吴。之后它们相互制衡，鼎足之势维持了四十余年。\r\n\r\n\
（二）游戏规则\r\n\
蜀克魏，吴克蜀，魏克吴。举例：\r\n\
（1）红方选择 魏 出战，绿方选择 蜀 出战，由于蜀克魏，则绿方胜\r\n\
（2）红方选择 吴 出战，绿方选择 吴 出战，双方相同，则为和局，不分胜负\r\n\r\n\
游戏不收取任何服务费；每轮游戏开始会预扣约定出战军饷，和局会归还预扣军饷；如果在规定时间内未出战，则系统会随机选择出战；\
如果玩家损失达到每日最大损失限额则当日无法继续游戏；如果由于服务器问题导致结算失败则系统会退还出战军饷，其他情况一律不予处理。\r\n\r\n\
本条款同意后才能进行游戏，并不再显示。可点击右上角菜单->规则再次查看。娱乐游戏，切勿沉迷。',
    },

    power7: {
        rule: '（一）历史背景\r\n\
周王朝日渐势，礼崩乐坏，无法再号召众诸侯。春秋末年，天下风云变幻，在经历了各诸侯国无数次兼并战争，\
到战国时期，只剩下实力强盛的七个诸侯国，分别为齐、楚、燕、韩、赵、魏、秦，这就是所谓的战国七雄。七雄争霸，一统天下。\r\n\r\n\
（二）游戏规则\r\n\
游戏共七个玩家，分别扮演七个诸侯国，兵多联盟被灭，兵少入侵被灭，唯有兵力适中才能长久生存。玩家使用军饷代表出兵，最终出兵最大和最小者被淘汰，其他玩家继续游戏。\
当各玩家出兵金额不能分出大，中，小，则无效处理。每轮最多三场，当玩家数不足三名则结束本轮重启下轮。举例：\r\n\
首场七个玩家分别出兵：1、2、3、3、4、6、6，出1与6者被淘汰。其他4位玩家继续进行下一场并可获得奖励军饷：(1 + 2 + 3 + 3 + 4 + 6 + 6) / (2 + 3 + 3 + 4) * 出兵金额。\r\n\r\n\
游戏不收取任何服务费；每场游戏开始会预扣最低出兵军饷，玩家可在此基础上添加，无效会归还预扣军饷；如果玩家损失达到每日最大损失限额则当日无法继续游戏；\
如果由于服务器问题导致结算失败则系统会退还出兵军饷，其他情况一律不予处理。\r\n\r\n\
本条款同意后才能进行游戏，并不再显示。可点击右上角菜单->规则再次查看。娱乐游戏，切勿沉迷。',
    },

    impawn: {
        rule: '（一）历史背景\r\n\
公元前206年，一场博弈在27岁的项羽和51岁的刘邦之间展开。之后四年里，所向披靡的项羽与老谋深算的刘邦，\
都经历了那些斗争？一切未知的变数，尽在“楚汉相争”之中。玩家可以向楚军或汉军投放粮饷，最终根据以下规则判定胜负。\r\n\r\n\
（二）游戏规则\r\n\
游戏根据楚汉双方所投粮饷总额的十万位相加所得个位数判定胜负，个位数<=2则楚胜，个位数>=3则汉胜。举例：\r\n\
（1）楚：323000；汉：1912000，楚十万位3 + 汉十万位9 = 12，结果个位数2 <= 2，则楚胜\r\n\
（2）楚：1712000；汉：623000，楚十万位7 + 汉十万位6 = 13，结果个位数3 >= 3，则汉胜\r\n\
（3）楚：12000；汉：41530000，楚小于十万取最高位1 + 汉十万位5 = 6，结果个位数6 >= 3，则汉胜\r\n\r\n\
游戏不收取任何服务费，奖励倍率精确到百分位；如果有一方粮饷总额为0则无效处理并归还所投粮饷；\
如果玩家损失达到每日最大损失限额则当日无法继续游戏；如果由于服务器问题导致结算失败则系统会退还所投粮饷，其他情况一律不予处理。\r\n\r\n\
本条款同意后才能进行游戏，并不再显示。可点击右上角菜单->规则再次查看。娱乐游戏，切勿沉迷。',
    }
};

module.exports = config;