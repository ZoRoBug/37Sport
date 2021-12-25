// --------------------------------------------------------
// 三国鼎立核心逻辑
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const Room = require('./Room');
const config = require('./Config');
const round = require('../common/Round');
const dblog = require('../../protocol/DBLog');
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const LOGIN = require('../../protocol/MSG_KING3_LOGIN_KGCL')['MSG_KING3_LOGIN_KGCL'];
const PREPARE = require('../../protocol/MSG_KING3_PREPARE_FAIL_KGCL')['MSG_KING3_PREPARE_FAIL_KGCL'];
const PLAYOBJECT = require('../../protocol/MSG_KING3_PLAYOBJECT_KGCL')['MSG_KING3_PLAYOBJECT_KGCL'];

function Logout(room, pid) {
    if (!room || !pid) return;
    room.Leave(pid);
    if (room.ViewerCount() === 0 && room.PlayerCount() === 0) {
        let rid = room.GetRID();
        this.roomList.delete(rid);
        this.SendRoom(rid);
        this.BackRID(rid);
    }
}

function ClearPlayerWinLoss() {
    let nowDate = new Date();
    let cfgHour = config.king3.clearWinLossHour;
    if (nowDate.getHours() !== cfgHour) return;
    let nowDay = nowDate.format('yyyy-MM-dd');
    if (this.clearWinLossDate === nowDay) return;
    this.clearWinLossDate = nowDay;
    this.playerList.clear();
}

