const UIClient = require('./network/UIClient');
window.g_connclient = new UIClient();
window.g_gateclient = new UIClient();

window.g_msgbox = require('./public/MsgBox');
window.g_floattip = require('./public/FloatTip');
window.g_handler = require('./handler/Handler');
window.g_uiemitter = require('./public/UIEmitter');
window.g_impawn = require('./public/ImpawnManager');
window.g_player = require('./public/PlayerManager');
window.g_power7 = require('./public/Power7Manager');
window.g_king3 = require('./public/King3Manager');
window.g_head = require('./public/HeadManager');

const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');
const MSG_KICK_LBCL = require('./protocol/MSG_KICK_LBCL')['MSG_KICK_LBCL'];
const MSG_LOGIN_DBCL = require('./protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_DISTRIBUTE_GTCL = require('./protocol/MSG_DISTRIBUTE_GTCL')['MSG_DISTRIBUTE_GTCL'];
const MSG_IMPAWN_LOGIN_CNCL = require('./protocol/MSG_IMPAWN_LOGIN_CNCL')['MSG_IMPAWN_LOGIN_CNCL'];
const MSG_IMPAWN_BET_FAIL_IMCL = require('./protocol/MSG_IMPAWN_BET_FAIL_IMCL')['MSG_IMPAWN_BET_FAIL_IMCL'];
const MSG_KING3_LOGIN_KGCL = require('./protocol/MSG_KING3_LOGIN_KGCL')['MSG_KING3_LOGIN_KGCL'];
const MSG_KING3_PLAYOBJECT_KGCL = require('./protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];
const MSG_KING3_PREPARE_FAIL_KGCL = require('./protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const MSG_POWER7_LOGIN_PWCL = require('./protocol/MSG_POWER7_LOGIN_PWCL')['MSG_POWER7_LOGIN_PWCL'];
const MSG_POWER7_PLAYOBJECT_PWCL = require('./protocol/MSG_POWER7_PLAYOBJECT_PWCL')['MSG_POWER7_PLAYOBJECT_PWCL'];
const MSG_POWER7_PREPARE_FAIL_PWCL = require('./protocol/MSG_POWER7_PREPARE_FAIL_PWCL')['MSG_POWER7_PREPARE_FAIL_PWCL'];
const MSG_SEND_MAIL_LBCL = require('./protocol/MSG_SEND_MAIL_LBCL')['MSG_SEND_MAIL_LBCL'];

function OnDisconnect(name) {
    let tips = name + '与服务器链接断开，请关闭游戏重新打开';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
    this.UpdateLocation(null);
}

function OnServerDistributeFail(msg) {
    let tips = '服务器分配失败，请稍后重试';
    if (msg.result === MSG_DISTRIBUTE_GTCL.Result.NO_SERVER) {
        tips = '服务器未准备好，' + tips;
        if (msg.explain.length > 0) tips = tips + '\r\n' + msg.explain;
    } else if (msg.result === MSG_DISTRIBUTE_GTCL.Result.FULL_PLAYER) {
        tips = '服务器人数已满，' + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnWXLoginFail(errMsg) {
    let tips = '微信登录验证错误：' + errMsg + '，请稍后重试';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnKick(msg) {
    let tips = '服务器强制提下线';
    if (msg.reason === MSG_KICK_LBCL.Reason.OTHER_LOGIN) {
        tips = '您账号在其他地方登录，' + tips;
    } else if (msg.reason === MSG_KICK_LBCL.Reason.GM_KICK) {
        if (msg.timeSec === 1024) {
            cc.sys.localStorage.setItem(config.itemName.register, 0);
            return;
        } else {
            tips = '与服务器链接断开，请关闭游戏重进';
            let nowTimestamp = new Date().getTime();
            let loginTimestamp = nowTimestamp + msg.timeSec * 1000;
            cc.sys.localStorage.setItem(config.itemName.kickTime, loginTimestamp);
        }
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
    this.UpdateLocation(null);
}

function OnRefund(msg) {
    let gameName = '';
    if (msg.type === common.Location.KING3) {
        gameName = '三国鼎立';
    } else if (msg.type === common.Location.POWER7) {
        gameName = '七雄争霸';
    } else if (msg.type === common.Location.IMPAWN) {
        gameName = '楚汉相争';
    }

    let tips = gameName + '有一笔失效预扣：';
    if (msg.coin > 0) tips = tips + utility.SplitStr(msg.coin) + '军饷';
    if (msg.coin > 0 && msg.subcoin > 0) tips += ' + ';
    if (msg.subcoin > 0) tips = tips + utility.SplitStr(msg.subcoin) + '军粮';
    tips = tips + '，请重新登录查收。最终以右上角菜单->记录中数据为准';

    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnLoginResult(msg) {
    if (msg.result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.LOBBY);
        let awardTips = config.registerAward;
        let selfCoin = g_player.GetProp(common.PropID.SUBCOIN);
        let tips = awardTips.replace('%s', utility.SplitStr(selfCoin));
        let loginTime = msg.pi.loginTime, logoutTime = msg.pi.logoutTime;
        if (loginTime === logoutTime && loginTime === '1970-01-01 00:00:00') {
            g_msgbox.Show(null, tips, g_msgbox.MB_OK, null, { height: 310 });
        }
        if (utility.IsWeinXinPlatform()) {
            wx.showShareMenu({ withShareTicket: true });
        }
        return;
    }
    let tips = '登录失败';
    if (msg.result === MSG_LOGIN_DBCL.Result.ACCOUNT_NOEXIST) {
        tips = '账号不存在，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.PASSWORD_ERROR) {
        tips = '密码错误，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.PARAM_ERROR) {
        tips = '登录消息不规范，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ACCOUNT_FROZEN) {
        tips = '账号已被冻结，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.REDIS_GET_ERROR) {
        tips = '本地数据库出错，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.MARIADB_QUERY_ERROR) {
        tips = '远程数据库出错，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.LOBBY_NO_CONNECT) {
        tips = '游戏大厅未启动，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.TICKET_ERROR) {
        tips = '登录票据错误，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.OVER_PLAYER) {
        tips = '在线人数已满，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ADD_PLAYER_ERROR) {
        tips = '添加玩家信息失败，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.ALREADY_LOGIN) {
        tips = '此账号已经登录，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_UNKNOW_ERROR) {
        tips = '微信验证未知错误，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_SYSTEM_BUSY) {
        tips = '微信验证系统繁忙，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_CODE_INVALID) {
        tips = '微信验证返回无效CODE，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_LOGIN_TOOMUCH) {
        tips = '微信验证登录频繁，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_URL_GET_ERROR) {
        tips = '微信验证服务链接不上，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_PARSE_FAIL) {
        tips = '微信验证返回数据解析失败，' + tips;
    } else if (msg.result === MSG_LOGIN_DBCL.Result.WX_DATA_ERROR) {
        tips = '微信验证返回数据有误，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnImpawnLogin(msg) {
    if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.IMPAWN);
        return;
    }
    let tips = '进入楚汉相争失败';
    if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.result === MSG_IMPAWN_LOGIN_CNCL.Result.OFFLINE) {
        tips = '楚汉相争未开启，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnImpawnBetFail(msg) {
    let tips = '楚汉相争第' + msg.round + '轮投放粮饷失败。您向';
    tips += msg.isChu ? '楚军投放的' : '汉军投放的';
    if (msg.coinSum > 0) tips = tips + utility.SplitStr(msg.coinSum) + '军饷';
    if (msg.coinSum > 0 && msg.subcoinSum > 0) tips += '和';
    if (msg.subcoinSum > 0) tips = tips + utility.SplitStr(msg.subcoinSum) + '军粮';
    tips += '已归还到您账户中，请仔细查看';
    if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.OFFLINE) {
        tips = '楚汉相争未开启，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_LOGIN) {
        tips = '未进入楚汉相争，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.PARAM_ERROR) {
        tips = '投放消息数据有误，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.REDIS_ERROR) {
        tips = '数据库操作出错，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.COIN_NOT_ENOUGH) {
        tips = '粮饷不足，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.WRITE_REDIS_FAIL) {
        tips = '数据库写入失败，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.NO_STARTING) {
        tips = '新一轮还未开始，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.ROUND_ERROR) {
        tips = '轮次错误，' + tips;
    } else if (msg.reason === MSG_IMPAWN_BET_FAIL_IMCL.Reason.OVER_MAX_LOSS) {
        tips = '您今日损失已达到最大限额，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnImpawnSettlement(msg) {
    let headJS = this.node.getChildByName('Head').getComponent('Head');
    if (headJS.GetNowLocation() === common.Location.IMPAWN) {
        let betSum = '', title = '';
        if (msg.coinSum > 0) betSum = betSum + utility.SplitStr(msg.coinSum) + '军饷';
        if (msg.coinSum > 0 && msg.subcoinSum > 0) betSum = betSum + ' + ';
        if (msg.subcoinSum > 0) betSum = betSum + utility.SplitStr(msg.subcoinSum) + '军粮';
        let tips = '投入: ' + betSum + '\r\n';
        if (msg.gainCoin >= 0) {
            tips = tips + '获得: ' + utility.SplitStr(msg.gainCoin) + '军饷';
            title = (msg.gainCoin === 0) ? 'loss' : 'win';
        } else if (-msg.gainCoin === msg.coinSum + msg.subcoinSum) {
            tips = tips + '退还: ' + betSum;
            title = 'draw';
        } else {
            tips = 'error settlement msg';
        }
        g_floattip.Show(title, tips, { countdownMSTime: 5000 });
        return;
    }

    let betObject = '您向' + (msg.isChu ? '楚军投放的\r\n' : '汉军投放的\r\n');
    if (msg.coinSum > 0) betObject = betObject + utility.SplitStr(msg.coinSum) + '军饷\r\n';
    if (msg.subcoinSum > 0) betObject = betObject + utility.SplitStr(msg.subcoinSum) + '军粮\r\n';

    let tips = '楚汉相争第' + msg.round + '轮\r\n';
    if (msg.gainCoin > 0) {
        tips = '==获胜==\r\n' + tips + betObject + '大获全胜，获得' + utility.SplitStr(msg.gainCoin) + '军饷奖励';
    } else if (-msg.gainCoin === msg.coinSum + msg.subcoinSum) {
        tips = '==无效==\r\n' + tips + betObject + '无敌敢战，粮饷已归还到您的账户中';
    } else if (msg.gainCoin === 0) {
        tips = '==败北==\r\n' + tips + betObject + '全军覆没，下轮再接再厉';
    } else {
        tips = 'error settlement msg';
    }

    g_msgbox.Show(null, tips, g_msgbox.MB_OK, null, {
        height: 300, countdownMSTime: 7000,
        countdownBtnType: g_msgbox.MB_OK
    });
}

function OnKing3Login(msg) {
    if (msg.result === MSG_KING3_LOGIN_KGCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.KING3);
        return;
    }

    let tips = '进入三国鼎立失败';
    if (msg.rid > 0) tips = '进入三国鼎立' + msg.rid + '号房失败';

    if (msg.result === MSG_KING3_LOGIN_KGCL.Result.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.OTHER_UNLOCK) {
        tips = '其他玩家抢先一步解锁房间，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.UNLOCK_COST_ERROR) {
        tips = '解锁费用不正确，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.NOT_READY) {
        tips = '游戏还未准备好，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.PARAM_ERROR) {
        tips = '参数错误，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.ROOM_FULL) {
        tips = '房间已分配完，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.REDIS_ERROR) {
        tips = '本地数据库出错，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.COIN_NOT_ENOUGH) {
        tips = '您军饷不足，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.PASSWORD_ERROR) {
        tips = '房间密码错误，' + tips;
    } else if (msg.result === MSG_KING3_LOGIN_KGCL.Result.FULL_PLAYER) {
        tips = '房间已满员，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }

    if (msg.cost > 0) {
        let cost = utility.SplitStr(msg.cost);
        tips = tips + '，解锁花费的' + cost + '军饷已归还到您账号上';
    }

    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnKing3PlayObject(msg) {
    if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.SUCCESS) return;

    let tips = '三国鼎立' + msg.rid + '号房第' + msg.round + '轮出战失败';
    if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.NO_STARTING) {
        tips = '游戏还未准备好，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.OBJECT_ERROR) {
        tips = '出战对象错误，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.NO_PLAYER) {
        tips = '您不是游戏玩家，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.NO_THIS_ROOM) {
        tips = '房间不存在，' + tips;
    } else if (msg.result === MSG_KING3_PLAYOBJECT_KGCL.Result.ROUND_ERROR) {
        tips = '轮次错误，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnKing3PrepareFail(msg) {
    let tips = '三国鼎立' + msg.rid + '号房准备失败';
    if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.OTHER_PREPARE) {
        tips = '其他玩家已抢先一步准备，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.REDIS_ERROR) {
        tips = '本地数据库获取信息失败，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.REDIS_NO_PI) {
        tips = '未获取到您的登录信息，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.NO_THIS_ROOM) {
        tips = '房间不存在，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.NO_PREPARE_STATE) {
        tips = '游戏还未结束，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.LACK_COIN) {
        tips = '您的军饷不足，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.OVER_MAX_LOSS) {
        tips = '您今日损失已超出最大限额，' + tips;
    } else if (msg.reason === MSG_KING3_PREPARE_FAIL_KGCL.Reason.SERVER_NO_READY) {
        tips = '服务器未准备完全，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.reason + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnKing3Settlement(msg) {
    let headJS = this.node.getChildByName('Head').getComponent('Head');
    if (headJS.GetNowLocation() === common.Location.KING3 && g_king3.GetRID() === msg.rid) {
        let title = '';
        let tips = '出战: ' + utility.SplitStr(msg.costCoin) + '军饷\r\n';
        if (msg.gainCoin === msg.costCoin * 2 || msg.gainCoin === 0) {
            tips = tips + '获得: ' + utility.SplitStr(msg.gainCoin) + '军饷';
            title = (msg.gainCoin === 0) ? 'loss' : 'win';
        } else if (msg.gainCoin === msg.costCoin) {
            tips = tips + '退还: ' + utility.SplitStr(msg.costCoin) + '军饷';
            title = 'draw';
        } else {
            tips = 'error settlement msg';
        }
        g_floattip.Show(title, tips, { countdownMSTime: 5000 });
        return;
    }

    let tips = '三国鼎立' + msg.rid + '号房第' + msg.round + '轮\r\n';
    tips = tips + '出战花费的' + utility.SplitStr(msg.costCoin) + '军饷\r\n';
    if (msg.gainCoin === msg.costCoin * 2) {
        tips = '==获胜==\r\n' + tips + '大获全胜，获得' + utility.SplitStr(msg.gainCoin) + '军饷奖励';
    } else if (msg.gainCoin === msg.costCoin) {
        tips = '==平局==\r\n' + tips + '两败俱伤，退还' + utility.SplitStr(msg.gainCoin) + '军饷';
    } else if (msg.gainCoin === 0) {
        tips = '==败北==\r\n' + tips + '全军覆没，下轮再接再厉';
    } else {
        tips = 'error settlement msg';
    }

    g_msgbox.Show(null, tips, g_msgbox.MB_OK, null, {
        height: 300, countdownMSTime: 7000,
        countdownBtnType: g_msgbox.MB_OK
    });
}

function OnKing3Withhold(msg) {
    if (msg.success) return;

    let headJS = this.node.getChildByName('Head').getComponent('Head');
    if (headJS.GetNowLocation() === common.Location.KING3) headJS.BackLocation();

    let tips = '三国鼎立' + msg.rid + '号房第' + msg.round + '轮预扣失败，数据有误，请重新登录纠正';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnPower7Login(msg) {
    if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.SUCCESS) {
        this.UpdateLocation(common.Location.POWER7);
        return;
    }

    let tips = '进入七雄争霸失败';
    if (msg.rid > 0) tips = '进入七雄争霸' + msg.rid + '号房失败';

    if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.OTHER_UNLOCK) {
        tips = '其他玩家抢先一步解锁房间，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.UNLOCK_COST_ERROR) {
        tips = '解锁费用不正确，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.NOT_READY) {
        tips = '游戏还未准备好，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.PARAM_ERROR) {
        tips = '参数错误，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.ROOM_FULL) {
        tips = '房间已分配完，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.REDIS_ERROR) {
        tips = '本地数据库出错，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.COIN_NOT_ENOUGH) {
        tips = '您军饷不足，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.PASSWORD_ERROR) {
        tips = '房间密码错误，' + tips;
    } else if (msg.result === MSG_POWER7_LOGIN_PWCL.Result.FULL_PLAYER) {
        tips = '房间已满员，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }

    if (msg.cost > 0) {
        let cost = utility.SplitStr(msg.cost);
        tips = tips + '，解锁花费的' + cost + '军饷已归还到您账号上';
    }

    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnPower7PlayObject(msg) {
    if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.SUCCESS) return;

    let tips = '七雄争霸' + msg.rid + '号房第' + msg.round + '轮出兵失败';
    if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.NO_STARTING) {
        tips = '游戏还未准备好，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.NO_PLAYER) {
        tips = '您不是游戏玩家，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.NO_THIS_ROOM) {
        tips = '房间不存在，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.ROUND_ERROR) {
        tips = '轮次错误，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.SESSION_ERROR) {
        tips = '场次错误，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.BET_COIN_ERROR) {
        tips = '金额错误，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.REDIS_ERROR) {
        tips = '本地数据库出错，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.LACK_COIN) {
        tips = '您的军饷不足，' + tips;
    } else if (msg.result === MSG_POWER7_PLAYOBJECT_PWCL.Result.WITHHOLD_ERROR) {
        tips = '预扣数据出错，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.result + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnPower7PrepareFail(msg) {
    let tips = '七雄争霸' + msg.rid + '号房准备失败';
    if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.NO_CLIENT_INFO) {
        tips = '未找到登录信息，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.OFFLINE) {
        tips = '游戏还未开启，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.OTHER_PREPARE) {
        tips = '其他玩家已抢先一步准备，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.REDIS_ERROR) {
        tips = '本地数据库获取信息失败，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.REDIS_NO_PI) {
        tips = '未获取到您的登录信息，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.NO_THIS_ROOM) {
        tips = '房间不存在，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.NO_PREPARE_STATE) {
        tips = '游戏还未结束，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.LACK_COIN) {
        tips = '您的军饷不足，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.OVER_MAX_LOSS) {
        tips = '您今日损失已超出最大限额，' + tips;
    } else if (msg.reason === MSG_POWER7_PREPARE_FAIL_PWCL.Reason.SERVER_NO_READY) {
        tips = '服务器未准备完全，' + tips;
    } else {
        tips = '未知错误CODE: ' + msg.reason + tips;
    }
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnPower7Settlement(msg) {
    let headJS = this.node.getChildByName('Head').getComponent('Head');
    if (headJS.GetNowLocation() === common.Location.POWER7 && g_power7.GetRID() === msg.rid) {
        let title = '';
        let tips = '出兵: ' + utility.SplitStr(msg.costCoin) + '军饷\r\n';
        if (msg.gainCoin > msg.costCoin || msg.gainCoin === 0) {
            tips = tips + '获得: ' + utility.SplitStr(msg.gainCoin) + '军饷';
            title = (msg.gainCoin === 0) ? 'loss' : 'win';
        } else if (msg.gainCoin === msg.costCoin) {
            tips = tips + '退还: ' + utility.SplitStr(msg.costCoin) + '军饷';
            title = 'draw';
        } else {
            tips = 'error settlement msg';
        }
        g_floattip.Show(title, tips, { countdownMSTime: 5000 });
        return;
    }

    let tips = '七雄争霸' + msg.rid + '号房第' + msg.round + '轮' + msg.session + '场\r\n';
    tips = tips + '出兵花费的' + utility.SplitStr(msg.costCoin) + '军饷\r\n';
    if (msg.gainCoin > msg.costCoin) {
        tips = '==获胜==\r\n' + tips + '大获全胜，获得' + utility.SplitStr(msg.gainCoin) + '军饷奖励';
        if (!msg.gameOver) tips = tips + '，游戏未结束，预扣下场军饷' + utility.SplitStr(constant.POWER7_MIN_BETCOIN);
    } else if (msg.gainCoin === msg.costCoin) {
        tips = '==无效==\r\n' + tips + '不分胜负，退还' + utility.SplitStr(msg.gainCoin) + '军饷';
        if (!msg.gameOver) tips = tips + '，游戏未结束，预扣下场军饷' + utility.SplitStr(constant.POWER7_MIN_BETCOIN);
    } else if (msg.gainCoin === 0) {
        tips = '==败北==\r\n' + tips + '全军覆没，下轮再接再厉';
    } else {
        tips = 'error settlement msg';
    }

    g_msgbox.Show(null, tips, g_msgbox.MB_OK, null, {
        height: 300, countdownMSTime: 7000,
        countdownBtnType: g_msgbox.MB_OK
    });
}

function OnPower7Withhold(msg) {
    if (msg.success) return;

    let headJS = this.node.getChildByName('Head').getComponent('Head');
    if (headJS.GetNowLocation() === common.Location.POWER7) headJS.BackLocation();

    let tips = '七雄争霸' + msg.rid + '号房第' + msg.round + '轮预扣失败，数据有误，请重新登录纠正';
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnSendMail(msg) {
    if (msg.recvPID !== g_player.GetPID()) return;
    if (msg.result !== MSG_SEND_MAIL_LBCL.Result.SUCCESS) return;

    let giftSum = '';
    if (msg.giftCoin > 0) {
        giftSum = '红包金额：' + utility.SplitStr(msg.giftCoin) + '军饷\r\n\r\n';
    }
    let tips = '【新信件】\r\n\r\n发送者：' + msg.sendName + '\r\n\r\n' + giftSum + msg.content;

    if (msg.giftCoin <= 0) {
        if (!this.mailBlackPlayers) this.mailBlackPlayers = new Array();
        for (let i = 0; i < this.mailBlackPlayers.length; ++i) {
            if (this.mailBlackPlayers[i] === msg.sendPID) return;
        }
    }

    let options = { height: 320 };
    options[g_msgbox.BT_NO] = '临时拉黑';
    options[g_msgbox.BT_YES] = '关闭';
    options[g_msgbox.BT_CANCEL] = '回复';
    g_msgbox.Show(null, tips, g_msgbox.MB_YESNOCANCEL, function (result) {
        if (result === g_msgbox.BT_CANCEL) {
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(msg.sendName);
        } else if (result === g_msgbox.BT_NO) {
            this.mailBlackPlayers.push(msg.sendPID);
        }
    }.bind(this), options);
}

cc.Class({
    extends: cc.Component,

    start() {
        window.g_game = this;

        g_handler.Init();
        g_uiemitter.Init();
        g_connclient.Init('CNC');
        g_gateclient.Init('GTC');

        g_uiemitter.on('UI_REFUND', OnRefund.bind(this));
        g_uiemitter.on('UI_SEND_MAIL', OnSendMail.bind(this));

        g_uiemitter.on('UI_KICK', OnKick.bind(this));
        g_uiemitter.on('UI_DISCONNECT', OnDisconnect.bind(this));
        g_uiemitter.on('UI_WXLOGIN_FAIL', OnWXLoginFail.bind(this));
        g_uiemitter.on('UI_LOGIN_RESULT', OnLoginResult.bind(this));
        g_uiemitter.on('UI_DISTRIBUTE_FAIL', OnServerDistributeFail.bind(this));

        g_uiemitter.on('UI_IMPAWN_LOGIN', OnImpawnLogin.bind(this));
        g_uiemitter.on('UI_IMPAWN_BET_FAIL', OnImpawnBetFail.bind(this));
        g_uiemitter.on('UI_IMPAWN_SETTLEMENT', OnImpawnSettlement.bind(this));

        g_uiemitter.on('UI_KING3_LOGIN', OnKing3Login.bind(this));
        g_uiemitter.on('UI_KING3_PREPARE_FAIL', OnKing3PrepareFail.bind(this));
        g_uiemitter.on('UI_KING3_PLAYOBJECT', OnKing3PlayObject.bind(this));
        g_uiemitter.on('UI_KING3_SETTLEMENT', OnKing3Settlement.bind(this));
        g_uiemitter.on('UI_KING3_WITHHOLD', OnKing3Withhold.bind(this));

        g_uiemitter.on('UI_POWER7_LOGIN', OnPower7Login.bind(this));
        g_uiemitter.on('UI_POWER7_PREPARE_FAIL', OnPower7PrepareFail.bind(this));
        g_uiemitter.on('UI_POWER7_PLAYOBJECT', OnPower7PlayObject.bind(this));
        g_uiemitter.on('UI_POWER7_SETTLEMENT', OnPower7Settlement.bind(this));
        g_uiemitter.on('UI_POWER7_WITHHOLD', OnPower7Withhold.bind(this));

        this.node.getChildByName('Mail').active = false;
        this.node.getChildByName('Menu').active = false;
        this.node.getChildByName('Shop').active = false;
        this.node.getChildByName('Admin').active = false;
        this.node.getChildByName('Share').active = false;
        this.node.getChildByName('Unlock').active = false;
        this.node.getChildByName('Service').active = false;
        this.node.getChildByName('Record').active = false;
        this.node.getChildByName('Register').active = false;
        this.node.getChildByName('RoomList').active = false;
        this.node.getChildByName('Password').active = false;
        this.node.getChildByName('AlterName').active = false;

        this.UpdateLocation(null);
    },

    UpdateLocation(location) {
        let headNode = this.node.getChildByName('Head');
        let headJS = headNode.getComponent('Head');
        headJS.UpdateLocation(location);
    },
});
