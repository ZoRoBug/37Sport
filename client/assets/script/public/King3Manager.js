// --------------------------------------------------------
// 三国鼎立信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../protocol/Common');
const protocol = require('../protocol/Protocol');
const MSG_KING3_GAMEINFO_KGCL = require('../protocol/MSG_KING3_GAMEINFO_KGCL')['MSG_KING3_GAMEINFO_KGCL'];
const MSG_KING3_GAMESTATE_KGCL = require('../protocol/MSG_KING3_GAMESTATE_KGCL')['MSG_KING3_GAMESTATE_KGCL'];

let gameInfo = {};
let gameState = {};
let roomList = new Array();

function ClearGameData() {
    gameInfo = {}, gameState = {};
    gameInfo.msgID = protocol.GetMsgId('MSG_KING3_GAMEINFO_KGCL');
    gameInfo = MSG_KING3_GAMEINFO_KGCL.fromObject(gameInfo);
    gameState.msgID = protocol.GetMsgId('MSG_KING3_GAMESTATE_KGCL');
    gameState = MSG_KING3_GAMESTATE_KGCL.fromObject(gameState);
}
ClearGameData();

const king3 = {
    GetRID: function () {
        return gameState.rid;
    },

    GetGameInfo: function () {
        return gameInfo;
    },

    SetGameInfo: function (info) {
        gameInfo = info;
    },

    GetGameState: function () {
        return gameState;
    },

    SetGameState: function (info) {
        gameState = info;
    },

    IsPlayer: function (pid) {
        return (gameInfo.pid1 === pid || gameInfo.pid2 === pid);
    },

    IsPrepare: function () {
        return gameState.state === common.King3State.PREPARE;
    },

    IsStarting: function () {
        return gameState.state === common.King3State.STARTING;
    },

    GetObject: function (pid) {
        if (!pid) return;
        if (gameInfo.pid1 === pid) {
            return gameState.p1Object;
        } else if (gameInfo.pid2 === pid) {
            return gameState.p2Object;
        }
    },

    PlayObject: function (info) {
        if (!info.pid) return;
        if (info.rid !== this.GetRID()) return;
        if (gameInfo.pid1 === info.pid) {
            gameState.p1Object = info.object;
        } else if (gameInfo.pid2 === info.pid) {
            gameState.p2Object = info.object;
        }
    },

    RemovePlayer: function (info) {
        if (info.rid !== this.GetRID()) return;
        if (gameInfo.pid1 === info.pid) {
            gameInfo.pid1 = 0;
        } else if (gameInfo.pid2 === info.pid) {
            gameInfo.pid2 = 0;
        }
    },

    RemoveObject: function (info) {
        if (info.rid !== this.GetRID()) return;
        if (gameInfo.pid1 === info.pid) {
            gameState.p1Object = 0;
        } else if (gameInfo.pid2 === info.pid) {
            gameState.p2Object = 0;
        }
    },

    UpdateRoom: function (ri) {
        roomList[ri.rid] = ri;
    },

    GetRoom: function (rid) {
        return roomList[rid];
    },

    ClearData: function () {
        ClearGameData();
    },
};

module.exports = king3;