const common = require('./protocol/Common');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');
const MSG_SEND_MAIL_LBCL = require('./protocol/MSG_SEND_MAIL_LBCL')['MSG_SEND_MAIL_LBCL'];

function OnSendBtn() {
    let nodeContent = cc.find('Bg/Content', this.node);
    let strContent = nodeContent.getComponent(cc.EditBox).string;
    if (strContent.length === 0) {
        g_msgbox.Show(null, '信件内容不能为空', g_msgbox.MB_OK);
        return;
    }
    if (strContent.length > constant.MAIL_CONTENT_MAX_SIZE) {
        g_msgbox.Show(null, '信件内容长度过长', g_msgbox.MB_OK);
        return;
    }

    let nodeNickname = cc.find('Bg/Nickname', this.node);
    let strNickname = nodeNickname.getComponent(cc.EditBox).string;
    if (strNickname.length === 0) {
        g_msgbox.Show(null, '接收者不能为空', g_msgbox.MB_OK);
        return;
    }
    if (strNickname.length > constant.MAIL_NAME_MAX_SIZE) {
        g_msgbox.Show(null, '接收者昵称过长', g_msgbox.MB_OK);
        return;
    }
    if (strNickname === g_player.GetNickname()) {
        g_msgbox.Show(null, '接收者不能为自己', g_msgbox.MB_OK);
        return;
    }

    let nodeGiftSum = cc.find('Bg/GiftSum', this.node);
    let strGiftSum = nodeGiftSum.getComponent(cc.EditBox).string;
    if (strGiftSum.length === 0) {
        g_handler.SendMailMsg(g_connclient, {
            recvName: strNickname, content: strContent
        });
        nodeContent.getComponent(cc.EditBox).string = '';
    } else {
        if (isNaN(strGiftSum)) {
            g_msgbox.Show(null, '红包金额非法', g_msgbox.MB_OK);
            return;
        }

        let giftSum = Number(strGiftSum);
        if (giftSum < constant.GIFT_MIN_COIN) {
            let minGiftCoin = utility.SplitStr(constant.GIFT_MIN_COIN);
            g_msgbox.Show(null, '红包金额不能小于' + minGiftCoin, g_msgbox.MB_OK);
            return;
        }

        let selfCoin = g_player.GetProp(common.PropID.COIN);
        if (selfCoin < giftSum) {
            g_msgbox.ShopMsgBox('您的军饷不足以支付红包');
            return;
        }

        let sumCoin = giftSum, strCoinSum = '';
        let numY = Math.floor(sumCoin / 100000000);
        sumCoin = sumCoin % 100000000;
        if (numY > 0) strCoinSum = strCoinSum + numY + '亿';
        let numW = Math.floor(sumCoin / 10000);
        sumCoin = sumCoin % 10000;
        if (numW > 0) strCoinSum = strCoinSum + numW + '万';
        if (sumCoin > 0) strCoinSum = strCoinSum + sumCoin;
        let tips = '您确定向‘' + strNickname + '’发送' + strCoinSum + '军饷？';
        tips = tips + '\r\n\r\n注：请仔细核对昵称和金额，如误发则自己承担损失';
        g_msgbox.Show(null, tips, g_msgbox.MB_OKCANCEL, function (result) {
            if (result === g_msgbox.BT_CANCEL) return;
            g_player.SetProp(common.PropID.COIN, -giftSum);
            g_handler.SendMailMsg(g_connclient, {
                recvName: strNickname, giftCoin: giftSum, content: strContent
            });
            nodeContent.getComponent(cc.EditBox).string = '';
            nodeGiftSum.getComponent(cc.EditBox).string = '';
        }.bind(this), { height: 250 });
    }
}

cc.Class({
    extends: cc.Component,

    Show(name) {
        this.node.active = true;
        let nodeNickname = cc.find('Bg/Nickname', this.node);
        nodeNickname.getComponent(cc.EditBox).string = name || '';
    },

    start() {
        g_uiemitter.on('UI_SEND_MAIL', function (msg) {
            let nodeSuccess = cc.find('Bg/Success', this.node);
            if (msg.result === MSG_SEND_MAIL_LBCL.Result.SUCCESS) {
                nodeSuccess.active = true;
                return;
            }
            let tips = '发送信件失败';
            if (msg.result === MSG_SEND_MAIL_LBCL.Result.NO_CLIENT_INFO) {
                tips = '您信息缺失，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.OFFLINE) {
                tips = '服务不在线，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.PARAM_INVALID) {
                tips = '消息参数错误，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.REDIS_ERROR) {
                tips = '数据库错误，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.SENDER_LACK_COIN) {
                tips = '您军饷不足，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.SENDER_LACK_NAME) {
                tips = '您昵称丢失，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.RECVER_OFFLINE) {
                tips = '接收者不在线或不存在，' + tips;
            } else if (msg.result === MSG_SEND_MAIL_LBCL.Result.CONTENT_INVALID) {
                tips = '信件内容有违法违规内容，' + tips;
            } else {
                tips = String(msg.result) + '未知错误，' + tips;
            }
            nodeSuccess.active = false;
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        }.bind(this));

        let nodeContent = cc.find('Bg/Content', this.node);
        nodeContent.on('editing-did-began', function () {
            cc.find('Bg/Success', this.node).active = false;
        }, this);

        cc.find('Bg/SendBtn', this.node).on('click', function () {
            OnSendBtn.call(this);
        }, this);

        cc.find('Bg/CloseBtn', this.node).on('click', function () {
            this.node.active = false;
        }, this);
    },
});
