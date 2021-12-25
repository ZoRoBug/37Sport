// --------------------------------------------------------
// 七雄争霸信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../protocol/Common');
const constant = require('../protocol/Constant');
const protocol = require('../protocol/Protocol');
const MSG_POWER7_GAMEINFO_PWCL = require('../protocol/MSG_POWER7_GAMEINFO_PWCL')['MSG_POWER7_GAMEINFO_PWCL'];
const MSG_POWER7_GAMESTATE_PWCL = require('../protocol/MSG_POWER7_GAMESTATE_PWCL')['MSG_POWER7_GAMESTATE_PWCL'];

let gameInfo = {};
let gameState = {};
let roomList = new Array();

function ClearGameData() {
    gameInfo = {}, gameState = {};
    gameInfo.playerList = new Array(constant.POWER7_PLAYER_COUNT).fill({});
    gameState.playerList = new Array(constant.POWER7_PLAYER_COUNT).fill({});
    gameInfo.msgID = protocol.GetMsgId('MSG_POWER7_GAMEINFO_PWCL');
    gameInfo = MSG_POWER7_GAMEINFO_PWCL.fromObject(gameInfo);
    gameState.msgID = protocol.GetMsgId('MSG_POWER7_GAMESTATE_PWCL');
    gameState = MSG_POWER7_GAMESTATE_PWCL.fromObject(gameState);
}
ClearGameData();

const power7 = {
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
        if (this.IsStarting()) {
            let selfState = this.GetPlayerState(g_player.GetPID());
            if (selfState && !selfState.isOut) {
                let minBetCoin = constant.POWER7_MIN_BETCOIN;
                selfState.betCoin = Math.max(selfState.betCoin, minBetCoin);
            }
        }
    },

    GetPlayerInfo: function (pid) {
        for (let i = 0; i < gameInfo.playerList.length; ++i) {
            let player = gameInfo.playerList[i];
            if (player.pid === pid) return player;
        }
    },

    GetPlayerState: function (pid) {
        for (let i = 0; i < gameState.playerList.length; ++i) {
            let player = gameState.playerList[i];
            if (player.pid === pid) return player;
        }
    },

    IsFull: function () {
        for (let i = 0; i < gameInfo.playerList.length; ++i) {
            if (!gameInfo.playerList[i].pid) return false;
        }
        return true;
    },

    IsPrepare: function () {
        return gameState.state === common.Power7State.PREPARE;
    },

    IsStarting: function () {
        return gameState.state === common.Power7State.STARTING;
    },

    AddPlayer: function (pid) {
        for (let i = 0; i < gameInfo.playerList.length; ++i) {
            if (gameInfo.playerList[i].pid > 0) continue;
            gameInfo.playerList[i].pid = pid;
            break;
        }
    },

    RemovePlayer: function (info) {
        let player = this.GetPlayerInfo(info.pid);
        if (player) player = {};
    },

    AddBetCoin: function (info) {
        let player = this.GetPlayerState(info.pid);
        if (player) player.betCoin += info.betCoin;
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

module.exports = power7;