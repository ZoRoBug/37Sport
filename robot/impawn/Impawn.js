"use strict";
const config = require('./Config');
const order = require('../../public/Order');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');

function ResetData(client) {
    let player = this.playerList.get(client);
    if (!player) return;
    if (player.impawnList && player.impawnList.length > 0) {
        g_log.Error('1结算未清空押分数据%s', JSON.stringify(player));
    }
    if (player.chuImpawnTimes || player.hanImpawnTimes) {
        g_log.Error('2结算未清空押分数据%s', JSON.stringify(player));
    }
    if (player.chuImpawnTotal || player.hanImpawnTotal) {
        g_log.Error('3结算未清空押分数据%s', JSON.stringify(player));
    }
    player.impawnList = [];
    player.chuImpawnTimes = 0;
    player.hanImpawnTimes = 0;
    player.chuImpawnTotal = 0;
    player.hanImpawnTotal = 0;
    player.chuAwardRate = 100;
    player.hanAwardRate = 100;
    player.remainTime = 0;
}

function CreatePlayer(pid, nickname) {
    return {
        pid: pid, nickname: nickname,
        chuImpawnTimes: 0, hanImpawnTimes: 0,
        chuImpawnTotal: 0, hanImpawnTotal: 0,
        impawnList: [], loginSuccess: false,
        chuAwardRate: 100, hanAwardRate: 100,
        remainTime: 0
    }
}

