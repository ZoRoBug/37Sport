const utility = require('./public/Utility');

function UpdateBetInfo() {
    let gameInfo = g_impawn.GetGameInfo();
    
    let chuSumNode = this.node.getChildByName('ChuSum');
    let chuSumLabel = chuSumNode.getComponent(cc.Label);
    chuSumLabel.string = utility.SplitStr(gameInfo.chuImpawnTotal);
    if (g_impawn.IsStarting() && chuSumLabel.string.length >= 7) {
        let arrNum = chuSumLabel.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        chuSumLabel.string = arrNum.join('');
    }

    let hanSumNode = this.node.getChildByName('HanSum');
    let hanSumLabel = hanSumNode.getComponent(cc.Label);
    hanSumLabel.string = utility.SplitStr(gameInfo.hanImpawnTotal);
    if (g_impawn.IsStarting() && hanSumLabel.string.length >= 7) {
        let arrNum = hanSumLabel.string.split('');
        if (arrNum.length >= 7) arrNum[arrNum.length - 7] = '*';
        hanSumLabel.string = arrNum.join('');
    }

    let chuRateNode = this.node.getChildByName('ChuRate');
    let chuRateLabel = chuRateNode.getComponent(cc.Label);
    let chuAwardRate = gameInfo.chuAwardRate / 100;
    chuRateLabel.string = chuAwardRate.toFixed(2);

    let hanRateNode = this.node.getChildByName('HanRate');
    let hanRateLabel = hanRateNode.getComponent(cc.Label);
    let hanAwardRate = gameInfo.hanAwardRate / 100;
    hanRateLabel.string = hanAwardRate.toFixed(2);

    let chuSelfNode = this.node.getChildByName('ChuSelf');
    let chuSelfLabel = chuSelfNode.getComponent(cc.Label);
    chuSelfLabel.string = utility.SplitStr(gameInfo.playerChuImpawnTotal);

    let hanSelfNode = this.node.getChildByName('HanSelf');
    let hanSelfLabel = hanSelfNode.getComponent(cc.Label);
    hanSelfLabel.string = utility.SplitStr(gameInfo.playerHanImpawnTotal);
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdateBetInfo.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateBetInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            UpdateBetInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateBetInfo.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_NEW_BET', function () {
            UpdateBetInfo.call(this);
        }.bind(this));
    },
});
