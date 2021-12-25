const utility = require('./public/Utility');

const LIST_SHOW_ITEM_COUNT = 12; // 楚汉押分列表显示条数

function GetImpawnInfo(isChu, pos) {
    let indexCount = 0, gameInfo = g_impawn.GetGameInfo();
    for (let i = 0, len = gameInfo.impawnList.length; i < len; ++i) {
        let impawn = gameInfo.impawnList[i];
        if (isChu === impawn.isChu) {
            if (indexCount === pos) return impawn;
            indexCount++;
        }
    }
}

function UpdateInfo(node, nickname, coinSum) {
    node.getChildByName('Nickname').getComponent(cc.Label).string = nickname;
    let labelCoinSum = node.getChildByName('CoinSum').getComponent(cc.Label);
    labelCoinSum.string = utility.SplitStr(coinSum);
    if (g_impawn.IsStarting() && labelCoinSum.string.length >= 7) {
        let arrNum = labelCoinSum.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        labelCoinSum.string = arrNum.join('');
    }
}

function UpdateList() {
    let chuItemIndex = 0, hanItemIndex = 0;
    let gameInfo = g_impawn.GetGameInfo();
    for (let i = 0, len = gameInfo.impawnList.length; i < len; ++i) {
        let impawn = gameInfo.impawnList[i];
        let title = impawn.isChu ? 'Chu' : 'Han';
        let index = impawn.isChu ? ++chuItemIndex : ++hanItemIndex;
        let node = cc.find(title + '/Mask/' + index, this.node);
        if (node) UpdateInfo.call(this, node, impawn.nickname, impawn.betSum);
    }
    for (let i = chuItemIndex + 1; i <= LIST_SHOW_ITEM_COUNT; ++i) {
        let node = cc.find('Chu/Mask/' + i, this.node);
        UpdateInfo.call(this, node, '', '');
    }
    for (let i = hanItemIndex + 1; i <= LIST_SHOW_ITEM_COUNT; ++i) {
        let node = cc.find('Han/Mask/' + i, this.node);
        UpdateInfo.call(this, node, '', '');
    }
}

function InitList() {
    let nodeChuList = cc.find('Chu/Mask', this.node);
    let nodeHanList = cc.find('Han/Mask', this.node);
    let nodeRankList = this.node.getChildByName('Rank');
    for (let i = 0; i < LIST_SHOW_ITEM_COUNT; ++i) {
        let nodeName = String(i + 1);
        let nodeChuItem = cc.instantiate(this.chuItemPrefab);
        let nodeHanItem = cc.instantiate(this.hanItemPrefab);
        nodeChuList.addChild(nodeChuItem, 1, nodeName);
        nodeHanList.addChild(nodeHanItem, 1, nodeName);

        let nodeRank = cc.instantiate(this.rankPrefab);
        let spriteRank = nodeRank.getComponent(cc.Sprite);
        spriteRank.spriteFrame = this.rankSprite[Math.min(i, 3)];
        let nodeNum = nodeRank.getChildByName('Num');
        nodeNum.getComponent(cc.Label).string = nodeName;
        nodeRankList.addChild(nodeRank, 1, nodeName);

        nodeChuItem.on(cc.Node.EventType.TOUCH_END, function () {
            let impawn = GetImpawnInfo(true, i);
            if (!impawn) return;
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(impawn.nickname);
        }, this);
        nodeHanItem.on(cc.Node.EventType.TOUCH_END, function () {
            let impawn = GetImpawnInfo(false, i);
            if (!impawn) return;
            let nodeMail = cc.find('Canvas').getChildByName('Mail');
            nodeMail.getComponent('Mail').Show(impawn.nickname);
        }, this);
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        rankPrefab: {
            default: null,
            type: cc.Prefab,
        },
        chuItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        hanItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        rankSprite: {
            default: [],
            type: cc.SpriteFrame
        },
    },

    start() {
        InitList.call(this);
        UpdateList.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateList.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            UpdateList.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateList.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_NEW_BET', function () {
            UpdateList.call(this);
        }.bind(this));
    },
});
