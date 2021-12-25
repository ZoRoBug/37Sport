const common = require('./protocol/Common');
const constant = require('./protocol/Constant');

const LOCK_ROOM_COUNT = 20;

function OnMatchBtn(betCoin) {
    if (g_player.GetProp(common.PropID.COIN) < betCoin) {
        g_msgbox.ShopMsgBox('您的军饷不足，无法进行匹配');
        return;
    }

    if (this.type === common.Location.KING3) {
        g_handler.SendKing3LoginMsg(g_connclient, { betCoin: betCoin });
    } else if (this.type === common.Location.POWER7) {
        g_handler.SendPower7LoginMsg(g_connclient, { maxBetCoin: betCoin });
    }

    this.node.active = false;
}

function OnRooms() {
    for (let i = 1; i <= LOCK_ROOM_COUNT; ++i) {
        let nodeName = 'Bg/Rooms/Room' + i;
        let roomNode = cc.find(nodeName, this.node);
        roomNode.on(cc.Node.EventType.TOUCH_END, function () {
            let root = cc.find('Canvas');
            let isKing3 = (this.type === common.Location.KING3);
            let room = isKing3 ? g_king3.GetRoom(i) : g_power7.GetRoom(i);
            if (room && room.pid > 0) {
                if (room.isPassword) {
                    let nodePassword = root.getChildByName('Password');
                    nodePassword.getComponent('Password').Show(i, this.type);
                } else {
                    let objMsg = { rid: i };
                    isKing3 ? g_handler.SendKing3LoginMsg(g_connclient, objMsg) :
                        g_handler.SendPower7LoginMsg(g_connclient, objMsg);
                }
            } else {
                let nodeUnlock = root.getChildByName('Unlock');
                nodeUnlock.getComponent('Unlock').Show(i, this.type);
            }
            this.node.active = false;
        }, this);
    }
}

function UpdateRooms() {
    let isKing3 = (this.type === common.Location.KING3);
    for (let i = 1; i <= LOCK_ROOM_COUNT; ++i) {
        let descName = 'Bg/Rooms/Room' + i + '/Desc';
        let headName = 'Bg/Rooms/Room' + i + '/HeadBg/Head';
        let nodeDesc = cc.find(descName, this.node);
        let nodeHead = cc.find(headName, this.node);

        let labelDesc = nodeDesc.getComponent(cc.Label);
        let spriteHead = nodeHead.getComponent(cc.Sprite);

        let room = isKing3 ? g_king3.GetRoom(i) : g_power7.GetRoom(i);
        if (!room || room.pid === 0) {
            labelDesc.string = i + '号房';
            spriteHead.spriteFrame = this.lockSprite;
        } else {
            let descIsEmpty = (room.desc.length === 0);
            labelDesc.string = descIsEmpty ? room.nickname : room.desc;
            spriteHead.spriteFrame = this.headSprite;
            if (room.head.length > 0) {
                g_head.Load(g_head.To64(room.head), function (spriteFrame) {
                    spriteHead.spriteFrame = spriteFrame || this.headSprite;
                });
            }
        }
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        lockSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        headSprite: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    Show(type) {
        this.type = type;
        this.node.active = true;
        if (this.type === common.Location.KING3) {
            this.coinList = constant.KING3_MATCH_BET_LIST;
            this.btnNameList = [
                '10万匹配', '50万匹配', '100万匹配', '200万匹配',
                '500万匹配', '1000万匹配', '2000万匹配', '5000万匹配', '1亿匹配'
            ];
        } else if (this.type === common.Location.POWER7) {
            this.coinList = constant.POWER7_MAX_BET_LIST;
            this.btnNameList = [
                '100万匹配', '200万匹配', '500万匹配', '1000万匹配',
                '2000万匹配', '5000万匹配', '1亿匹配', '2亿匹配', '5亿匹配'
            ];
        }
        for (let i = 0; i < 9; ++i) {
            let nodeBtnTxt = cc.find('Bg/Buttons/' + i + 'Btn/Txt', this.node);
            nodeBtnTxt.getComponent(cc.Label).string = this.btnNameList[i];
        }
        UpdateRooms.call(this);
    },

    start() {
        OnRooms.call(this);

        g_uiemitter.on('UI_KING3_ROOMLIST', function () {
            if (!this.node.active) return;
            UpdateRooms.call(this);
        }.bind(this));

        g_uiemitter.on('UI_POWER7_ROOMLIST', function () {
            if (!this.node.active) return;
            UpdateRooms.call(this);
        }.bind(this));

        for (let i = 0; i < 9; ++i) {
            let nodeBtn = cc.find('Bg/Buttons/' + i + 'Btn', this.node);
            nodeBtn.on(cc.Node.EventType.TOUCH_END, function () {
                OnMatchBtn.call(this, this.coinList[i]);
            }, this);
        }

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
