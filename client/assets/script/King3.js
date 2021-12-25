const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');

function UpdatePlayerInfo() {
    let nameP1Head = 'PlayerInfo/Player1/Head';
    let nodeP1Head = cc.find(nameP1Head, this.node);
    let spriteP1Head = nodeP1Head.getComponent(cc.Sprite);

    let nameP2Head = 'PlayerInfo/Player2/Head';
    let nodeP2Head = cc.find(nameP2Head, this.node);
    let spriteP2Head = nodeP2Head.getComponent(cc.Sprite);

    let nameP1Nickname = 'PlayerInfo/Player1/Nickname';
    let nodeP1Nickname = cc.find(nameP1Nickname, this.node);
    let labelP1Nickname = nodeP1Nickname.getComponent(cc.Label);

    let nameP2Nickname = 'PlayerInfo/Player2/Nickname';
    let nodeP2Nickname = cc.find(nameP2Nickname, this.node);
    let labelP2Nickname = nodeP2Nickname.getComponent(cc.Label);

    let gameInfo = g_king3.GetGameInfo();
    let p1Exist = (gameInfo.pid1 > 0), p2Exist = (gameInfo.pid2 > 0);

    labelP1Nickname.string = p1Exist ? gameInfo.p1Nickname : '--';
    labelP2Nickname.string = p2Exist ? gameInfo.p2Nickname : '--';

    spriteP1Head.spriteFrame = this.headSprite;
    if (p1Exist) {
        g_head.Load(g_head.To64(gameInfo.p1Head), function (spriteFrame) {
            spriteP1Head.spriteFrame = spriteFrame || this.headSprite;
        });
    }
    spriteP2Head.spriteFrame = this.headSprite;
    if (p2Exist) {
        g_head.Load(g_head.To64(gameInfo.p2Head), function (spriteFrame) {
            spriteP2Head.spriteFrame = spriteFrame || this.headSprite;
        });
    }
}

function UpdateRoomInfo() {
    let rid = g_king3.GetRID();
    let roomInfo = rid + '号房';

    let room = g_king3.GetRoom(rid);
    if (room && room.pid > 0) {
        roomInfo = '房主：' + room.nickname + ' - ' + roomInfo;
    }

    let gameState = g_king3.GetGameState();
    if (gameState.round > 0 && !g_king3.IsPrepare()) {
        roomInfo = roomInfo + ' - 第' + gameState.round + '轮';
    }

    let nodeRoomInfo = this.node.getChildByName('RoomInfo');
    nodeRoomInfo.getComponent(cc.Label).string = roomInfo;
}

function UpdateCountdown(txt) {
    let nodeGameState = cc.find('GameInfo/State', this.node);
    nodeGameState.getComponent(cc.Label).string = txt;
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
        let gameState = g_king3.GetGameState();
        let remainTime = gameState.remainTime - diffTime;
        remainTime = Math.max(remainTime, 0) / 1000;
        UpdateCountdown.call(this, Math.floor(remainTime));
    }.bind(this), 300);
}

function UpdateGameInfo() {
    let gameState = g_king3.GetGameState();
    if (gameState.state === common.King3State.PREPARE) {
        UpdateCountdown.call(this, '准备中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.King3State.WAIT_START) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.King3State.WITHHOLD) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.King3State.STARTING) {
        UpdateCountdown.call(this, Math.floor(gameState.remainTime / 1000));
        this.startTimestamp = new Date().getTime();
        OpenCountdownTimer.call(this, true);
    } else if (gameState.state === common.King3State.WAIT_END) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.King3State.SETTLEMENT) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    }
}

function UpdateCostCoin() {
    let gameInfo = g_king3.GetGameInfo();
    let cost = utility.SplitStr(gameInfo.betCoin);
    let betCostTip = '每轮游戏开始需消耗' + cost + '军饷';
    let nodeCostCoin = this.node.getChildByName('CostCoin');
    nodeCostCoin.getComponent(cc.Label).string = betCostTip;
}

function UpdateSelfCoin() {
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let strSelfCoin = '我的军饷：' + utility.SplitStr(selfCoin);
    let coinNode = this.node.getChildByName('SelfCoin');
    coinNode.getComponent(cc.Label).string = strSelfCoin;
}

