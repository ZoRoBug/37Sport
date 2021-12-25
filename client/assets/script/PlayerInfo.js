const config = require('./Config');
const utility = require('./public/Utility');
const common = require('./protocol/Common');

function UpdatePlayerInfo() {
    let nicknameNode = this.node.getChildByName('Nickname');
    let nicknameLabel = nicknameNode.getComponent(cc.Label);
    nicknameLabel.string = g_player.GetNickname() || '';

    let coinNode = cc.find('Coin/Txt', this.node);
    let coinLabel = coinNode.getComponent(cc.Label);
    coinLabel.string = g_player.GetProp(common.PropID.COIN, true);

    let subcoinNode = cc.find('Subcoin/Txt', this.node);
    let subcoinLabel = subcoinNode.getComponent(cc.Label);
    subcoinLabel.string = g_player.GetProp(common.PropID.SUBCOIN, true);
}

cc.Class({
    extends: cc.Component,

    start() {
        UpdatePlayerInfo.call(this);
        setInterval(function () {
            UpdatePlayerInfo.call(this);
        }.bind(this), 1000);

        let headNode = cc.find('Head/Image', this.node);
        headNode.on(cc.Node.EventType.TOUCH_END, function () {
            let tips = '当前更换头像功能正在开发中，请耐心等待';
            if (utility.IsWeinXinPlatform()) {
                tips = '如果您发现未同步微信头像，那么您需重新打开游戏，在登录界面中\
                点击‘获取头像 & 登录’按钮，然后在弹出界面中点击‘允许’按钮即可同步微信头像';
                cc.sys.localStorage.setItem(config.itemName.wxAuth, null);
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        });

        let alterBtn = this.node.getChildByName('AlterBtn');
        alterBtn.on('click', function () {
            let root = cc.find('Canvas');
            let nodeAlterName = root.getChildByName('AlterName');
            nodeAlterName.getComponent('AlterName').Show();
        }, this);

        g_head.Load(g_player.GetHead(), function (spriteFrame) {
            if (!spriteFrame) return;
            let headNode = cc.find('Head/Image', this.node);
            let headSprite = headNode.getComponent(cc.Sprite);
            headSprite.spriteFrame = spriteFrame;
        }.bind(this));
    },
});
