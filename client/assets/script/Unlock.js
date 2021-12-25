const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

function OnBtnSure() {
    let unlockCost = 0, objGame = null;
    if (this.type === common.Location.KING3) {
        objGame = g_king3;
        unlockCost = constant.KING3_UNLOCK_COST;
    } else if (this.type === common.Location.POWER7) {
        objGame = g_power7;
        unlockCost = constant.POWER7_UNLOCK_COST;
    } else {
        return;
    }

    let nodeCoin = cc.find('Bg/Coin', this.node);
    let nodeDesc = cc.find('Bg/Desc', this.node);
    let nodePassword = cc.find('Bg/Password', this.node);
    let strCoin = nodeCoin.getComponent(cc.EditBox).string;
    let strDesc = nodeDesc.getComponent(cc.EditBox).string;
    let strPassword = nodePassword.getComponent(cc.EditBox).string;

    let coinMaxLength = 9;
    if (strCoin.length > coinMaxLength) {
        g_msgbox.Show(null, '军饷金额最多' + coinMaxLength + '位', g_msgbox.MB_OK);
        return;
    }
    if (strDesc.length > constant.ROOM_DESC_MAX_SIZE) {
        g_msgbox.Show(null, '描述长度最多' + constant.ROOM_DESC_MAX_SIZE + '个字符', g_msgbox.MB_OK);
        return;
    }
    if (strPassword.length > constant.ROOM_PASSWORD_MAX_SIZE) {
        g_msgbox.Show(null, '密码长度最多' + constant.ROOM_PASSWORD_MAX_SIZE + '个字符', g_msgbox.MB_OK);
        return;
    }
    let betCoin = Number(strCoin);
    if (this.type === common.Location.KING3) {
        if (isNaN(strCoin) || betCoin < constant.KING3_MIN_BETCOIN) {
            g_msgbox.Show(null, '出战金额至少为' + constant.KING3_MIN_BETCOIN + '军饷', g_msgbox.MB_OK);
            return;
        }
    } else if (this.type === common.Location.POWER7) {
        if (isNaN(strCoin) || betCoin < constant.POWER7_MIN_MAXBETCOIN) {
            g_msgbox.Show(null, '出兵最大金额至少为' + constant.POWER7_MIN_MAXBETCOIN + '军饷', g_msgbox.MB_OK);
            return;
        }
    }
    let selfCoin = g_player.GetProp(common.PropID.COIN);
    if (this.type === common.Location.KING3) {
        if (selfCoin < betCoin) {
            g_msgbox.ShopMsgBox('出战金额不能大于您的军饷');
            return;
        }
    } else if (this.type === common.Location.POWER7) {
        if (selfCoin < constant.POWER7_MIN_BETCOIN) {
            g_msgbox.ShopMsgBox('您的军饷小于最低出兵军饷');
            return;
        }
    }

    if (selfCoin < unlockCost) {
        g_msgbox.ShopMsgBox('您的军饷不足以支付解锁费用');
        return;
    }
    let room = objGame.GetRoom(this.rid);
    if (room && room.pid > 0) {
        g_msgbox.Show(null, '此房间已被其他玩家解锁，请换个房间', g_msgbox.MB_OK);
        return;
    }

    g_player.SetProp(common.PropID.COIN, -unlockCost);
    let objMsg = {
        rid: this.rid, cost: unlockCost,
        desc: strDesc, password: strPassword
    };
    if (this.type === common.Location.KING3) {
        objMsg.betCoin = betCoin;
        g_handler.SendKing3LoginMsg(g_connclient, objMsg);
    } else if (this.type === common.Location.POWER7) {
        objMsg.maxBetCoin = betCoin;
        g_handler.SendPower7LoginMsg(g_connclient, objMsg);
    }

    this.node.active = false;
}

function UpdateCostTip() {
    let nodeCostTip = cc.find('Bg/CostTip', this.node);
    let labelCostTip = nodeCostTip.getComponent(cc.Label);

    let nodeCoin = cc.find('Bg/Coin/PLACEHOLDER_LABEL', this.node);
    let labelCoin = nodeCoin.getComponent(cc.Label);

    if (this.type === common.Location.KING3) {
        let costCoin = utility.SplitStr(constant.KING3_UNLOCK_COST);
        labelCostTip.string = '三国鼎立' + this.rid + '号房解锁需消耗' + costCoin + '军饷';
        labelCoin.string = '请输入出战消耗军饷（必填>=' + constant.KING3_MIN_BETCOIN + '）';
    } else if (this.type === common.Location.POWER7) {
        let costCoin = utility.SplitStr(constant.POWER7_UNLOCK_COST);
        labelCostTip.string = '七雄争霸' + this.rid + '号房解锁需消耗' + costCoin + '军饷';
        labelCoin.string = '请输入最大出兵军饷（必填>=' + constant.POWER7_MIN_MAXBETCOIN + '）';
    } else {
        labelCostTip.string = '数据错误，请关闭窗口重试';
    }
}

cc.Class({
    extends: cc.Component,

    Show(rid, type) {
        this.rid = rid;
        this.type = type;
        this.node.active = true;
        UpdateCostTip.call(this);
    },

    start() {
        let quitNode = cc.find('Bg/QuitBtn', this.node);
        quitNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);

        let sureNode = cc.find('Bg/SureBtn', this.node);
        sureNode.on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnSure.call(this);
        }, this);
    },
});
