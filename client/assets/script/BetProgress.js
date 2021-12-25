function UpdateProgress() {
    let gameInfo = g_impawn.GetGameInfo();
    let total = gameInfo.chuImpawnTotal + gameInfo.hanImpawnTotal;
    let chuRate = (total > 0) ? gameInfo.chuImpawnTotal / total : 0.5;
    let chuPercent = Math.floor(chuRate * 100);

    let chuNode = cc.find('Bar/Chu', this.node);
    let chuWidget = chuNode.getComponent(cc.Widget);
    chuWidget.right = 1 - chuRate;
    chuWidget.updateAlignment();

    let chuRateNode = cc.find('ChuRate/Rate', this.node);
    let chuRateLabel = chuRateNode.getComponent(cc.Label);
    chuRateLabel.string = chuPercent + '%';

    let hanRateNode = cc.find('HanRate/Rate', this.node);
    let hanRateLabel = hanRateNode.getComponent(cc.Label);
    hanRateLabel.string = (100 - chuPercent) + '%';
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdateProgress.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            UpdateProgress.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMEINFO', function () {
            UpdateProgress.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            UpdateProgress.call(this);
        }.bind(this));
    },
});
