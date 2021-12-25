const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

// 操作出兵按钮金额
const betCoinList = [10000, 100000, 1000000, 10000000, 100000000, 1000000000];

function UpdateSelfCoin() {
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let strSelfCoin = '我的军饷：' + utility.SplitStr(selfCoin - this.betCoinSum);
    let coinNode = cc.find('GameOper/Coin/Sum', this.node);
    coinNode.getComponent(cc.Label).string = strSelfCoin;
}

function UpdateBetSum() {
    UpdateSelfCoin.call(this);
    let nodeBetSum = cc.find('GameOper/BetBtn/BetSum/Sum', this.node);
    nodeBetSum.getComponent(cc.Label).string = utility.SplitStr(this.betCoinSum);
}

function ClearAllData() {
    this.betCoinSum = 0;
    UpdateBetSum.call(this);
}

function UpdatePlayerInfo() {
    let gameInfo = g_power7.GetGameInfo();
    for (let i = 0; i < gameInfo.playerList.length; ++i) {
        let player = gameInfo.playerList[i];

        let nameNickname = 'PlayerList/Player' + i + '/Nickname';
        let nodeNickname = cc.find(nameNickname, this.node);
        let labelNickname = nodeNickname.getComponent(cc.Label);
        labelNickname.string = (player.pid > 0) ? player.nickname : '--';
        nodeNickname.active = (player.pid !== g_player.GetPID());

        let nameSelfNickname = 'PlayerList/Player' + i + '/SelfNickname';
        let nodeSelfNickname = cc.find(nameSelfNickname, this.node);
        let labelSelfNickname = nodeSelfNickname.getComponent(cc.Label);
        labelSelfNickname.string = (player.pid > 0) ? player.nickname : '--';
        nodeSelfNickname.active = (player.pid === g_player.GetPID());

        let nameHead = 'PlayerList/Player' + i + '/HeadMask/Head';
        let nodeHead = cc.find(nameHead, this.node);
        let spriteHead = nodeHead.getComponent(cc.Sprite);
        spriteHead.spriteFrame = this.headSprite;
        if (player.pid > 0) {
            g_head.Load(g_head.To46(player.head), function (spriteFrame) {
                spriteHead.spriteFrame = spriteFrame || this.headSprite;
            });
        }
    }
}

function UpdateObject() {
    let gameInfo = g_power7.GetGameInfo();
    let gameState = g_power7.GetGameState();
    for (let i = 0; i < gameState.playerList.length; ++i) {
        let isOut = gameState.playerList[i].isOut;
        let betCoin = gameState.playerList[i].betCoin;
        let hasPlayer = (gameInfo.playerList[i].pid > 0);
        let isSelf = (g_player.GetPID() === gameInfo.playerList[i].pid);

        let nodeCountry = cc.find('PlayerList/Player' + i + '/Country', this.node);
        let spriteCountry = nodeCountry.getComponent(cc.Sprite);
        spriteCountry.spriteFrame = isOut ? this.countryGraySprite[i] : this.countrySprite[i];

        let nodeProgress = cc.find('PlayerList/Player' + i + '/Progress', this.node);
        let progressBar = nodeProgress.getComponent(cc.ProgressBar);
        progressBar.progress = 0;
        if ((isSelf || !g_power7.IsStarting()) && betCoin > 0) {
            progressBar.progress = betCoin / gameInfo.maxBetCoin;
        }

        let nodeBetCoin = cc.find('PlayerList/Player' + i + '/BetCoin', this.node);
        let labelBetCoin = nodeBetCoin.getComponent(cc.Label);
        if (isOut) {
            labelBetCoin.string = '已经败北';
        } else if (g_power7.IsPrepare()) {
            labelBetCoin.string = hasPlayer ? '等待游戏开始' : '等待玩家准备';
        } else if (isSelf || !g_power7.IsStarting()) {
            labelBetCoin.string = '出兵军饷：' + utility.SplitStr(betCoin);
        } else {
            labelBetCoin.string = '正在出兵...';
        }
    }
}

function UpdateRoomInfo() {
    let rid = g_power7.GetRID();
    let roomInfo = rid + '号房';

    let room = g_power7.GetRoom(rid);
    if (room && room.pid > 0) {
        roomInfo = '房主：' + room.nickname + ' - ' + roomInfo;
    }

    let gameState = g_power7.GetGameState();
    if (gameState.round > 0 && !g_power7.IsPrepare()) {
        roomInfo = roomInfo + ' - 第' + gameState.round + '轮';
        let strSessionList = ['前场', '中场', '后场'];
        roomInfo += strSessionList[gameState.session - 1];
    }

    let nodeRoomInfo = this.node.getChildByName('RoomInfo');
    nodeRoomInfo.getComponent(cc.Label).string = roomInfo;
}

