const BORDER_GAP = 2;
const RECORD_GAP = 4;
const RECORD_SIZE = 20;

function GetRowCount() {
    return Math.floor(this.node.width / (RECORD_SIZE + RECORD_GAP));
}

function GetBorderGap() {
    return (this.node.width % (RECORD_SIZE + RECORD_GAP)) / 2 + BORDER_GAP;
}

function UpdateRecord() {
    InitRecordNode.call(this);
    let gameInfo = g_impawn.GetGameInfo();

    let chuPercent = 50, hanPercent = 50;
    let totalCount = gameInfo.chuWinRecord + gameInfo.hanWinRecord;
    if (totalCount > 0) {
        chuPercent = Math.round(gameInfo.chuWinRecord / totalCount * 100);
        hanPercent = 100 - chuPercent;
    }

    let chuTotalNode = this.node.getChildByName('ChuTotal');
    let chuTotalLabel = chuTotalNode.getComponent(cc.Label);
    chuTotalLabel.string = gameInfo.chuWinRecord + ' ( ' + chuPercent + '% )';

    let hanTotalNode = this.node.getChildByName('HanTotal');
    let hanTotalLabel = hanTotalNode.getComponent(cc.Label);
    hanTotalLabel.string = gameInfo.hanWinRecord + ' ( ' + hanPercent + '% )';

    let rowCount = GetRowCount.call(this);
    let showMaxCount = rowCount * 3;
    let recordLength = gameInfo.recordList.length;
    let startPos = (recordLength > showMaxCount) ? recordLength - showMaxCount : 0;

    let row1Node = cc.find('Detail/Row1', this.node);
    let row2Node = cc.find('Detail/Row2', this.node);
    let row3Node = cc.find('Detail/Row3', this.node);

    for (let i = 0; i < showMaxCount; ++i) {
        let node = null;
        if (Math.floor(i / rowCount) === 0) {
            node = row1Node;
        } else if (Math.floor(i / rowCount) === 1) {
            node = row2Node;
        } else if (Math.floor(i / rowCount) === 2) {
            node = row3Node;
        }
        let spriteNode = node.getChildByName('Sprite' + (i % rowCount));
        let sprite = spriteNode.getComponent(cc.Sprite);
        if (i < recordLength) {
            let isChu = gameInfo.recordList[startPos + i];
            sprite.spriteFrame = isChu ? this.chuSprite : this.hanSprite;
        } else {
            sprite.spriteFrame = this.nullSprite;
        }
    }
}

function InitRecordNode() {
    if (this.node.width === this.oldNodeWidth) return;
    this.oldNodeWidth = this.node.width;

    let row1Node = cc.find('Detail/Row1', this.node);
    let row2Node = cc.find('Detail/Row2', this.node);
    let row3Node = cc.find('Detail/Row3', this.node);
    row1Node.removeAllChildren();
    row2Node.removeAllChildren();
    row3Node.removeAllChildren();

    let borderGap = GetBorderGap.call(this);
    let row1Layout = row1Node.getComponent(cc.Layout);
    let row2Layout = row2Node.getComponent(cc.Layout);
    let row3Layout = row3Node.getComponent(cc.Layout);
    row1Layout.paddingLeft = borderGap;
    row1Layout.paddingRight = borderGap;
    row2Layout.paddingLeft = borderGap;
    row2Layout.paddingRight = borderGap;
    row3Layout.paddingLeft = borderGap;
    row3Layout.paddingRight = borderGap;

    let rowCount = GetRowCount.call(this);
    for (let i = 0; i < rowCount * 3; ++i) {
        let node = new cc.Node('Sprite' + (i % rowCount));
        node.addComponent(cc.Sprite);
        if (Math.floor(i / rowCount) === 0) {
            node.parent = row1Node;
        } else if (Math.floor(i / rowCount) === 1) {
            node.parent = row2Node;
        } else if (Math.floor(i / rowCount) === 2) {
            node.parent = row3Node;
        }
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        chuSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        hanSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        nullSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    start() {
        UpdateRecord.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateRecord.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            UpdateRecord.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateRecord.call(this);
        }.bind(this));
    },
});
