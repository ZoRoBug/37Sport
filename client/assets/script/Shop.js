const config = require('./Config');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');
const MSG_EXCHANGE_LBCL = require('./protocol/MSG_EXCHANGE_LBCL')['MSG_EXCHANGE_LBCL'];

function UpdateExchangeCode(str) {
    let nodeTicketCode = cc.find('Bg/TicketCode', this.node);
    nodeTicketCode.getComponent(cc.EditBox).string = str;
}

function UpdateExchangeBtn(enable) {
    let btnExchange = cc.find('Bg/ExchangeBtn', this.node);
    btnExchange.getComponent(cc.Button).interactable = enable;
}

function OnRechargeBtn() {
    let tips = '充值功能当前正在开发和申请中，请耐心等待' + config.wxAddTips;
    g_msgbox.Show(null, tips, g_msgbox.MB_OK);
}

function OnExchangeBtn() {
    let nodeTicketCode = cc.find('Bg/TicketCode', this.node);
    let strTicketCode = nodeTicketCode.getComponent(cc.EditBox).string;
    if (strTicketCode.length <= constant.EXCHANGE_TICKET_MIN_SIZE ||
        strTicketCode.length > constant.EXCHANGE_TICKET_MAX_SIZE) {
        g_msgbox.Show(null, '兑换码非法，请仔细核对' + config.wxAddTips, g_msgbox.MB_OK);
        return;
    }
    UpdateExchangeBtn.call(this, false);
    g_handler.SendExchangeMsg(g_connclient, { ticket: strTicketCode });
}

cc.Class({
    extends: cc.Component,

    Show() {
        this.node.active = true;
        UpdateExchangeBtn.call(this, true);
        UpdateExchangeCode.call(this, '');
    },

    start() {
        g_uiemitter.on('UI_EXCHANGE', function (msg) {
            UpdateExchangeBtn.call(this, true);
            let tips = '兑换失败，请稍后重试' + config.wxAddTips;
            if (msg.result === MSG_EXCHANGE_LBCL.Result.SUCCESS) {
                UpdateExchangeCode.call(this, '');
                tips = '恭喜您兑换成功，获得' + utility.SplitStr(msg.coin) + '军饷';
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.NO_CLIENT_INFO) {
                tips = '您信息缺失，' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.OFFLINE) {
                tips = '服务不在线，' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.PARAM_INVALID) {
                tips = '消息参数错误，' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.REDIS_ERROR) {
                tips = '数据库错误，' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.PLAYER_OFFLINE) {
                tips = '您信息不在线，' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.TICKET_NO_EXIST) {
                let strFailTimes = '兑换码不存在，当前已连续失败' + msg.failTimes + '次，';
                tips = strFailTimes + '最大失败' + constant.EXCHANGE_FAIL_MAX_TIMES + '次。' + tips;
            } else if (msg.result === MSG_EXCHANGE_LBCL.Result.MAX_FAIL_TIMES) {
                let maxFailTimes = '已达到最大失败次数（' + constant.EXCHANGE_FAIL_MAX_TIMES + '次），';
                tips = maxFailTimes + constant.EXCHANGE_FAIL_EXPIRE_SEC + '秒后重置失败次数。' + tips;
            } else {
                tips = String(msg.result) + '未知错误，' + tips;
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        }.bind(this));

        cc.find('Bg/RechargeBtn', this.node).on('click', function () {
            OnRechargeBtn.call(this);
        }, this);

        cc.find('Bg/ExchangeBtn', this.node).on('click', function () {
            OnExchangeBtn.call(this);
        }, this);

        let nodeGetCode = cc.find('Bg/GetCode', this.node)
        nodeGetCode.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeService = cc.find('Canvas').getChildByName('Service');
            nodeService.getComponent('Service').Show();
            this.node.active = false;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