function UpdateCountdown(txt) {
    let nodeGameInfo = cc.find('GameInfo', this.node);
    nodeGameInfo.getComponent(cc.Label).string = txt;
}

function OpenCountdownTimer(open) {
    if (!open) {
        clearInterval(this.timerCountdown);
        this.timerCountdown = null;
        return;
    }
    if (this.timerCountdown) return;
    this.timerCountdown = setInterval(function () {
        let nowTimestamp = new Date().getTime();
        let diffTime = nowTimestamp - this.startTimestamp;
        let gameState = g_power7.GetGameState();
        let remainTime = gameState.remainTime - diffTime;
        remainTime = Math.max(remainTime, 0) / 1000;
        UpdateCountdown.call(this, Math.floor(remainTime));
    }.bind(this), 300);
}

function UpdateGameInfo() {
    let gameState = g_power7.GetGameState();
    if (gameState.state === common.Power7State.PREPARE) {
        UpdateCountdown.call(this, '准备中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.Power7State.WAIT_START) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.Power7State.WITHHOLD) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.Power7State.STARTING) {
        UpdateCountdown.call(this, Math.floor(gameState.remainTime / 1000));
        this.startTimestamp = new Date().getTime();
        OpenCountdownTimer.call(this, true);
    } else if (gameState.state === common.Power7State.WAIT_END) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.Power7State.SETTLEMENT) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else {
        UpdateCountdown.call(this, '状态' + String(gameState.state));
        OpenCountdownTimer.call(this, false);
    }
}

function UpdateMaxBetCoin() {
    let gameInfo = g_power7.GetGameInfo();
    let minBetCoin = utility.SplitStr(constant.POWER7_MIN_BETCOIN);
    let maxBetCoin = utility.SplitStr(gameInfo.maxBetCoin);
    let strMaxBetCoin = minBetCoin + '<=出兵总军饷<=' + maxBetCoin;
    let nodeMaxBetCoin = this.node.getChildByName('MaxBetCoin');
    nodeMaxBetCoin.getComponent(cc.Label).string = strMaxBetCoin;
}

function UpdateGameBtn() {
    let nodeBetArea = cc.find('GameOper/BetBtn', this.node);
    let nodePrepare = cc.find('GameOper/PrepareBtn', this.node);
    let nodeBetLeft = cc.find('GameOper/BetBtn/BetLeftBtn', this.node);
    let nodeBetRight = cc.find('GameOper/BetBtn/BetRightBtn', this.node);

    nodePrepare.active = g_power7.IsPrepare();
    nodeBetArea.active = (!g_power7.IsPrepare());

    let isPlayer = g_power7.GetPlayerInfo(g_player.GetPID());
    let playerState = g_power7.GetPlayerState(g_player.GetPID());
    let isEnable = (isPlayer && g_power7.IsStarting() && !playerState.isOut);
    nodeBetLeft.getComponent(cc.Button).interactable = isEnable;
    nodeBetRight.getComponent(cc.Button).interactable = isEnable;
    nodePrepare.getComponent(cc.Button).interactable = !isPlayer;
}

function UpdateInfo() {
    UpdateObject.call(this);
    UpdateGameBtn.call(this);
    UpdateRoomInfo.call(this);
    UpdateMaxBetCoin.call(this);
    UpdatePlayerInfo.call(this);
}

function OnPrepare() {
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    if (selfCoin < constant.POWER7_MIN_BETCOIN) {
        g_msgbox.ShopMsgBox('您军饷不足，不能准备');
        return;
    }

    let pid = g_player.GetPID();
    let itemName = config.itemName.power7 + pid;
    if (!cc.sys.localStorage.getItem(itemName)) {
        let options = { height: 770 };
        options[g_msgbox.BT_NO] = '拒绝';
        options[g_msgbox.BT_YES] = '同意';
        g_msgbox.Show(null, config.power7.rule, g_msgbox.MB_YESNO, function (result) {
            if (result === g_msgbox.BT_NO) return;
            cc.sys.localStorage.setItem(itemName, true);
            OnPrepare.call(this);
        }.bind(this), options);
        return;
    }

    if (!g_power7.IsPrepare()) {
        g_msgbox.Show(null, '游戏还未结束，请稍等', g_msgbox.MB_OK);
        return;
    }

    if (g_power7.GetPlayerInfo(pid)) {
        g_msgbox.Show(null, '您已经准备', g_msgbox.MB_OK);
        return;
    }

    if (g_power7.IsFull()) {
        g_msgbox.Show(null, '已经满员了', g_msgbox.MB_OK);
        return;
    }

    g_power7.AddPlayer(pid);
    UpdateGameBtn.call(this);
    g_handler.SendPower7PrepareMsg(g_connclient, { rid: g_power7.GetRID() });
}

