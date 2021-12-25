// --------------------------------------------------------
// 楚汉相争信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../protocol/Common');
const constant = require('../protocol/Constant');
const protocol = require('../protocol/Protocol');
const MSG_IMPAWN_GAMEINFO_IMCL = require('../protocol/MSG_IMPAWN_GAMEINFO_IMCL')['MSG_IMPAWN_GAMEINFO_IMCL'];
const MSG_IMPAWN_GAMESTATE_IMCL = require('../protocol/MSG_IMPAWN_GAMESTATE_IMCL')['MSG_IMPAWN_GAMESTATE_IMCL'];

let gameInfo = {};
let gameState = {};

function SortImpawnList(impawn1, impawn2) {
    return impawn2.betSum - impawn1.betSum;
}

function ClearGameData() {
    gameInfo = {}, gameState = {};
    gameInfo.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMEINFO_IMCL');
    gameInfo = MSG_IMPAWN_GAMEINFO_IMCL.fromObject(gameInfo);
    gameState.msgID = protocol.GetMsgId('MSG_IMPAWN_GAMESTATE_IMCL');
    gameState = MSG_IMPAWN_GAMESTATE_IMCL.fromObject(gameState);
}
ClearGameData();

const impawn = {
    GetGameInfo: function () {
        return gameInfo;
    },

    GetGameState: function () {
        return gameState;
    },

    SetGameInfo: function (info) {
        if (info.pid > 0) {
            gameInfo = info;
        } else {
            gameInfo.chuAwardRate = info.chuAwardRate;
            gameInfo.hanAwardRate = info.hanAwardRate;
            gameInfo.chuImpawnTotal = info.chuImpawnTotal;
            gameInfo.hanImpawnTotal = info.hanImpawnTotal;
        }
    },

    SetGameState: function (info) {
        if (gameState.round > 0 && info.state === common.ImpawnState.STARTING) {
            let chuImpawnTotal = gameInfo.chuImpawnTotal;
            let hanImpawnTotal = gameInfo.hanImpawnTotal;
            let isChuWin = constant.ImpawnResult(chuImpawnTotal, hanImpawnTotal);
            if (isChuWin !== null) {
                gameInfo.recordList.push(isChuWin);
                isChuWin ? gameInfo.chuWinRecord++ : gameInfo.hanWinRecord++;
            }
            gameInfo.impawnList = [];
            gameInfo.chuAwardRate = 100, gameInfo.hanAwardRate = 100;
            gameInfo.chuImpawnTotal = 0, gameInfo.hanImpawnTotal = 0;
            gameInfo.playerChuImpawnTimes = 0, gameInfo.playerHanImpawnTimes = 0;
            gameInfo.playerChuImpawnTotal = 0, gameInfo.playerHanImpawnTotal = 0;
        }
        gameState = info;
    },

    AddNewBet: function (info) {
        if (info.pid === 0) {
            gameInfo.impawnList.push(info);
            gameInfo.impawnList.sort(SortImpawnList);
        }
        if (g_player.GetPID() === info.pid || g_player.GetNickname() === info.nickname) {
            if (info.isChu) gameInfo.playerChuImpawnTotal += info.betSum;
            if (!info.isChu) gameInfo.playerHanImpawnTotal += info.betSum;
        }
    },

    GetBetTimes: function () {
        return gameInfo.playerChuImpawnTimes + gameInfo.playerHanImpawnTimes;
    },

    IsStarting: function () {
        return (gameState.state === common.ImpawnState.STARTING);
    },

    IsBetChu: function () {
        if (gameInfo.playerChuImpawnTimes > 0) return true;
        if (gameInfo.playerHanImpawnTimes > 0) return false;
        return null;
    },

    ClearData: function () {
        ClearGameData();
    },
};

module.exports = impawn;