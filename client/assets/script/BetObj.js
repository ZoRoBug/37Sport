const common = require('./protocol/Common');

function DisplayGameTime() {
    let gameState = g_impawn.GetGameState();
    let display = (gameState.state === common.ImpawnState.PAUSE);
    let nodeGameTime = this.node.getChildByName('GameTime');
    nodeGameTime.active = display;
    if (!display) return;

    let gameInfo = g_impawn.GetGameInfo();
    let restartHour = String(gameInfo.restartHour);
    if (gameInfo.restartHour < 10) restartHour = '0' + restartHour;
    let pauseHour = String(gameInfo.pauseHour);
    if (gameInfo.pauseHour < 10) pauseHour = '0' + pauseHour;

    let gameTime = '游戏重开：' + restartHour + ':00 - ';
    gameTime = gameTime + '游戏结束：' + pauseHour + ':00';
    nodeGameTime.getComponent(cc.Label).string = gameTime;
}

function DisplayResult() {
    let gameState = g_impawn.GetGameState();
    let display = (gameState.state === common.ImpawnState.WAIT_START ||
        gameState.state === common.ImpawnState.WAIT_END ||
        gameState.state === common.ImpawnState.SETTLEMENT);
    let nodeGameResult = this.node.getChildByName('GameResult');
    nodeGameResult.active = display;
    if (!display) return;

    let gameInfo = g_impawn.GetGameInfo();
    let strChuImpawnTotal = String(gameInfo.chuImpawnTotal);
    let chu10wan = Number(strChuImpawnTotal.slice(-6, -5));
    let strChu10wan = '楚十万位' + chu10wan;
    if (strChuImpawnTotal.length < 6) {
        chu10wan = Number(strChuImpawnTotal.slice(0, 1));
        strChu10wan = '楚最高位' + chu10wan;
    }

    let strHanImpawnTotal = String(gameInfo.hanImpawnTotal);
    let han10wan = Number(strHanImpawnTotal.slice(-6, -5));
    let strHan10wan = '汉十万位' + han10wan;
    if (strHanImpawnTotal.length < 6) {
        han10wan = Number(strHanImpawnTotal.slice(0, 1));
        strHan10wan = '汉最高位' + han10wan;
    }

    let strAddSum = String(Number(chu10wan) + Number(han10wan));
    let strResult = strAddSum.slice(-1);
    strResult += (Number(strResult) <= 2 ? '<=2，楚胜' : '>=3，汉胜');

    let gameResult = strChu10wan + ' + ' + strHan10wan + ' = ' + strAddSum;
    gameResult = gameResult + '，' + strAddSum + '个位数为' + strResult;
    if (gameInfo.chuImpawnTotal === 0 || gameInfo.hanImpawnTotal === 0) {
        gameResult = '有一方金额为0，无效处理';
    }

    nodeGameResult.getComponent(cc.Label).string = gameResult;
}

function UpdateCountdown(txt) {
    let nodeCountdown = this.node.getChildByName('Countdown');
    nodeCountdown.getComponent(cc.Label).string = txt;
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
        let gameState = g_impawn.GetGameState();
        let remainTime = gameState.remainTime - diffTime;
        remainTime = Math.max(remainTime, 0) / 1000;
        UpdateCountdown.call(this, Math.floor(remainTime));
    }.bind(this), 300);
}

function OnImpawnGameState() {
    let gameState = g_impawn.GetGameState();
    let nodeRound = cc.find('Round/Label', this.node);
    nodeRound.getComponent(cc.Label).string = '第' + gameState.round + '轮';
    if (gameState.state === common.ImpawnState.WAIT_START) {
        UpdateCountdown.call(this, '等开始');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.STARTING) {
        UpdateCountdown.call(this, Math.floor(gameState.remainTime / 1000));
        this.startTimestamp = new Date().getTime();
        OpenCountdownTimer.call(this, true);
    } else if (gameState.state === common.ImpawnState.WAIT_END) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.SETTLEMENT) {
        UpdateCountdown.call(this, '结算中');
        OpenCountdownTimer.call(this, false);
    } else if (gameState.state === common.ImpawnState.PAUSE) {
        UpdateCountdown.call(this, '暂停中');
        OpenCountdownTimer.call(this, false);
    } else {
        UpdateCountdown.call(this, '状态' + String(gameState.state));
        OpenCountdownTimer.call(this, false);
    }

    DisplayResult.call(this);
    DisplayGameTime.call(this);
}

cc.Class({
    extends: cc.Component,

    start() {
        OnImpawnGameState.call(this);
        g_uiemitter.on('UI_IMPAWN_LOGOUT', function () {
            OnImpawnGameState.call(this);
        }.bind(this));
        g_uiemitter.on('UI_IMPAWN_GAMESTATE', function () {
            OnImpawnGameState.call(this);
        }.bind(this));
    },
});