function UpdateGameBtn() {
    let nodeWuP1 = cc.find('GameBtn/WuP1', this.node);
    let nodeWuP2 = cc.find('GameBtn/WuP2', this.node);
    let nodeShuP1 = cc.find('GameBtn/ShuP1', this.node);
    let nodeShuP2 = cc.find('GameBtn/ShuP2', this.node);
    let nodeWeiP1 = cc.find('GameBtn/WeiP1', this.node);
    let nodeWeiP2 = cc.find('GameBtn/WeiP2', this.node);
    let nodePrepare = cc.find('GameBtn/Prepare', this.node);

    let pid = g_player.GetPID();
    let gameInfo = g_king3.GetGameInfo();

    let isP1 = (gameInfo.pid1 === pid);
    let isP2 = (gameInfo.pid2 === pid);
    nodeWuP1.active = (!g_king3.IsPrepare() && !isP2);
    nodeWuP2.active = (!g_king3.IsPrepare() && isP2);
    nodeShuP1.active = (!g_king3.IsPrepare() && !isP2);
    nodeShuP2.active = (!g_king3.IsPrepare() && isP2);
    nodeWeiP1.active = (!g_king3.IsPrepare() && !isP2);
    nodeWeiP2.active = (!g_king3.IsPrepare() && isP2);
    nodePrepare.active = g_king3.IsPrepare();

    let isEnable = ((isP1 || isP2) && g_king3.IsStarting() && !g_king3.GetObject(pid));
    nodeWuP1.getComponent(cc.Button).interactable = isEnable;
    nodeWuP2.getComponent(cc.Button).interactable = isEnable;
    nodeShuP1.getComponent(cc.Button).interactable = isEnable;
    nodeShuP2.getComponent(cc.Button).interactable = isEnable;
    nodeWeiP1.getComponent(cc.Button).interactable = isEnable;
    nodeWeiP2.getComponent(cc.Button).interactable = isEnable;
    nodePrepare.getComponent(cc.Button).interactable = (!isP1 && !isP2);
}

function UpdateObject() {
    let nodeObjWu = cc.find('GameInfo/ObjWu', this.node);
    let nodeObjShu = cc.find('GameInfo/ObjShu', this.node);
    let nodeObjWei = cc.find('GameInfo/ObjWei', this.node);

    nodeObjWu.active = false;
    nodeObjShu.active = false;
    nodeObjWei.active = false;

    let gameInfo = g_king3.GetGameInfo();
    let p1Obj = g_king3.GetObject(gameInfo.pid1);
    let p2Obj = g_king3.GetObject(gameInfo.pid2);

    let nodeP1 = null;
    if (p1Obj === common.King3Object.WEI) {
        nodeP1 = nodeObjWei;
    } else if (p1Obj === common.King3Object.SHU) {
        nodeP1 = nodeObjShu;
    } else if (p1Obj === common.King3Object.WU) {
        nodeP1 = nodeObjWu;
    }

    let nodeP2 = null;
    if (p2Obj === common.King3Object.WEI) {
        nodeP2 = nodeObjWei;
    } else if (p2Obj === common.King3Object.SHU) {
        nodeP2 = nodeObjShu;
    } else if (p2Obj === common.King3Object.WU) {
        nodeP2 = nodeObjWu;
    }

    if (nodeP1 && nodeP1 === nodeP2) {
        nodeP1.active = true;
        nodeP1.getComponent(cc.Sprite).spriteFrame = this.p1p2Sprite;
    } else {
        if (nodeP1) {
            nodeP1.active = true;
            nodeP1.getComponent(cc.Sprite).spriteFrame = this.p1Sprite;
        }
        if (nodeP2) {
            nodeP2.active = true;
            nodeP2.getComponent(cc.Sprite).spriteFrame = this.p2Sprite;
        }
    }
}

function UpdateInfo() {
    UpdateObject.call(this);
    UpdateGameBtn.call(this);
    UpdateRoomInfo.call(this);
    UpdateCostCoin.call(this);
    UpdatePlayerInfo.call(this);
}

