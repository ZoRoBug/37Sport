const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

function UpdateBetBtn() {
    let nodeChuLeft = this.node.getChildByName('ChuLeftBtn');
    let nodeHanLeft = this.node.getChildByName('HanLeftBtn');
    let nodeChuRight = this.node.getChildByName('ChuRightBtn');
    let nodeHanRight = this.node.getChildByName('HanRightBtn');

    let isBetChu = g_impawn.IsBetChu();
    let isStarting = g_impawn.IsStarting();
    let chuBtnAlive = (isBetChu === null || isBetChu) && isStarting;
    let hanBtnAlive = (isBetChu === null || !isBetChu) && isStarting;

    nodeChuLeft.getComponent(cc.Button).interactable = chuBtnAlive;
    nodeHanLeft.getComponent(cc.Button).interactable = hanBtnAlive;
    nodeChuRight.getComponent(cc.Button).interactable = chuBtnAlive;
    nodeHanRight.getComponent(cc.Button).interactable = hanBtnAlive;
}

function UpdateSelfCoin() {
    let coinNode = cc.find('Coin/Sum', this.node);
    let coinLabel = coinNode.getComponent(cc.Label);
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    coinLabel.string = utility.SplitStr(selfCoin - this.betCoinSum);

    let subcoinNode = cc.find('Subcoin/Sum', this.node);
    let subcoinLabel = subcoinNode.getComponent(cc.Label);
    let selfSubcoin = g_player.GetProp(common.PropID.SUBCOIN);
    subcoinLabel.string = utility.SplitStr(selfSubcoin - this.betSubcoinSum);
}

function UpdateBetSum() {
    UpdateSelfCoin.call(this);
    let betSumNode = cc.find('BetSum/Sum', this.node);
    let betSumLabel = betSumNode.getComponent(cc.Label);
    betSumLabel.string = utility.SplitStr(this.betCoinSum + this.betSubcoinSum);
}

function ClearBetSum() {
    this.betCoinSum = 0;
    this.betSubcoinSum = 0;
    UpdateBetSum.call(this);
}

function OnBtnBet(betSum) {
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    let selfSubcoin = g_player.GetProp(common.PropID.SUBCOIN);
    let betTotal = betSum + this.betCoinSum + this.betSubcoinSum;
    betTotal = Math.min(selfCoin + selfSubcoin, betTotal);
    betTotal = betTotal - betTotal % constant.IMPAWN_MIN_BET_SUM;
    betTotal = Math.min(betTotal, constant.IMPAWN_MAX_BET_SUM);
    if (selfSubcoin >= betTotal) {
        this.betCoinSum = 0;
        this.betSubcoinSum = betTotal;
    } else {
        this.betSubcoinSum = selfSubcoin;
        this.betCoinSum = betTotal - selfSubcoin;
    }
    UpdateBetSum.call(this);
}

function Bet(isChu) {
    let isBetChu = g_impawn.IsBetChu();
    let isStarting = g_impawn.IsStarting();
    if (!isStarting || (isBetChu !== null && isBetChu !== isChu)) return;

    if (g_impawn.GetBetTimes() >= constant.IMPAWN_MAX_BET_TIMES) {
        let tip = '每轮投放粮饷次数不能超过' + constant.IMPAWN_MAX_BET_TIMES + '次';
        g_msgbox.Show(null, tip, g_msgbox.MB_OK);
        return;
    }

    if (this.betCoinSum + this.betSubcoinSum <= 0) {
        g_msgbox.ShopMsgBox('投放粮饷金额不能为0');
        return;
    }

    let itemName = config.itemName.impawn + g_player.GetPID();
    if (!cc.sys.localStorage.getItem(itemName)) {
        let options = { height: 730 };
        options[g_msgbox.BT_NO] = '拒绝';
        options[g_msgbox.BT_YES] = '同意';
        g_msgbox.Show(null, config.impawn.rule, g_msgbox.MB_YESNO, function (result) {
            if (result === g_msgbox.BT_NO) return;
            cc.sys.localStorage.setItem(itemName, true);
            Bet.call(this, isChu);
        }.bind(this), options);
        return;
    }

    if (this.betCoinSum > g_player.GetProp(common.PropID.COIN)) {
        g_msgbox.ShopMsgBox('军饷金额不足，投放粮饷失败');
        return;
    }
    if (this.betSubcoinSum > g_player.GetProp(common.PropID.SUBCOIN)) {
        g_msgbox.ShopMsgBox('军粮金额不足，投放粮饷失败');
        return;
    }

    g_player.SetProp(common.PropID.COIN, -this.betCoinSum);
    g_player.SetProp(common.PropID.SUBCOIN, -this.betSubcoinSum);

    let gameState = g_impawn.GetGameState();
    g_handler.SendImpawnBetMsg(g_connclient, {
        isChu: isChu, round: gameState.round,
        coinSum: this.betCoinSum, subcoinSum: this.betSubcoinSum
    });

    let gameInfo = g_impawn.GetGameInfo();
    isChu ? gameInfo.playerChuImpawnTimes++ : gameInfo.playerHanImpawnTimes++;
    this.betCoinSum = 0, this.betSubcoinSum = 0;
    UpdateBetSum.call(this);
    UpdateBetBtn.call(this);
}

cc.Class({
    extends: cc.Component,

    start() {
        ClearBetSum.call(this);
        UpdateSelfCoin.call(this);
        setInterval(function () {
            UpdateSelfCoin.call(this);
        }.bind(this), 500);

        UpdateBetBtn.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            ClearBetSum.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function (msg) {
            UpdateBetBtn.call(this);
            if (msg.state === common.ImpawnState.WAIT_START) ClearBetSum.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_BET_FAIL', function (msg) {
            let gameState = g_impawn.GetGameState();
            if (msg.round !== gameState.round) return;
            let gameInfo = g_impawn.GetGameInfo();
            msg.isChu ? gameInfo.playerChuImpawnTimes-- : gameInfo.playerHanImpawnTimes--;
            UpdateBetBtn.call(this);
        }.bind(this));

        this.node.getChildByName('1QBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 1000);
        }, this);
        this.node.getChildByName('1WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 10000);
        }, this);
        this.node.getChildByName('10WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 100000);
        }, this);
        this.node.getChildByName('100WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 1000000);
        }, this);
        this.node.getChildByName('1000WBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 10000000);
        }, this);
        this.node.getChildByName('1YBtn').on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnBet.call(this, 100000000);
        }, this);

        this.node.getChildByName('ClearLeftBtn').on(cc.Node.EventType.TOUCH_END, function () {
            ClearBetSum.call(this);
        }, this);
        this.node.getChildByName('ClearRightBtn').on(cc.Node.EventType.TOUCH_END, function () {
            ClearBetSum.call(this);
        }, this);

        this.node.getChildByName('ChuLeftBtn').on('click', function () {
            Bet.call(this, true);
        }, this);
        this.node.getChildByName('ChuRightBtn').on('click', function () {
            Bet.call(this, true);
        }, this);
        this.node.getChildByName('HanLeftBtn').on('click', function () {
            Bet.call(this, false);
        }, this);
        this.node.getChildByName('HanRightBtn').on('click', function () {
            Bet.call(this, false);
        }, this);
    },
});