function OnPlayObjet() {
    if (!g_power7.IsStarting()) {
        g_msgbox.Show(null, '游戏还未开始，请稍等', g_msgbox.MB_OK);
        return;
    }

    let pid = g_player.GetPID();
    if (!g_power7.GetPlayerInfo(pid)) {
        g_msgbox.Show(null, '您不是本房间玩家', g_msgbox.MB_OK);
        return;
    }

    let minBetCoin = constant.POWER7_MIN_BETCOIN;
    if (this.betCoinSum < minBetCoin) {
        g_msgbox.Show(null, '出兵军饷不能小于' + minBetCoin, g_msgbox.MB_OK);
        return;
    }

    let gameInfo = g_power7.GetGameInfo();
    let playerState = g_power7.GetPlayerState(pid);
    if (this.betCoinSum + playerState.betCoin > gameInfo.maxBetCoin) {
        g_msgbox.Show(null, '已超出最大出兵军饷限额', g_msgbox.MB_OK);
        return;
    }

    if (g_player.GetProp(common.PropID.COIN) < this.betCoinSum) {
        g_msgbox.ShopMsgBox('您的军饷不足');
        return;
    }
    g_player.SetProp(common.PropID.COIN, -this.betCoinSum);

    let gameState = g_power7.GetGameState();
    g_handler.SendPower7PlayObjectMsg(g_connclient, {
        rid: g_power7.GetRID(), round: gameState.round,
        session: gameState.session, betCoin: this.betCoinSum
    });
    this.betCoinSum = 0;
    UpdateBetSum.call(this);
}

function OnBtnBet(betSum) {
    let betTotal = betSum + this.betCoinSum;
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    betTotal = Math.min(selfCoin, betTotal);
    this.betCoinSum = betTotal - betTotal % betCoinList[0];
    UpdateBetSum.call(this);
}

cc.Class({
    extends: cc.Component,

    properties: {
        headSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        countrySprite: {
            default: [],
            type: cc.SpriteFrame
        },
        countryGraySprite: {
            default: [],
            type: cc.SpriteFrame
        },
    },

    start() {
        ClearAllData.call(this);
        UpdateSelfCoin.call(this);
        setInterval(function () {
            UpdateSelfCoin.call(this);
        }.bind(this), 500);

        UpdateInfo.call(this);
        g_uiemitter.on('UI_POWER7_LOGOUT', function () {
            ClearAllData.call(this);
            UpdateInfo.call(this);
            UpdateGameInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_POWER7_GAMEINFO', function () {
            UpdateInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_POWER7_GAMESTATE', function () {
            UpdateInfo.call(this);
            UpdateGameInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_POWER7_PLAYOBJECT', function () {
            UpdateInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_POWER7_PREPARE_FAIL', function () {
            UpdateInfo.call(this);
        }.bind(this));

        cc.find('GameOper/PrepareBtn', this.node).on('click', function () {
            OnPrepare.call(this);
        }, this);

        cc.find('GameOper/BetBtn/BetLeftBtn', this.node).on('click', function () {
            OnPlayObjet.call(this);
        }, this);
        cc.find('GameOper/BetBtn/BetRightBtn', this.node).on('click', function () {
            OnPlayObjet.call(this);
        }, this);

        let nodeClearLeft = cc.find('GameOper/BetBtn/ClearLeftBtn', this.node);
        nodeClearLeft.on(cc.Node.EventType.TOUCH_END, function () {
            ClearAllData.call(this);
        }, this);
        let nodeClearRight = cc.find('GameOper/BetBtn/ClearRightBtn', this.node);
        nodeClearRight.on(cc.Node.EventType.TOUCH_END, function () {
            ClearAllData.call(this);
        }, this);

        for (let i = 0; i < 6; ++i) {
            let nodeBtn = cc.find('GameOper/BetBtn/' + i + 'Btn', this.node);
            nodeBtn.on(cc.Node.EventType.TOUCH_END, function () {
                OnBtnBet.call(this, betCoinList[i]);
            }, this);
        }

        let nodeRoomInfo = this.node.getChildByName('RoomInfo');
        nodeRoomInfo.on(cc.Node.EventType.TOUCH_END, function () {
            let rid = g_power7.GetRID();
            let room = g_power7.GetRoom(rid);
            let roomCreator = room ? room.nickname : '';
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(roomCreator);
        }, this);

        for (let i = 0; i < constant.POWER7_PLAYER_COUNT; ++i) {
            let nodeName = 'PlayerList/Player' + i + '/PlayerBg';
            let nodePlayer = cc.find(nodeName, this.node);
            nodePlayer.on(cc.Node.EventType.TOUCH_END, function () {
                let gameInfo = g_power7.GetGameInfo();
                if (i >= gameInfo.playerList.length) return;
                let player = gameInfo.playerList[i];
                let nickname = (player.pid > 0) ? player.nickname : '';
                let nodeMail = cc.find('Canvas').getChildByName('Mail');
                nodeMail.getComponent('Mail').Show(nickname);
            }, this);
        }
    },
});
