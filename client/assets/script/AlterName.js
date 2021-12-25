const utility = require('./public/Utility');
const common = require('./protocol/Common');
const constant = require('./protocol/Constant');
const MSG_ALTER_NAME_DBCL = require('./protocol/MSG_ALTER_NAME_DBCL')['MSG_ALTER_NAME_DBCL'];

function UpdateTips(result) {
    let nodeTips = cc.find('Bg/Tips', this.node);
    let labelTips = nodeTips.getComponent(cc.Label);
    if (result === MSG_ALTER_NAME_DBCL.Result.SUCCESS) {
        labelTips.string = '昵称修改成功';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.NAME_INVALID) {
        labelTips.string = '昵称非法，请重新输入';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.COST_ERROR) {
        labelTips.string = '花费军饷不一致，请重新登录';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.SAME_NAME) {
        labelTips.string = '昵称已存在，请重新输入';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.NO_CLIENT_INFO) {
        labelTips.string = '您数据有误，请重新登录';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.OFFLINE) {
        labelTips.string = '服务已断开，请稍后重试';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.DB_QUERY_ERROR) {
        labelTips.string = '数据库查询出错，请稍后重试';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.REDIS_ERROR) {
        labelTips.string = '本地数据库出错，请稍后重试';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.REDIS_FAIL) {
        labelTips.string = '修改昵称失败，请稍后重试';
    } else if (result === MSG_ALTER_NAME_DBCL.Result.LACK_COIN) {
        g_msgbox.ShopMsgBox('您军饷不足，无法修改昵称');
        return;
    } else if (result === MSG_ALTER_NAME_DBCL.Result.LACK_PI_INFO) {
        labelTips.string = '您信息缺失，请重新登录';
    } else {
        let nickname = g_player.GetNickname();
        if (constant.FirstAlterName(nickname)) {
            labelTips.string = '第一次修改昵称免费';
        } else {
            let strCost = utility.SplitStr(constant.ALTER_NAME_COST);
            labelTips.string = '修改昵称需花费' + strCost + '军饷';
        }
    }
}

function OnBtnSure() {
    let nodeName = cc.find('Bg/Name', this.node);
    let name = nodeName.getComponent(cc.EditBox).string;

    if (!constant.NameIsValid(name)) {
        UpdateTips.call(this, MSG_ALTER_NAME_DBCL.Result.NAME_INVALID);
        return;
    }

    let nickname = g_player.GetNickname();
    if (name === nickname) {
        UpdateTips.call(this, MSG_ALTER_NAME_DBCL.Result.SAME_NAME);
        return;
    }

    let cost = 0;
    if (!constant.FirstAlterName(nickname)) {
        cost = constant.ALTER_NAME_COST;
    }
    if (cost > 0 && g_player.GetProp(common.PropID.COIN) < cost) {
        UpdateTips.call(this, MSG_ALTER_NAME_DBCL.Result.LACK_COIN);
        return;
    }

    g_player.SetProp(common.PropID.COIN, -cost);
    g_handler.SendAlterNameMsg(g_connclient, {
        newName: name, cost: cost
    });
}

cc.Class({
    extends: cc.Component,

    Show() {
        this.node.active = true;
        UpdateTips.call(this);
    },

    start() {
        g_uiemitter.on('UI_ALTER_NAME', function (msg) {
            UpdateTips.call(this, msg.result)
        }.bind(this));

        let quitNode = cc.find('Bg/QuitBtn', this.node);
        quitNode.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);

        let sureNode = cc.find('Bg/SureBtn', this.node);
        sureNode.on(cc.Node.EventType.TOUCH_END, function () {
            OnBtnSure.call(this);
        }, this);

        let nameNode = cc.find('Bg/Name', this.node);
        nameNode.on('editing-did-began', function () {
            UpdateTips.call(this);
        }, this);
    },
});
