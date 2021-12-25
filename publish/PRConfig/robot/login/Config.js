"use strict";

const config = {
    log: {
        fileName: 'login.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },

    login: {
        address: 'ws://132.232.53.229:2207',
        loginTime: 100,
        logoutTime: 500,
        errorTest: false,
    },

    players: [
        { account: 'zztest11', password: '37Zz123456', platform: 1 },
        { account: 'zztest12', password: '37Zz123456', platform: 1 },
        { account: 'zztest13', password: '37Zz123456', platform: 1 },
        { account: 'zztest14', password: '37Zz123456', platform: 1 },
        { account: 'zztest15', password: '37Zz123456', platform: 1 },
        { account: 'zztest16', password: '37Zz123456', platform: 1 },
        { account: 'zztest17', password: '37Zz123456', platform: 1 },
        { account: 'zztest18', password: '37Zz123456', platform: 1 },
        { account: 'zztest19', password: '37Zz123456', platform: 1 },
        { account: 'zztest20', password: '37Zz123456', platform: 1 },
        { account: 'zztest21', password: '37Zz123456', platform: 1 },
        { account: 'zztest22', password: '37Zz123456', platform: 1 },
        { account: 'zztest23', password: '37Zz123456', platform: 1 },
        { account: 'zztest24', password: '37Zz123456', platform: 1 },
        { account: 'zztest25', password: '37Zz123456', platform: 1 },
        { account: 'zztest26', password: '37Zz123456', platform: 1 },
        { account: 'zztest27', password: '37Zz123456', platform: 1 },
        { account: 'zztest28', password: '37Zz123456', platform: 1 },
        { account: 'zztest29', password: '37Zz123456', platform: 1 },
        { account: 'zztest30', password: '37Zz123456', platform: 1 },
        { account: 'zztest31', password: '37Zz123456', platform: 1 },
        { account: 'zztest32', password: '37Zz123456', platform: 1 },
        { account: 'zztest33', password: '37Zz123456', platform: 1 },
        { account: 'zztest34', password: '37Zz123456', platform: 1 },
        { account: 'zztest35', password: '37Zz123456', platform: 1 },
        { account: 'zztest36', password: '37Zz123456', platform: 1 },
        { account: 'zztest37', password: '37Zz123456', platform: 1 },
        { account: 'zztest38', password: '37Zz123456', platform: 1 },
        { account: 'zztest39', password: '37Zz123456', platform: 1 },
        { account: 'zztest40', password: '37Zz123456', platform: 1 },
        { account: 'zztest41', password: '37Zz123456', platform: 1 },
        { account: 'zztest42', password: '37Zz123456', platform: 1 },
        { account: 'zztest43', password: '37Zz123456', platform: 1 },
        { account: 'zztest44', password: '37Zz123456', platform: 1 },
        { account: 'zztest45', password: '37Zz123456', platform: 1 },
        { account: 'zztest46', password: '37Zz123456', platform: 1 },
        { account: 'zztest47', password: '37Zz123456', platform: 1 },
        { account: 'zztest48', password: '37Zz123456', platform: 1 },
        { account: 'zztest49', password: '37Zz123456', platform: 1 },
        { account: 'zztest50', password: '37Zz123456', platform: 1 },
        { account: 'zztest51', password: '37Zz123456', platform: 1 },
        { account: 'zztest52', password: '37Zz123456', platform: 1 },
        { account: 'zztest53', password: '37Zz123456', platform: 1 },
        { account: 'zztest54', password: '37Zz123456', platform: 1 },
        { account: 'zztest55', password: '37Zz123456', platform: 1 },
        { account: 'zztest56', password: '37Zz123456', platform: 1 },
        { account: 'zztest57', password: '37Zz123456', platform: 1 },
        { account: 'zztest58', password: '37Zz123456', platform: 1 },
        { account: 'zztest59', password: '37Zz123456', platform: 1 },
        { account: 'zztest60', password: '37Zz123456', platform: 1 },
        { account: 'zztest61', password: '37Zz123456', platform: 1 },
        { account: 'zztest62', password: '37Zz123456', platform: 1 },
        { account: 'zztest63', password: '37Zz123456', platform: 1 },
        { account: 'zztest64', password: '37Zz123456', platform: 1 },
        { account: 'zztest65', password: '37Zz123456', platform: 1 },
        { account: 'zztest66', password: '37Zz123456', platform: 1 },
        { account: 'zztest67', password: '37Zz123456', platform: 1 },
        { account: 'zztest68', password: '37Zz123456', platform: 1 },
        { account: 'zztest69', password: '37Zz123456', platform: 1 },
        { account: 'zztest70', password: '37Zz123456', platform: 1 },
        { account: 'zztest71', password: '37Zz123456', platform: 1 },
        { account: 'zztest72', password: '37Zz123456', platform: 1 },
        { account: 'zztest73', password: '37Zz123456', platform: 1 },
        { account: 'zztest74', password: '37Zz123456', platform: 1 },
        { account: 'zztest75', password: '37Zz123456', platform: 1 },
        { account: 'zztest76', password: '37Zz123456', platform: 1 },
        { account: 'zztest77', password: '37Zz123456', platform: 1 },
        { account: 'zztest78', password: '37Zz123456', platform: 1 },
        { account: 'zztest79', password: '37Zz123456', platform: 1 },
        { account: 'zztest80', password: '37Zz123456', platform: 1 },
        { account: 'zztest81', password: '37Zz123456', platform: 1 },
        { account: 'zztest82', password: '37Zz123456', platform: 1 },
        { account: 'zztest83', password: '37Zz123456', platform: 1 },
        { account: 'zztest84', password: '37Zz123456', platform: 1 },
        { account: 'zztest85', password: '37Zz123456', platform: 1 },
        { account: 'zztest86', password: '37Zz123456', platform: 1 },
        { account: 'zztest87', password: '37Zz123456', platform: 1 },
        { account: 'zztest88', password: '37Zz123456', platform: 1 },
        { account: 'zztest89', password: '37Zz123456', platform: 1 },
        { account: 'zztest90', password: '37Zz123456', platform: 1 },
        { account: 'zztest91', password: '37Zz123456', platform: 1 },
        { account: 'zztest92', password: '37Zz123456', platform: 1 },
        { account: 'zztest93', password: '37Zz123456', platform: 1 },
        { account: 'zztest94', password: '37Zz123456', platform: 1 },
        { account: 'zztest95', password: '37Zz123456', platform: 1 },
        { account: 'zztest96', password: '37Zz123456', platform: 1 },
        { account: 'zztest97', password: '37Zz123456', platform: 1 },
        { account: 'zztest98', password: '37Zz123456', platform: 1 },
        { account: 'zztest99', password: '37Zz123456', platform: 1 },
    ],
};

module.exports = config;