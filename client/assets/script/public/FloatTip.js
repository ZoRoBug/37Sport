// --------------------------------------------------------
// FloatTip浮动提示
// --------------------------------------------------------
// options = {
//      countdownMSTime(倒计时按钮毫秒，如10000，默认3000), 
// }
// --------------------------------------------------------
"use strict";

let nodeFloattipList = new Array();

const FLOATTIP_HEIGHT = 80; // 浮动提示高度

function Relayout() {
    let nodeRoot = cc.find('Canvas');
    let nodeFloattipBox = nodeRoot.getChildByName('FloatTipBox');
    let nodeCount = nodeFloattipList.length;
    nodeFloattipBox.active = (nodeCount > 0);
    if (nodeCount === 0) return;

    let height = nodeFloattipBox.height;
    let maxShowCount = Math.floor(height / FLOATTIP_HEIGHT);
    let showCount = Math.min(nodeCount, maxShowCount);
    let gapSize = (height - showCount * FLOATTIP_HEIGHT);

    for (let i = 0; i < showCount; ++i) {
        let y = (height - gapSize - FLOATTIP_HEIGHT) / 2 - FLOATTIP_HEIGHT * i;
        nodeFloattipList[i].setPosition(0, y);
        nodeFloattipList[i].active = true;
    }
    for (let i = showCount; i < nodeCount; ++i) {
        nodeFloattipList[i].active = false;
    }
}

function DestrySelf(floattip) {
    if (cc.isValid(floattip)) floattip.destroy();
    for (let i = 0, len = nodeFloattipList.length; i < len; ++i) {
        if (nodeFloattipList[i] !== floattip) continue;
        nodeFloattipList.splice(i, 1);
        break;
    }
    Relayout.call(this);
}

function DoShow(prefab, title, tips, options) {
    let nodeRoot = cc.find('Canvas');
    let floattip = cc.instantiate(prefab);
    nodeRoot.getChildByName('FloatTipBox').addChild(floattip);

    let hasTitle = (typeof title === 'string' && title.length > 0);
    let tip1Node = floattip.getChildByName('Tip1');
    let tip2Node = floattip.getChildByName('Tip2');
    let titleNode = floattip.getChildByName('Title');
    tip1Node.active = !hasTitle;
    tip2Node.active = hasTitle;
    titleNode.active = hasTitle;

    tip1Node.getComponent(cc.Label).string = tips;
    tip2Node.getComponent(cc.Label).string = tips;
    if (hasTitle) {
        let winNode = titleNode.getChildByName('Win');
        let lossNode = titleNode.getChildByName('Loss');
        let drawNode = titleNode.getChildByName('Draw');
        winNode.active = (title === 'win');
        lossNode.active = (title === 'loss');
        drawNode.active = (title !== 'win' && title !== 'loss');
        if (title !== 'win' && title !== 'loss' && title !== 'draw') {
            drawNode.getComponent(cc.Label).string = title;
        }
    }

    let btnCloseNode = floattip.getChildByName('CloseBtn');
    btnCloseNode.on(cc.Node.EventType.TOUCH_END, function () {
        clearInterval(options.timerCountdown);
        DestrySelf(floattip);
    }, this);

    options = options || {};
    options.countdownMSTime = options.countdownMSTime || 5000;
    function UpdateCountdown(remainTime) {
        let countdownNode = floattip.getChildByName('Countdown');
        remainTime = Math.floor(Math.max(0, remainTime) / 1000);
        countdownNode.getComponent(cc.Label).string = remainTime;
    }
    UpdateCountdown(options.countdownMSTime);
    options.startTimestamp = new Date().getTime();
    options.timerCountdown = setInterval(function () {
        if (!floattip.active) {
            options.startTimestamp = new Date().getTime();
            return;
        }
        let nowTimestamp = new Date().getTime();
        let diffTimestamp = nowTimestamp - options.startTimestamp;
        UpdateCountdown(options.countdownMSTime - diffTimestamp);
        if (options.countdownMSTime - diffTimestamp <= 0) {
            clearInterval(options.timerCountdown);
            DestrySelf(floattip);
        }
    }, 100);

    nodeFloattipList.push(floattip);
    Relayout.call(this);
}

const floattip = {
    Show: function (title, tips, options) {
        let prefab = cc.loader.getRes("floattip", cc.Prefab);
        if (prefab instanceof cc.Prefab) {
            DoShow.call(this, prefab, title, tips, options);
            return;
        }

        if (!this.floattipList) this.floattipList = new Array();
        this.floattipList.push([title, tips, options]);

        if (this.isLoadingPrefab) return;
        this.isLoadingPrefab = true;

        cc.loader.loadRes("floattip", cc.Prefab, function (err, prefab) {
            if (err) {
                let errMsg = err.message || err;
                console.error('加载FloatTip预制错误：', errMsg);
            } else {
                for (let i = 0, len = this.floattipList.length; i < len; ++i) {
                    let mb = this.floattipList[i];
                    DoShow.call(this, prefab, mb[0], mb[1], mb[2]);
                }
                this.floattipList = [];
            }
        }.bind(this));
    },
};

module.exports = floattip;