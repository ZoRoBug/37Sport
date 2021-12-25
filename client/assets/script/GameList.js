const common = require('./protocol/Common');

function OnRoomItem(index, type) {
    let isKing3 = (type === common.Location.KING3);
    let nameTitle = isKing3 ? 'King3' : 'Power7';
    let nodeName = nameTitle + '/Rooms/Room' + index;
    let roomNode = cc.find(nodeName, this.node);
    roomNode.on(cc.Node.EventType.TOUCH_END, function () {
        let root = cc.find('Canvas');
        if (index === 5) {
            let nodeRoomList = root.getChildByName('RoomList');
            nodeRoomList.getComponent('RoomList').Show(type);
        } else {
            let room = isKing3 ? g_king3.GetRoom(index) : g_power7.GetRoom(index);
            if (room && room.pid > 0) {
                if (room.isPassword) {
                    let nodePassword = root.getChildByName('Password');
                    nodePassword.getComponent('Password').Show(index, type);
                } else {
                    let objMsg = { rid: index };
                    isKing3 ? g_handler.SendKing3LoginMsg(g_connclient, objMsg) :
                        g_handler.SendPower7LoginMsg(g_connclient, objMsg);
                }
            } else {
                let nodeUnlock = root.getChildByName('Unlock');
                nodeUnlock.getComponent('Unlock').Show(index, type);
            }
        }
    }, this);
}

function UpdateRooms(type) {
    let isKing3 = (type === common.Location.KING3);
    let nameTitle = isKing3 ? 'King3' : 'Power7';
    for (let i = 1; i <= 4; ++i) {
        let descName = nameTitle + '/Rooms/Room' + i + '/Desc';
        let headName = nameTitle + '/Rooms/Room' + i + '/HeadBg/Head';
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

    start() {
        g_handler.SendKing3RoomListMsg(g_connclient);
        g_handler.SendPower7RoomListMsg(g_connclient);

        UpdateRooms.call(this, common.Location.KING3);
        UpdateRooms.call(this, common.Location.POWER7);
        
        g_uiemitter.on('UI_KING3_ROOMLIST', function () {
            UpdateRooms.call(this, common.Location.KING3);
        }.bind(this));
        g_uiemitter.on('UI_POWER7_ROOMLIST', function () {
            UpdateRooms.call(this, common.Location.POWER7);
        }.bind(this));

        for (let i = 1; i <= 5; ++i) {
            OnRoomItem.call(this, i, common.Location.KING3);
            OnRoomItem.call(this, i, common.Location.POWER7);
            let roomNode = cc.find('Impawn/Rooms/Room' + i, this.node);
            roomNode.on(cc.Node.EventType.TOUCH_END, function () {
                g_handler.SendImpawnLoginMsg(g_connclient);
            }, this);
        }
    },
});
