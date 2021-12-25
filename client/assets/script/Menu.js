const config = require('./Config');
const common = require('./protocol/Common');
const utility = require('./public/Utility');

function OnShopBtn() {
    let nodeShop = cc.find('Canvas').getChildByName('Shop');
    nodeShop.getComponent('Shop').Show();
    this.node.active = false;
}

function OnMailBtn() {
    let nodeMail = cc.find('Canvas').getChildByName('Mail');
    nodeMail.getComponent('Mail').Show();
    this.node.active = false;
}

function OnRuleBtn() {
    this.node.active = false;
    let strRule = '', height = 0;
    if (this.type === common.Location.LOBBY) {
        height = 680;
        strRule = config.gameRule;
    } else if (this.type === common.Location.KING3) {
        height = 680;
        strRule = config.king3.rule;
    } else if (this.type === common.Location.POWER7) {
        height = 770;
        strRule = config.power7.rule;
    } else if (this.type === common.Location.IMPAWN) {
        height = 730;
        strRule = config.impawn.rule;
    } else {
        return;
    }
    g_msgbox.Show(null, strRule, g_msgbox.MB_OK, null, {
        height: height
    });
}

function OnRecordBtn() {
    let nodeRecord = cc.find('Canvas').getChildByName('Record');
    nodeRecord.getComponent('Record').Show();
    this.node.active = false;
}

function OnShareBtn() {
    if (utility.IsWeinXinPlatform()) {
        wx.shareAppMessage({
            title: '三七竞技小游戏'
        });
    } else {
        let nodeShare = cc.find('Canvas').getChildByName('Share');
        nodeShare.getComponent('Share').Show();
    }
    this.node.active = false;
}

function OnServiceBtn() {
    let nodeService = cc.find('Canvas').getChildByName('Service');
    nodeService.getComponent('Service').Show();
    this.node.active = false;
}

cc.Class({
    extends: cc.Component,

    Show(type) {
        this.type = type;
        this.node.active = true;
    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
        cc.find('Bg/ShopBtn', this.node).on('click', function () {
            OnShopBtn.call(this);
        }, this);
        cc.find('Bg/MailBtn', this.node).on('click', function () {
            OnMailBtn.call(this);
        }, this);
        cc.find('Bg/RuleBtn', this.node).on('click', function () {
            OnRuleBtn.call(this);
        }, this);
        cc.find('Bg/RecordBtn', this.node).on('click', function () {
            OnRecordBtn.call(this);
        }, this);
        cc.find('Bg/ShareBtn', this.node).on('click', function () {
            OnShareBtn.call(this);
        }, this);
        cc.find('Bg/ServiceBtn', this.node).on('click', function () {
            OnServiceBtn.call(this);
        }, this);
    },
});