const king3 = {
    Init: function () {
        round.Init('KING3_ROUND');
        this.roomList = new Map();
        this.ridList = new Array();
        this.playerList = new Map();
        this.ridIndex = config.king3.lockRoomMaxID;
        setInterval(function () {
            ClearPlayerWinLoss.call(this);
        }.bind(this), 60000);
    },

    Uninit: function () {
        this.ridList = [];
        this.roomList.clear();
        this.playerList.clear();
    },

    NewRID: function () {
        if (this.ridList.length > 0) return this.ridList.shift();
        if (this.ridIndex >= config.king3.matchRoomMaxID) return;
        return ++this.ridIndex;
    },

    BackRID: function (rid) {
        if (rid <= config.king3.lockRoomMaxID) return;
        this.ridList.push(rid);
    },

    Login: function (msg) {
        if (!round.IsReady()) {
            msg.result = LOGIN.Result.NOT_READY;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            return;
        }

        if (msg.rid > config.king3.matchRoomMaxID ||
            msg.desc.length > constant.ROOM_DESC_MAX_SIZE ||
            msg.password.length > constant.ROOM_PASSWORD_MAX_SIZE) {
            msg.result = LOGIN.Result.PARAM_ERROR;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            return;
        }

        if (msg.rid === 0) {
            let betCoinList = constant.KING3_MATCH_BET_LIST;
            for (let i = 0, len = betCoinList.length; i < len; ++i) {
                if (betCoinList[i] === msg.betCoin) break;
                if (i === len - 1) {
                    msg.result = LOGIN.Result.PARAM_ERROR;
                    g_handler.SendKing3LoginMsg(g_cnclients, msg);
                    return;
                }
            }

            let enterRoom = null;
            for (let room of this.roomList.values()) {
                if (room.IsStarting()) continue;
                if (room.GetBetCoin() !== msg.betCoin) continue;
                if (room.GetRID() <= config.king3.lockRoomMaxID) continue;
                if (room.ViewerCount() < constant.KING3_PLAYER_COUNT) {
                    enterRoom = room;
                    break;
                }
            }
            if (enterRoom === null) {
                let rid = this.NewRID();
                if (!rid) {
                    msg.result = LOGIN.Result.ROOM_FULL;
                    g_handler.SendKing3LoginMsg(g_cnclients, msg);
                    return;
                }
                enterRoom = new Room(rid, msg.betCoin);
                this.roomList.set(rid, enterRoom);
            }

            msg.rid = enterRoom.GetRID();
            msg.result = LOGIN.Result.SUCCESS;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            enterRoom.Enter(msg.pid);
            return;
        }

        let enterRoom = this.roomList.get(msg.rid);
        if (enterRoom) {
            if (msg.cost > 0) {
                msg.result = LOGIN.Result.OTHER_UNLOCK;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
            } else if (enterRoom.GetPassword() !== msg.password) {
                msg.result = LOGIN.Result.PASSWORD_ERROR;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
            } else if (enterRoom.ViewerCount() >= config.king3.maxPlayerCount) {
                msg.result = LOGIN.Result.FULL_PLAYER;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
            } else {
                msg.result = LOGIN.Result.SUCCESS;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                enterRoom.Enter(msg.pid);
            }
            return;
        }

        if (msg.rid > config.king3.lockRoomMaxID ||
            msg.betCoin < constant.KING3_MIN_BETCOIN) {
            msg.result = LOGIN.Result.PARAM_ERROR;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            return;
        }

        if (msg.cost !== constant.KING3_UNLOCK_COST) {
            msg.result = LOGIN.Result.UNLOCK_COST_ERROR;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            return;
        }

        g_gmredis.Watch(g_player.GetKey(msg.pid), async function (err) {
            if (err) {
                g_gmredis.Unwatch();
                msg.result = LOGIN.Result.REDIS_ERROR;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                g_log.Error(err);
                return;
            }

            let cmds = g_player.FillCmd(msg.pid, [
                ['HGET', common.PropID.COIN],
                ['HGET', 'head'],
                ['HGET', 'nickname']
            ]);
            let replies = await g_gmredis.Batch(cmds);
            if (replies === null) {
                g_gmredis.Unwatch();
                msg.result = LOGIN.Result.REDIS_ERROR;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                return;
            }

            let coin = replies[0] ? Number(replies[0]) : 0;
            let head = replies[1], nickname = replies[2];
            if (coin < msg.cost) {
                g_gmredis.Unwatch();
                msg.result = LOGIN.Result.COIN_NOT_ENOUGH;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                return;
            }

            if (this.roomList.get(msg.rid)) {
                g_gmredis.Unwatch();
                msg.result = LOGIN.Result.OTHER_UNLOCK;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                return;
            }

            cmds = g_player.FillCmd(msg.pid, [['HSET', common.PropID.COIN, coin - msg.cost]]);
            let result = await g_gmredis.Multi(cmds);
            if (result === null || !result) {
                msg.result = LOGIN.Result.REDIS_ERROR;
                g_handler.SendKing3LoginMsg(g_cnclients, msg);
                return;
            }

            let msgLog = {
                pid: msg.pid, propID: common.PropID.COIN,
                update: -msg.cost, result: coin - msg.cost,
                reason: common.Reason.KING3_UNLOCK,
                time: (new Date()).format('yyyy-MM-dd hh:mm:ss')
            };
            let msgLogData = dblog.DBUpdateLog.encode(msgLog).finish();
            g_dbredis.Batch([['RPUSH', 'update_log', msgLogData]], function (err) {
                if (err) g_log.Matter('保存道具更新日志失败：%s', JSON.stringify(msgLog));
            });

            let newRoom = new Room(msg.rid, msg.betCoin);
            this.roomList.set(msg.rid, newRoom);
            newRoom.SetRoomInfo(msg.desc, msg.password, {
                pid: msg.pid, head: head, nickname: nickname
            });
            msg.result = LOGIN.Result.SUCCESS;
            g_handler.SendKing3LoginMsg(g_cnclients, msg);
            this.SendRoom(msg.rid);
            newRoom.Enter(msg.pid);
        }.bind(this));
    },

    Logout: function (msg) {
        if (!round.IsReady()) return;
        if (msg.rid) {
            let room = this.roomList.get(msg.rid);
            Logout.call(this, room, msg.pid);
        } else {
            for (let room of this.roomList.values()) {
                Logout.call(this, room, msg.pid);
            }
        }
    },

    Prepare: function (msg) {
        if (!round.IsReady()) return;
        let room = this.roomList.get(msg.rid);
        if (room) {
            room.Prepare(msg);
        } else {
            msg.reason = PREPARE.Reason.NO_THIS_ROOM;
            g_handler.SendKing3PrepareMsg(g_cnclients, msg);
        }
    },

    PlayObject: function (msg) {
        if (!round.IsReady()) return;
        let room = this.roomList.get(msg.rid);
        if (room) {
            room.PlayObject(msg);
        } else {
            msg.result = PLAYOBJECT.Result.NO_THIS_ROOM;
            g_handler.SendKing3PlayObjectMsg(g_cnclients, msg);
        }
    },

    ApplyRoomList: function (msg) {
        let roomList = new Array();
        for (let i = 1; i <= config.king3.lockRoomMaxID; ++i) {
            let room = this.roomList.get(i);
            if (room) roomList.push(room.GetRoomInfo());
        }
        g_handler.SendKing3RoomListMsg(g_cnclients, {
            pid: msg.pid, roomList: roomList
        });
    },

    SendRoom: function (rid) {
        if (rid > config.king3.lockRoomMaxID) return;
        let room = this.roomList.get(rid);
        let roomInfo = room ? room.GetRoomInfo() : { rid: rid };
        g_handler.SendKing3RoomListMsg(g_cnclients, { roomList: [roomInfo] });
    },

    IsOverMaxLoss: function (pid) {
        let player = this.playerList.get(pid);
        let winLoss = player ? player.winLossCoin : 0;
        return -winLoss >= config.king3.maxLossCoin;
    },

    UpdatePlayerWinLoss: function (pid, winLossCoin) {
        if (winLossCoin === 0) return;
        let player = this.playerList.get(pid);
        if (!player) {
            player = { winLossCoin: 0 };
            this.playerList.set(pid, player);
        }
        player.winLossCoin += winLossCoin;
    },

    GetMinRound: function () {
        let minRound = null;
        for (let room of this.roomList.values()) {
            let roomRound = room.GetRound();
            if (!roomRound) continue;
            if (!minRound) {
                minRound = roomRound;
            } else {
                minRound = Math.min(minRound, roomRound);
            }
        }
        return minRound ? minRound : round.GetRound();
    },
};

module.exports = king3;