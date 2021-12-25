const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

function GetRoomCreator() {
    let creator = '';
    if (this.type === common.Location.KING3) {
        creator = g_king3.GetRoom(this.rid).nickname;
    } else if (this.type === common.Location.POWER7) {
        creator = g_power7.GetRoom(this.rid).nickname;
    } 
    return creator;
}

function OnBtnMail() {
    let creaotr = GetRoomCreator.call(this);
    let nodeMail = cc.find('Canvas').getChildByName('Mail');
    nodeMail.getComponent('Mail').Show(creaotr);
    this.node.active = false;
}

function OnBtnSure() {
    let nodePassword = cc.find('Bg/Password', this.node);
    let password = nodePassword.getComponent(cc.EditBox).string;
    if (password.length === 0) {
        g_msgbox.Show(null, '密码不能为空', g_msgbox.MB_OK);
        return;
    }
    if (password.length > constant.ROOM_PASSWORD_MAX_SIZE) {
        g_msgbox.Show(null, '密码不正确，请重新输入', g_msgbox.MB_OK);
        return;
    }

    let objMsg = { rid: this.rid, password: password };
    if (this.type === common.Location.KING3) {
        g_handler.SendKing3LoginMsg(g_connclient, objMsg);
    } else if (this.type === common.Location.POWER7) {
        g_handler.SendPower7LoginMsg(g_connclient, objMsg);
    }

    this.node.active = false;
}

function UpdateRoomInfo() {
    let nodeRoomInfo = cc.find('Bg/RoomInfo', this.node);
    let labelRoomInfo = nodeRoomInfo.getComponent(cc.Label);
    if (this.type === common.Location.KING3) {
        labelRoomInfo.string = '三国鼎立' + this.rid + '号房间';
    } else if (this.type === common.Location.POWER7) {
        labelRoomInfo.string = '七雄争霸' + this.rid + '号房间';
    } else {
        labelRoomInfo.string = '数据错误，请关闭窗口重试';
    }

    let nodeCreator = cc.find('Bg/Creator', this.node);
    let labelCreator = nodeCreator.getComponent(cc.Label);
    labelCreator.string = '房主：' + GetRoomCreator.call(this);
}

cc.Class({
    extends: cc.Component,

    Show(rid, type) {
        this.rid = rid;
        this.type = type;
        this.node.active = true;
        UpdateRoomInfo.call(this);
    },

    start() {
        let sureNode = cc.find('Bg/SureBtn', this.node);
        sureNode.on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnSure.call(this);
        }, this);

        let quitNode = cc.find('Bg/MailBtn', this.node);
        quitNode.on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnMail.call(this);
        }, this);

        let nodeCreator = cc.find('Bg/Creator', this.node);
        nodeCreator.on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnMail.call(this);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
