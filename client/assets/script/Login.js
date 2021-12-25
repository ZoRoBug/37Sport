const config = require('./Config');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');

function UpdateLoginBtn(enable) {
    let nodeLoginBtn = this.node.getChildByName('LoginBtn');
    nodeLoginBtn.getComponent(cc.Button).interactable = enable;
    let nodeTxt = cc.find('LoginBtn/Background/Label', this.node);
    nodeTxt.getComponent(cc.Label).string = enable ? '登 录' : '登录中...';
}

function OnLoginBtn() {
    if (utility.IsWeinXinPlatform()) return;

    let nodeAccount = this.node.getChildByName('Account');
    let strAccount = nodeAccount.getComponent(cc.EditBox).string;
    if (strAccount.length === 0 || strAccount.length > constant.MAX_ACCOUNT_MAX_SIZE) {
        g_msgbox.Show(null, '昵称不存在，请重新输入', g_msgbox.MB_OK);
        return;
    }

    let nodePassword = this.node.getChildByName('Password');
    let strPassword = nodePassword.getComponent(cc.EditBox).string;
    if (!constant.PasswordIsValid(strPassword)) {
        g_msgbox.Show(null, '密码错误，请重新输入', g_msgbox.MB_OK);
        return;
    }

    cc.sys.localStorage.setItem(config.itemName.account, strAccount);
    cc.sys.localStorage.setItem(config.itemName.password, strPassword);
    g_handler.StartLogin(null, strAccount, strPassword);
    UpdateLoginBtn.call(this, false);
}

cc.Class({
    extends: cc.Component,

    start() {
        g_uiemitter.on('UI_LOGIN_RESULT', function (msg) {
            UpdateLoginBtn.call(this, true);
        }.bind(this));

        let nodeUrlCode = this.node.getChildByName('UrlCode');
        let nodeCodeTips = this.node.getChildByName('CodeTips');
        let nodeAccount = this.node.getChildByName('Account');
        let nodePassword = this.node.getChildByName('Password');
        let nodeLoginBtn = this.node.getChildByName('LoginBtn');
        let nodeRegister = this.node.getChildByName('Register');
        nodeAccount.active = !utility.IsWeinXinPlatform();
        nodePassword.active = !utility.IsWeinXinPlatform();
        nodeLoginBtn.active = !utility.IsWeinXinPlatform();
        nodeRegister.active = !utility.IsWeinXinPlatform();
        nodeUrlCode.active = !cc.sys.isMobile && !utility.IsWeinXinPlatform();
        nodeCodeTips.active = !cc.sys.isMobile && !utility.IsWeinXinPlatform();

        let account = cc.sys.localStorage.getItem(config.itemName.account) || '';
        let password = cc.sys.localStorage.getItem(config.itemName.password) || '';
        nodeAccount.getComponent(cc.EditBox).string = account;
        nodePassword.getComponent(cc.EditBox).string = password;

        nodeLoginBtn.on('click', function () {
            OnLoginBtn.call(this);
        }, this);

        let nodeWXIDTips = this.node.getChildByName('wxIDTips');
        nodeWXIDTips.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeService = cc.find('Canvas').getChildByName('Service');
            nodeService.getComponent('Service').Show();
        }, this);

        nodeRegister.on(cc.Node.EventType.TOUCH_END, function () {
            let nodeRegister = cc.find('Canvas').getChildByName('Register');
            nodeRegister.getComponent('Register').Show();
        }, this);

        if (utility.IsWeinXinPlatform()) {
            let passAuth = cc.sys.localStorage.getItem(config.itemName.wxAuth);
            if (typeof passAuth === 'boolean') {
                if (!passAuth) {
                    g_handler.StartLogin();
                } else {
                    wx.getUserInfo({
                        fail: function () { g_handler.StartLogin(); },
                        success: function (res) {
                            g_handler.StartLogin(res.userInfo.avatarUrl);
                        }
                    });
                }
            } else {
                const res = wx.getSystemInfoSync();
                let width = res.windowWidth;
                let height = res.windowHeight;
                let btnWidth = 200, btnHeigth = 40;
                let btnAuth = wx.createUserInfoButton({
                    type: 'text',
                    text: '点击获取头像 & 登录',
                    style: {
                        left: Math.floor((width - btnWidth) / 2),
                        top: Math.floor((height - btnHeigth) / 2) + 20,
                        width: btnWidth, height: btnHeigth, lineHeight: btnHeigth,
                        backgroundColor: '#9b0000', color: '#ffffff',
                        textAlign: 'center', fontSize: 16, borderRadius: 4
                    }
                })
                btnAuth.onTap((res) => {
                    btnAuth.hide();
                    cc.sys.localStorage.setItem(config.itemName.wxAuth, Boolean(res.userInfo));
                    g_handler.StartLogin(res.userInfo ? res.userInfo.avatarUrl : '');
                })
            }
        }
    },
});
