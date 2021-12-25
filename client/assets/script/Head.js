const common = require('./protocol/Common');

function OnMenuBtn() {
    let nodeMenu = cc.find('Canvas').getChildByName('Menu');
    nodeMenu.getComponent('Menu').Show(this.GetNowLocation());
}

cc.Class({
    extends: cc.Component,

    start() {
        this.node.getChildByName('BackBtn').on('click', function () {
            this.BackLocation();
        }, this);

        this.node.getChildByName('QuitBtn').on('click', function () {
            g_msgbox.Show(null, '退出功能未实现', g_msgbox.MB_OK);
        }, this);

        this.node.getChildByName('MenuBtn').on('click', function () {
            OnMenuBtn.call(this);
        }, this);

        this.node.getChildByName('Logo').on(cc.Node.EventType.TOUCH_END, function () {
            if (!g_player.IsAdmin()) return;
            cc.find('Canvas').getChildByName('Admin').getComponent('Admin').Show();
        }, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            if (event.keyCode === cc.macro.KEY.back) {
                this.BackLocation();
            } else if (event.keyCode === cc.macro.KEY.menu) {
                OnMenuBtn.call(this);
            }
        }, this);
    },

    GetNowLocation() {
        if (!this.locationList) return;
        let length = this.locationList.length;
        if (length === 0) return;
        return this.locationList[length - 1];
    },

    BackLocation() {
        if (!this.locationList) return;
        if (this.locationList.length < 2) return;
        let location = this.locationList.pop();
        if (location === common.Location.KING3) {
            g_handler.SendKing3LogoutMsg(g_connclient, {
                rid: g_king3.GetRID()
            });
            g_king3.ClearData();
            g_uiemitter.emit('UI_KING3_LOGOUT');
        } else if (location === common.Location.POWER7) {
            g_handler.SendPower7LogoutMsg(g_connclient, {
                rid: g_power7.GetRID()
            });
            g_power7.ClearData();
            g_uiemitter.emit('UI_POWER7_LOGOUT');
        } else if (location === common.Location.IMPAWN) {
            g_impawn.ClearData();
            g_uiemitter.emit('UI_IMPAWN_LOGOUT');
            g_handler.SendImpawnLogoutMsg(g_connclient);
        }
        this.UpdateLocation(this.locationList.pop());
    },

    UpdateLocation(location) {
        this.BackLocation();

        let root = this.node.parent;
        cc.find('Login', root).active = (location === null);
        cc.find('Lobby', root).active = (location === common.Location.LOBBY);
        cc.find('King3', root).active = (location === common.Location.KING3);
        cc.find('Power7', root).active = (location === common.Location.POWER7);
        cc.find('Impawn', root).active = (location === common.Location.IMPAWN);
        if (location === null) return;

        let logoNode = this.node.getChildByName('Logo');
        let backNode = this.node.getChildByName('BackBtn');
        let quitNode = this.node.getChildByName('QuitBtn');
        logoNode.active = (location === common.Location.LOBBY);
        backNode.active = (location !== common.Location.LOBBY);
        quitNode.active = false;//(location === common.Location.LOBBY);

        if (location === common.Location.LOBBY) this.locationList = [];
        this.locationList.push(location);

        let titleNode = this.node.getChildByName('Title');
        let titleLabel = titleNode.getComponent(cc.Label);
        if (location === common.Location.LOBBY) {
            titleLabel.string = '三七竞技 - 公测';
        } else if (location === common.Location.KING3) {
            titleLabel.string = '三国鼎立 - ' + g_player.GetNickname();
        } else if (location === common.Location.POWER7) {
            titleLabel.string = '七雄争霸 - ' + g_player.GetNickname();
        } else if (location === common.Location.IMPAWN) {
            titleLabel.string = '楚汉相争 - ' + g_player.GetNickname();
        }
    },
});
