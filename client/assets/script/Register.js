const config = require('./Config');
const constant = require('./protocol/Constant');
const MSG_PLAYER_REGISTER_DBCL = require('./protocol/MSG_PLAYER_REGISTER_DBCL')['MSG_PLAYER_REGISTER_DBCL'];

function GetRegisterTimes() {
    let times = cc.sys.localStorage.getItem(config.itemName.register);
    return isNaN(times) ? 0 : Number(times);
}

function UpdateRegisterBtn(enable) {
    let nodeRegisterBtn = cc.find('Bg/RegisterBtn', this.node);
    nodeRegisterBtn.getComponent(cc.Button).interactable = enable;
}

function OnRegisterBtn() {
    if (GetRegisterTimes() >= constant.MAX_REGISTER_TIMES) {
        let tips = '您已成功注册%s次，不能再进行注册';
        tips = tips.replace('%s', constant.MAX_REGISTER_TIMES);
        g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        return;
    }

    let nodeNickname = cc.find('Bg/Nickname', this.node);
    let strNickname = nodeNickname.getComponent(cc.EditBox).string;
    if (!constant.NameIsValid(strNickname)) {
        g_msgbox.Show(null, '昵称非法，请重新输入', g_msgbox.MB_OK);
        return;
    }

    let nodePassword = cc.find('Bg/Password', this.node);
    let strPassword = nodePassword.getComponent(cc.EditBox).string;
    if (strPassword.length < constant.MAX_PASSWORD_MIN_SIZE) {
        let tips = '密码位数需大于等于' + constant.MAX_PASSWORD_MIN_SIZE;
        g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        return;
    }
    if (!constant.PasswordIsValid(strPassword)) {
        g_msgbox.Show(null, '密码非法，请重新输入', g_msgbox.MB_OK);
        return;
    }

    let nodePassword2 = cc.find('Bg/Password2', this.node);
    let strPassword2 = nodePassword2.getComponent(cc.EditBox).string;
    if (strPassword !== strPassword2) {
        g_msgbox.Show(null, '两次输入密码不相等，请仔细校验', g_msgbox.MB_OK);
        return;
    }

    g_handler.StartRegister(strNickname, strPassword);
    UpdateRegisterBtn.call(this, false);
}

cc.Class({
    extends: cc.Component,

    Show() {
        this.node.active = true;
        let nodeNickname = cc.find('Bg/Nickname', this.node);
        nodeNickname.getComponent(cc.EditBox).string = '';
        let nodePassword = cc.find('Bg/Password', this.node);
        nodePassword.getComponent(cc.EditBox).string = '';
        let nodePassword2 = cc.find('Bg/Password2', this.node);
        nodePassword2.getComponent(cc.EditBox).string = '';
    },

    start() {
        g_uiemitter.on('UI_PLAYER_REGISTER', function (msg) {
            let tips = '注册失败';
            if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.SUCCESS) {
                tips = '注册成功，请回到登录界面开始登录';
                let times = GetRegisterTimes();
                cc.sys.localStorage.setItem(config.itemName.register, ++times);
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.NAME_EXIST) {
                tips = '昵称已被其他玩家注册，' + tips;
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.MARIADB_QUERY_FAIL) {
                tips = '数据库操作失败，' + tips;
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.PARAM_ERROR) {
                tips = '消息参数错误，' + tips;
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.MARIADB_QUERY_ERROR) {
                tips = '数据库操作错误，' + tips;
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.LOBBY_NO_CONNECT) {
                tips = '服务器未链接，' + tips;
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.NAME_INVALID) {
                tips = '昵称非法，请重新输入';
            } else if (msg.result === MSG_PLAYER_REGISTER_DBCL.Result.PASSWORD_INVALID) {
                tips = '密码非法，请重新输入';
            } else {
                tips = String(msg.result) + '未知错误，' + tips;
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
            UpdateRegisterBtn.call(this, true);
        }.bind(this));

        cc.find('Bg/RegisterBtn', this.node).on('click', function () {
            OnRegisterBtn.call(this);
        }, this);

        cc.find('Bg/CloseBtn', this.node).on('click', function () {
            this.node.active = false;
        }, this);
    },
});
