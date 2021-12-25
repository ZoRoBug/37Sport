const constant = require('./protocol/Constant');
const MSG_ADD_EXCH_CODE_LBCL = require('./protocol/MSG_ADD_EXCH_CODE_LBCL')['MSG_ADD_EXCH_CODE_LBCL'];

function UpdateTicketSum(str) {
    let nodeTicketSum = cc.find('Bg/TicketSum', this.node);
    nodeTicketSum.getComponent(cc.EditBox).string = str;
}

function OnAddBtn() {
    if (!g_player.IsAdmin()) {
        g_msgbox.Show(null, '你权限不够，无法操作', g_msgbox.MB_OK);
        return;
    }

    let nodeTicketSum = cc.find('Bg/TicketSum', this.node);
    let strTicketSum = nodeTicketSum.getComponent(cc.EditBox).string;

    let ticketSum = null;
    if (isNaN(strTicketSum)) {
        if (strTicketSum.length <= constant.EXCHANGE_TICKET_MIN_SIZE ||
            strTicketSum.length > constant.EXCHANGE_TICKET_MAX_SIZE) {
            g_msgbox.Show(null, '兑换码非法，请仔细核对', g_msgbox.MB_OK);
            return;
        }
    } else {
        ticketSum = Number(strTicketSum);
        if (ticketSum < constant.EXCHANGE_TICKET_MIN_SUM ||
            ticketSum > constant.EXCHANGE_TICKET_MAX_SUM) {
            g_msgbox.Show(null, '兑换码金额非法，请仔细核对', g_msgbox.MB_OK);
            return;
        }
    }

    g_handler.SendAddExchCodeMsg(g_connclient, {
        ticketSum: ticketSum,
        ticket: strTicketSum
    });
}

function OnKickBtn() {
    if (!g_player.IsAdmin()) {
        g_msgbox.Show(null, '你权限不够，无法操作', g_msgbox.MB_OK);
        return;
    }

    let nodeKickSecs = cc.find('Bg/KickSecs', this.node);
    let strKickSecs = nodeKickSecs.getComponent(cc.EditBox).string;
    if (isNaN(strKickSecs)) {
        g_msgbox.Show(null, '输入时间数字非法', g_msgbox.MB_OK);
        return;
    }

    let nodeNickname = cc.find('Bg/Nickname', this.node);
    let strNickname = nodeNickname.getComponent(cc.EditBox).string;
    let nicknameList = strNickname.split(',');

    nodeKickSecs.getComponent(cc.EditBox).string = '';
    let listLength = nicknameList.length;
    this.sendKickTimer = setInterval(function () {
        g_handler.SendKickMsg(g_connclient, {
            nickname: nicknameList.shift(),
            timeSec: Number(strKickSecs)
        });
        if (nicknameList.length === 0) {
            let tips = '共踢出' + listLength + '个玩家';
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
            clearInterval(this.sendKickTimer);
        }
    }.bind(this), 100);
}

cc.Class({
    extends: cc.Component,

    Show() {
        this.node.active = true;
        UpdateTicketSum.call(this, '');
    },

    start() {
        g_uiemitter.on('UI_ADD_EXCHCODE', function (msg) {
            let tips = '添加兑换码失败';
            if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.SUCCESS) {
                if (msg.newTicket.length > 0) UpdateTicketSum.call(this, msg.newTicket);
                tips = (msg.newTicket.length > 0) ? '获取兑换码成功' : '添加兑换码成功';
            } else if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.NO_CLIENT_INFO) {
                tips = '您信息缺失，' + tips;
            } else if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.OFFLINE) {
                tips = '服务不在线，' + tips;
            } else if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.PARAM_INVALID) {
                tips = '消息参数错误，' + tips;
            } else if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.REDIS_ERROR) {
                tips = '数据库错误，' + tips;
            } else if (msg.result === MSG_ADD_EXCH_CODE_LBCL.Result.TICKET_EXIST) {
                tips = '兑换码已存在，' + tips;
            } else {
                tips = String(msg.result) + '未知错误，' + tips;
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        }.bind(this));

        cc.find('Bg/KickBtn', this.node).on('click', function () {
            OnKickBtn.call(this);
        }, this);

        cc.find('Bg/AddBtn', this.node).on('click', function () {
            OnAddBtn.call(this);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