function OnPrepare() {
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let gameInfo = g_king3.GetGameInfo();
    if (selfCoin < gameInfo.betCoin) {
        g_msgbox.ShopMsgBox('您军饷不足，不能准备');
        return;
    }

    let pid = g_player.GetPID();
    let itemName = config.itemName.king3 + pid;
    if (!cc.sys.localStorage.getItem(itemName)) {
        let options = { height: 680 };
        options[g_msgbox.BT_NO] = '拒绝';
        options[g_msgbox.BT_YES] = '同意';
        g_msgbox.Show(null, config.king3.rule, g_msgbox.MB_YESNO, function (result) {
            if (result === g_msgbox.BT_NO) return;
            cc.sys.localStorage.setItem(itemName, true);
            OnPrepare.call(this);
        }.bind(this), options);
        return;
    }

    if (!g_king3.IsPrepare()) {
        g_msgbox.Show(null, '游戏还未结束，请稍等', g_msgbox.MB_OK);
        return;
    }

    if (g_king3.IsPlayer(pid)) {
        g_msgbox.Show(null, '您已经准备', g_msgbox.MB_OK);
        return;
    }

    if (!gameInfo.pid1) {
        gameInfo.pid1 = pid;
    } else if (!gameInfo.pid2) {
        gameInfo.pid2 = pid;
    } else {
        g_msgbox.Show(null, '其他玩家已抢先一步准备', g_msgbox.MB_OK);
        return;
    }

    g_handler.SendKing3PrepareMsg(g_connclient, { rid: g_king3.GetRID() });
    UpdateGameBtn.call(this);
}

function OnPlayObjet(object) {
    let pid = g_player.GetPID();
    if (!g_king3.IsPlayer(pid)) {
        g_msgbox.Show(null, '您不是本房间玩家', g_msgbox.MB_OK);
        return;
    }
    if (!g_king3.IsStarting()) {
        g_msgbox.Show(null, '游戏还未开始，请稍等', g_msgbox.MB_OK);
        return;
    }
    if (g_king3.GetObject(pid)) {
        g_msgbox.Show(null, '您已经出战', g_msgbox.MB_OK);
        return;
    }

    let msg = {
        rid: g_king3.GetRID(), pid: pid, object: object,
        round: g_king3.GetGameState().round
    };
    g_king3.PlayObject(msg);
    g_handler.SendKing3PlayObjectMsg(g_connclient, msg);
    UpdateGameBtn.call(this);
}

cc.Class({
    extends: cc.Component,

    properties: {
        headSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        p1Sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        p2Sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        p1p2Sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    start() {
        UpdateSelfCoin.call(this);
        setInterval(function () {
            UpdateSelfCoin.call(this);
        }.bind(this), 500);

        UpdateInfo.call(this);
        g_uiemitter.on('UI_KING3_LOGOUT', function () {
            UpdateInfo.call(this);
            UpdateGameInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_KING3_GAMEINFO', function () {
            UpdateInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_KING3_GAMESTATE', function () {
            UpdateInfo.call(this);
            UpdateGameInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_KING3_PLAYOBJECT', function () {
            UpdateInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_KING3_PREPARE_FAIL', function () {
            UpdateInfo.call(this);
        }.bind(this));

        cc.find('GameBtn/WuP1', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.WU);
        }, this);
        cc.find('GameBtn/WuP2', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.WU);
        }, this);

        cc.find('GameBtn/ShuP1', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.SHU);
        }, this);
        cc.find('GameBtn/ShuP2', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.SHU);
        }, this);

        cc.find('GameBtn/WeiP1', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.WEI);
        }, this);
        cc.find('GameBtn/WeiP2', this.node).on('click', function () {
            OnPlayObjet.call(this, common.King3Object.WEI);
        }, this);

        cc.find('GameBtn/Prepare', this.node).on('click', function () {
            OnPrepare.call(this);
        }, this);

        let nodePlayer1 = cc.find('PlayerInfo/Player1', this.node);
        nodePlayer1.on(cc.Node.EventType.TOUCH_END, function () {
            let gameInfo = g_king3.GetGameInfo();
            let strP1Name = (gameInfo.pid1 > 0) ? gameInfo.p1Nickname : '';
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(strP1Name);
        }, this);
        let nodePlayer2 = cc.find('PlayerInfo/Player2', this.node);
        nodePlayer2.on(cc.Node.EventType.TOUCH_END, function () {
            let gameInfo = g_king3.GetGameInfo();
            let strP2Name = (gameInfo.pid2 > 0) ? gameInfo.p2Nickname : '';
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(strP2Name);
        }, this);
        let nodeRoomInfo = this.node.getChildByName('RoomInfo');
        nodeRoomInfo.on(cc.Node.EventType.TOUCH_END, function () {
            let rid = g_king3.GetRID();
            let room = g_king3.GetRoom(rid);
            let roomCreator = room ? room.nickname : '';
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(roomCreator);
        }, this);
    },
});