const impawn = {
    Init: function () {
        this.playerList = new Map();

        setInterval(function () {
            for (let player of this.playerList.values()) {
                player.remainTime -= config.impawn.betGapTime;
            }
            this.Bet();
        }.bind(this), config.impawn.betGapTime);


        order.Register('inim', '开始登入楚汉', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogin = setInterval(function () {
                let loginList = g_login.GetLoginList();
                if (this.playerList.size === loginList.size) {
                    if (this.loginComplete) return;
                    g_log.Info('共%s个玩家全部进入楚汉', this.playerList.size);
                    this.loginComplete = true;
                    return;
                }
                this.loginComplete = false;
                for (let [client, loginInfo] of loginList) {
                    if (!loginInfo.pi) continue;
                    if (this.playerList.has(client)) continue;
                    g_handler.SendImpawnLoginMsg(client);
                    let player = CreatePlayer(loginInfo.pi.pid, loginInfo.pi.nickname);
                    this.playerList.set(client, player);
                    break;
                }
            }.bind(this), config.impawn.loginTime);
        }.bind(this));

        order.Register('sinim', '停止登录楚汉', function () {
            clearInterval(this.timerLogin);
        }.bind(this));

        order.Register('outim', '开始登出楚汉', function () {
            clearInterval(this.timerLogin);
            clearInterval(this.timerLogout);
            this.timerLogout = setInterval(function () {
                if (this.playerList.size === 0) {
                    g_log.Info('所有玩家已退出楚汉');
                    clearInterval(this.timerLogout);
                    return;
                }
                for (let client of this.playerList.keys()) {
                    this.Logout(client);
                    break;
                }
            }.bind(this), config.impawn.logoutTime);
        }.bind(this));

        order.Register('soutim', '停止登出楚汉', function () {
            clearInterval(this.timerLogout);
        }.bind(this));

        order.Register('im', '开始押分', function () {
            this.canImpawn = true;
        }.bind(this));

        order.Register('sim', '停止押分', function () {
            this.canImpawn = false;
        }.bind(this));
    },

    Uninit: function () {
    },

    Login: function (client, success) {
        let player = this.playerList.get(client);
        if (!player) return;

        if (success) {
            player.loginSuccess = true;
        } else {
            this.playerList.delete(client);
        }
    },

    Logout: function (client) {
        let player = this.playerList.get(client);
        if (!player) return;

        g_handler.SendImpawnLogoutMsg(client);

        if (player.impawnList.length > 0) {
            g_log.Warn('有未结算押分%s', JSON.stringify(player.impawnList));
        }

        this.playerList.delete(client);
        g_log.Info('%s玩家已退出楚汉', player.nickname);
    },

    SetGameState: function (client, info) {
        if (info.state === common.ImpawnState.STARTING) {
            ResetData.call(this, client);
        }
        let player = this.playerList.get(client);
        if (player) {
            player.state = info.state;
            player.round = info.round;
            if (info.remainTime) player.remainTime = info.remainTime;
        } else {
            g_log.Error('SetGameState无链接信息');
        }
    },

    SetGameInfo: function (client, info) {
        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('SetGameInfo无链接信息');
            return;
        }
        player.chuAwardRate = info.chuAwardRate;
        player.hanAwardRate = info.hanAwardRate;
        if (info.pid === player.pid) {
            player.chuImpawnTimes = info.playerChuImpawnTimes;
            player.hanImpawnTimes = info.playerHanImpawnTimes;
            player.chuImpawnTotal = info.playerChuImpawnTotal;
            player.hanImpawnTotal = info.playerHanImpawnTotal;
        }
    },

    AddNewBet: function (client, info) {
        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('添加押分信息玩家列表链接不存在');
            return;
        }
        if (player.pid != info.pid && player.nickname != info.nickname) return;

        if (player.round != info.round) {
            g_log.Error('%s新押分信息轮次不对%s != %s', player.nickname, player.round, info.round);
            return;
        }

        if (info.isChu) {
            player.chuImpawnTotal += info.betSum;
        } else {
            player.hanImpawnTotal += info.betSum;
        }

        let i = 0;
        for (; i < player.impawnList.length; ++i) {
            let impawn = player.impawnList[i];
            if (impawn.betSum < info.betSum) break;
        }
        player.impawnList.splice(i, 0, info);
    },

    BetFail: function (client, info) {
        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分失败登录列表链接不存在');
            client.Close();
            return;
        }

        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('押分失败押分列表链接不存在');
            return;
        }

        if (player.round != info.round) {
            g_log.Error('%s押分失败轮次不对%s != %s', player.nickname, player.round, info.round);
            return;
        }

        if (info.isChu) {
            player.chuImpawnTimes--;
        } else {
            player.hanImpawnTimes--;
        }
        loginInfo.pi[common.PropID.COIN] += info.coinSum;
        loginInfo.pi[common.PropID.SUBCOIN] += info.subcoinSum;
    },

    Settlement: function (client, info) {
        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分结算登录列表链接不存在');
            client.Close();
            return;
        }

        let player = this.playerList.get(client);
        if (!player) {
            g_log.Error('押分结算押分列表链接不存在');
            return;
        }

        if (player.round != info.round) {
            g_log.Error('%s押分结算轮次不对%s != %s', player.nickname, player.round, info.round);
            return;
        }

        let betSum = info.coinSum + info.subcoinSum;
        if (player.impawnList.length > 0) {
            let impawn = player.impawnList[0];
            impawn.gainCoin = info.gainCoin;
            if (info.gainCoin > 0) {
                impawn.awardRate = impawn.isChu ? player.chuAwardRate : player.hanAwardRate;
                impawn.gainCoin = impawn.betSum * impawn.awardRate / 100;
            }
            if (impawn.betSum != betSum || impawn.isChu != info.isChu || impawn.gainCoin != info.gainCoin) {
                console.dir(impawn);
                g_log.Error('结算信息有错误：\r\n%s\r\n%s', JSON.stringify(impawn), JSON.stringify(info));
            }
            player.impawnList.shift();
        }

        if (info.isChu) {
            player.chuImpawnTimes--;
            player.chuImpawnTotal -= betSum;
        } else {
            player.hanImpawnTimes--;
            player.hanImpawnTotal -= betSum;
        }

        if (-info.gainCoin == betSum) {
            loginInfo.pi[common.PropID.COIN] += info.coinSum;
            loginInfo.pi[common.PropID.SUBCOIN] += info.subcoinSum;
        } else if (info.gainCoin > 0) {
            loginInfo.pi[common.PropID.COIN] += info.gainCoin;
        } else if (info.gainCoin != 0) {
            g_log.Error('无效的结算信息%s', JSON.stringify(info));
        }
    },

    Bet: function () {
        if (!this.canImpawn) return;
        if (Math.randomnum(1, 10000) > 10000 * config.impawn.betRate) return;

        let loopTimes = 0;
        let client = null, player = null;
        let clientList = [...this.playerList.keys()];
        while (++loopTimes < 10) {
            let random = Math.randomnum(0, clientList.length - 1);
            player = this.playerList.get(clientList[random]);
            if (!player) continue;
            let betCount = player.chuImpawnTimes + player.hanImpawnTimes;
            if (betCount < config.impawn.betCount && betCount < constant.IMPAWN_MAX_BET_TIMES) {
                client = clientList[random];
                break;
            }
        }
        if (client === null || player === null) return;
        if (player.state !== common.ImpawnState.STARTING || !player.loginSuccess) return;
        if (player.remainTime > config.impawn.maxBetTime || player.remainTime < config.impawn.minBetTime) return;

        let isChu = true;
        if (config.impawn.betChuRate === 0) {
            isChu = false;
        } else if (config.impawn.betChuRate > 0 && config.impawn.betChuRate < 1) {
            isChu = (Math.randomnum(1, 10000) <= 10000 * config.impawn.betChuRate);
        }
        if (player.chuImpawnTimes > 0) isChu = true;
        if (player.hanImpawnTimes > 0) isChu = false;

        let loginInfo = g_login.GetLoginInfo(client);
        if (!loginInfo) {
            g_log.Error('押分预扣时玩家%s信息不存在', player.pid);
            client.Close();
            return;
        }

        let betSum = Math.randomnum(config.impawn.betMin, config.impawn.betMax);
        betSum = betSum - betSum % config.impawn.betMin;
        if (Math.randomnum(1, 10000) < 10000 * config.impawn.tailRate) {
            betSum = betSum + Math.randomnum(1, 9) * 100000;
        }
        if (betSum < constant.IMPAWN_MIN_BET_SUM || betSum > constant.IMPAWN_MAX_BET_SUM) return;

        let subcoinSum = 0, coinSum = 0;
        if (loginInfo.pi[common.PropID.SUBCOIN] >= betSum) {
            subcoinSum = betSum;
        } else {
            subcoinSum = loginInfo.pi[common.PropID.SUBCOIN];
            coinSum = betSum - subcoinSum;
        }
        if (loginInfo.pi[common.PropID.COIN] < coinSum) {
            let totalCoin = loginInfo.pi[common.PropID.COIN] + loginInfo.pi[common.PropID.SUBCOIN];
            g_log.Warn('玩家%s押分失败，粮饷还有%s', loginInfo.pi.nickname, totalCoin);
            return;
        }

        if (isChu) {
            player.chuImpawnTimes++;
        } else {
            player.hanImpawnTimes++;
        }

        loginInfo.pi[common.PropID.COIN] -= coinSum;
        loginInfo.pi[common.PropID.SUBCOIN] -= subcoinSum;

        g_handler.SendImpawnBetMsg(client, {
            isChu: isChu, round: player.round,
            coinSum: coinSum, subcoinSum: subcoinSum,
        });
    },
};

module.exports = impawn;