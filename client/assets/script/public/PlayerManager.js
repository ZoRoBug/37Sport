// --------------------------------------------------------
// 玩家个人信息管理
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const utility = require('./Utility');
const common = require('../protocol/Common');

let propList = [];
let playerInfo = {};

const player = {
    GetProp: function (id, isFormat) {
        if (typeof id != 'number') return;
        let count = propList[id] ? propList[id] : 0;
        return isFormat ? utility.SplitStr(count) : count;
    },

    SetProp: function (id, count) {
        if (typeof id != 'number') return;
        if (typeof count != 'number' || count === 0) return true;
        let oldCount = propList[id] ? propList[id] : 0;
        let newCount = oldCount + count;
        if (newCount < 0) return;
        propList[id] = newCount;
        return true;
    },

    SetPropList: function (props) {
        for (let i = 0, len = props.length; i < len; ++i) {
            propList[props[i].id] = props[i].count;
        }
    },

    SetPlayerInfo: function (pi) {
        playerInfo = pi;
    },

    GetPID: function () {
        return playerInfo.pid;
    },

    GetHead: function () {
        return playerInfo.head;
    },

    GetNickname: function () {
        return playerInfo.nickname;
    },

    SetNickname: function (name) {
        playerInfo.nickname = name;
    },

    IsAdmin: function () {
        return (playerInfo.identity === common.Identity.ADMIN);
    }
};

module.exports = player;