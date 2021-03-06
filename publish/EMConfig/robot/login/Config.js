"use strict";

const config = {
    log: {
        fileName: 'login.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },

    login: {
        address: 'ws://192.168.1.14:2207',
        loginTime: 100,
        logoutTime: 500,
        errorTest: false,
    },

    players: [
        { account: 'test11', password: '37123456', platform: 1 },
        { account: 'test12', password: '37123456', platform: 1 },
        { account: 'test13', password: '37123456', platform: 1 },
        { account: 'test14', password: '37123456', platform: 1 },
        { account: 'test15', password: '37123456', platform: 1 },
        { account: 'test16', password: '37123456', platform: 1 },
        { account: 'test17', password: '37123456', platform: 1 },
        { account: 'test18', password: '37123456', platform: 1 },
        { account: 'test19', password: '37123456', platform: 1 },
        { account: 'test20', password: '37123456', platform: 1 },
        { account: 'test21', password: '37123456', platform: 1 },
        { account: 'test22', password: '37123456', platform: 1 },
        { account: 'test23', password: '37123456', platform: 1 },
        { account: 'test24', password: '37123456', platform: 1 },
        { account: 'test25', password: '37123456', platform: 1 },
        { account: 'test26', password: '37123456', platform: 1 },
        { account: 'test27', password: '37123456', platform: 1 },
        { account: 'test28', password: '37123456', platform: 1 },
        { account: 'test29', password: '37123456', platform: 1 },
        { account: 'test30', password: '37123456', platform: 1 },
        { account: 'test31', password: '37123456', platform: 1 },
        { account: 'test32', password: '37123456', platform: 1 },
        { account: 'test33', password: '37123456', platform: 1 },
        { account: 'test34', password: '37123456', platform: 1 },
        { account: 'test35', password: '37123456', platform: 1 },
        { account: 'test36', password: '37123456', platform: 1 },
        { account: 'test37', password: '37123456', platform: 1 },
        { account: 'test38', password: '37123456', platform: 1 },
        { account: 'test39', password: '37123456', platform: 1 },
        { account: 'test40', password: '37123456', platform: 1 },
        { account: 'test41', password: '37123456', platform: 1 },
        { account: 'test42', password: '37123456', platform: 1 },
        { account: 'test43', password: '37123456', platform: 1 },
        { account: 'test44', password: '37123456', platform: 1 },
        { account: 'test45', password: '37123456', platform: 1 },
        { account: 'test46', password: '37123456', platform: 1 },
        { account: 'test47', password: '37123456', platform: 1 },
        { account: 'test48', password: '37123456', platform: 1 },
        { account: 'test49', password: '37123456', platform: 1 },
        { account: 'test50', password: '37123456', platform: 1 },
        { account: 'test51', password: '37123456', platform: 1 },
        { account: 'test52', password: '37123456', platform: 1 },
        { account: 'test53', password: '37123456', platform: 1 },
        { account: 'test54', password: '37123456', platform: 1 },
        { account: 'test55', password: '37123456', platform: 1 },
        { account: 'test56', password: '37123456', platform: 1 },
        { account: 'test57', password: '37123456', platform: 1 },
        { account: 'test58', password: '37123456', platform: 1 },
        { account: 'test59', password: '37123456', platform: 1 },
        { account: 'test60', password: '37123456', platform: 1 },
        { account: 'test61', password: '37123456', platform: 1 },
        { account: 'test62', password: '37123456', platform: 1 },
        { account: 'test63', password: '37123456', platform: 1 },
        { account: 'test64', password: '37123456', platform: 1 },
        { account: 'test65', password: '37123456', platform: 1 },
        { account: 'test66', password: '37123456', platform: 1 },
        { account: 'test67', password: '37123456', platform: 1 },
        { account: 'test68', password: '37123456', platform: 1 },
        { account: 'test69', password: '37123456', platform: 1 },
        { account: 'test70', password: '37123456', platform: 1 },
        { account: 'test71', password: '37123456', platform: 1 },
        { account: 'test72', password: '37123456', platform: 1 },
        { account: 'test73', password: '37123456', platform: 1 },
        { account: 'test74', password: '37123456', platform: 1 },
        { account: 'test75', password: '37123456', platform: 1 },
        { account: 'test76', password: '37123456', platform: 1 },
        { account: 'test77', password: '37123456', platform: 1 },
        { account: 'test78', password: '37123456', platform: 1 },
        { account: 'test79', password: '37123456', platform: 1 },
        { account: 'test80', password: '37123456', platform: 1 },
        { account: 'test81', password: '37123456', platform: 1 },
        { account: 'test82', password: '37123456', platform: 1 },
        { account: 'test83', password: '37123456', platform: 1 },
        { account: 'test84', password: '37123456', platform: 1 },
        { account: 'test85', password: '37123456', platform: 1 },
        { account: 'test86', password: '37123456', platform: 1 },
        { account: 'test87', password: '37123456', platform: 1 },
        { account: 'test88', password: '37123456', platform: 1 },
        { account: 'test89', password: '37123456', platform: 1 },
        { account: 'test90', password: '37123456', platform: 1 },
        { account: 'test91', password: '37123456', platform: 1 },
        { account: 'test92', password: '37123456', platform: 1 },
        { account: 'test93', password: '37123456', platform: 1 },
        { account: 'test94', password: '37123456', platform: 1 },
        { account: 'test95', password: '37123456', platform: 1 },
        { account: 'test96', password: '37123456', platform: 1 },
        { account: 'test97', password: '37123456', platform: 1 },
        { account: 'test98', password: '37123456', platform: 1 },
        { account: 'test99', password: '37123456', platform: 1 },
        /*{ account: 'test100', password: '37123456', platform: 1 },
        { account: 'test101', password: '37123456', platform: 1 },
        { account: 'test102', password: '37123456', platform: 1 },
        { account: 'test103', password: '37123456', platform: 1 },
        { account: 'test104', password: '37123456', platform: 1 },
        { account: 'test105', password: '37123456', platform: 1 },
        { account: 'test106', password: '37123456', platform: 1 },
        { account: 'test107', password: '37123456', platform: 1 },
        { account: 'test108', password: '37123456', platform: 1 },
        { account: 'test109', password: '37123456', platform: 1 },
        { account: 'test110', password: '37123456', platform: 1 },
        { account: 'test111', password: '37123456', platform: 1 },
        { account: 'test112', password: '37123456', platform: 1 },
        { account: 'test113', password: '37123456', platform: 1 },
        { account: 'test114', password: '37123456', platform: 1 },
        { account: 'test115', password: '37123456', platform: 1 },
        { account: 'test116', password: '37123456', platform: 1 },
        { account: 'test117', password: '37123456', platform: 1 },
        { account: 'test118', password: '37123456', platform: 1 },
        { account: 'test119', password: '37123456', platform: 1 },
        { account: 'test120', password: '37123456', platform: 1 },
        { account: 'test121', password: '37123456', platform: 1 },
        { account: 'test122', password: '37123456', platform: 1 },
        { account: 'test123', password: '37123456', platform: 1 },
        { account: 'test124', password: '37123456', platform: 1 },
        { account: 'test125', password: '37123456', platform: 1 },
        { account: 'test126', password: '37123456', platform: 1 },
        { account: 'test127', password: '37123456', platform: 1 },
        { account: 'test128', password: '37123456', platform: 1 },
        { account: 'test129', password: '37123456', platform: 1 },
        { account: 'test130', password: '37123456', platform: 1 },
        { account: 'test131', password: '37123456', platform: 1 },
        { account: 'test132', password: '37123456', platform: 1 },
        { account: 'test133', password: '37123456', platform: 1 },
        { account: 'test134', password: '37123456', platform: 1 },
        { account: 'test135', password: '37123456', platform: 1 },
        { account: 'test136', password: '37123456', platform: 1 },
        { account: 'test137', password: '37123456', platform: 1 },
        { account: 'test138', password: '37123456', platform: 1 },
        { account: 'test139', password: '37123456', platform: 1 },
        { account: 'test140', password: '37123456', platform: 1 },
        { account: 'test141', password: '37123456', platform: 1 },
        { account: 'test142', password: '37123456', platform: 1 },
        { account: 'test143', password: '37123456', platform: 1 },
        { account: 'test144', password: '37123456', platform: 1 },
        { account: 'test145', password: '37123456', platform: 1 },
        { account: 'test146', password: '37123456', platform: 1 },
        { account: 'test147', password: '37123456', platform: 1 },
        { account: 'test148', password: '37123456', platform: 1 },
        { account: 'test149', password: '37123456', platform: 1 },
        { account: 'test150', password: '37123456', platform: 1 },
        { account: 'test151', password: '37123456', platform: 1 },
        { account: 'test152', password: '37123456', platform: 1 },
        { account: 'test153', password: '37123456', platform: 1 },
        { account: 'test154', password: '37123456', platform: 1 },
        { account: 'test155', password: '37123456', platform: 1 },
        { account: 'test156', password: '37123456', platform: 1 },
        { account: 'test157', password: '37123456', platform: 1 },
        { account: 'test158', password: '37123456', platform: 1 },
        { account: 'test159', password: '37123456', platform: 1 },
        { account: 'test160', password: '37123456', platform: 1 },
        { account: 'test161', password: '37123456', platform: 1 },
        { account: 'test162', password: '37123456', platform: 1 },
        { account: 'test163', password: '37123456', platform: 1 },
        { account: 'test164', password: '37123456', platform: 1 },
        { account: 'test165', password: '37123456', platform: 1 },
        { account: 'test166', password: '37123456', platform: 1 },
        { account: 'test167', password: '37123456', platform: 1 },
        { account: 'test168', password: '37123456', platform: 1 },
        { account: 'test169', password: '37123456', platform: 1 },
        { account: 'test170', password: '37123456', platform: 1 },
        { account: 'test171', password: '37123456', platform: 1 },
        { account: 'test172', password: '37123456', platform: 1 },
        { account: 'test173', password: '37123456', platform: 1 },
        { account: 'test174', password: '37123456', platform: 1 },
        { account: 'test175', password: '37123456', platform: 1 },
        { account: 'test176', password: '37123456', platform: 1 },
        { account: 'test177', password: '37123456', platform: 1 },
        { account: 'test178', password: '37123456', platform: 1 },
        { account: 'test179', password: '37123456', platform: 1 },
        { account: 'test180', password: '37123456', platform: 1 },
        { account: 'test181', password: '37123456', platform: 1 },
        { account: 'test182', password: '37123456', platform: 1 },
        { account: 'test183', password: '37123456', platform: 1 },
        { account: 'test184', password: '37123456', platform: 1 },
        { account: 'test185', password: '37123456', platform: 1 },
        { account: 'test186', password: '37123456', platform: 1 },
        { account: 'test187', password: '37123456', platform: 1 },
        { account: 'test188', password: '37123456', platform: 1 },
        { account: 'test189', password: '37123456', platform: 1 },
        { account: 'test190', password: '37123456', platform: 1 },
        { account: 'test191', password: '37123456', platform: 1 },
        { account: 'test192', password: '37123456', platform: 1 },
        { account: 'test193', password: '37123456', platform: 1 },
        { account: 'test194', password: '37123456', platform: 1 },
        { account: 'test195', password: '37123456', platform: 1 },
        { account: 'test196', password: '37123456', platform: 1 },
        { account: 'test197', password: '37123456', platform: 1 },
        { account: 'test198', password: '37123456', platform: 1 },
        { account: 'test199', password: '37123456', platform: 1 },*/
        { account: 'test200', password: '37123456', platform: 1 },
        { account: 'test201', password: '37123456', platform: 1 },
        { account: 'test202', password: '37123456', platform: 1 },
        { account: 'test203', password: '37123456', platform: 1 },
        { account: 'test204', password: '37123456', platform: 1 },
        { account: 'test205', password: '37123456', platform: 1 },
        { account: 'test206', password: '37123456', platform: 1 },
        { account: 'test207', password: '37123456', platform: 1 },
        { account: 'test208', password: '37123456', platform: 1 },
        { account: 'test209', password: '37123456', platform: 1 },
        { account: 'test210', password: '37123456', platform: 1 },
        { account: 'test211', password: '37123456', platform: 1 },
        { account: 'test212', password: '37123456', platform: 1 },
        { account: 'test213', password: '37123456', platform: 1 },
        { account: 'test214', password: '37123456', platform: 1 },
        { account: 'test215', password: '37123456', platform: 1 },
        { account: 'test216', password: '37123456', platform: 1 },
        { account: 'test217', password: '37123456', platform: 1 },
        { account: 'test218', password: '37123456', platform: 1 },
        { account: 'test219', password: '37123456', platform: 1 },
        { account: 'test220', password: '37123456', platform: 1 },
        { account: 'test221', password: '37123456', platform: 1 },
        { account: 'test222', password: '37123456', platform: 1 },
        { account: 'test223', password: '37123456', platform: 1 },
        { account: 'test224', password: '37123456', platform: 1 },
        { account: 'test225', password: '37123456', platform: 1 },
        { account: 'test226', password: '37123456', platform: 1 },
        { account: 'test227', password: '37123456', platform: 1 },
        { account: 'test228', password: '37123456', platform: 1 },
        { account: 'test229', password: '37123456', platform: 1 },
        { account: 'test230', password: '37123456', platform: 1 },
        { account: 'test231', password: '37123456', platform: 1 },
        { account: 'test232', password: '37123456', platform: 1 },
        { account: 'test233', password: '37123456', platform: 1 },
        { account: 'test234', password: '37123456', platform: 1 },
        { account: 'test235', password: '37123456', platform: 1 },
        { account: 'test236', password: '37123456', platform: 1 },
        { account: 'test237', password: '37123456', platform: 1 },
        { account: 'test238', password: '37123456', platform: 1 },
        { account: 'test239', password: '37123456', platform: 1 },
        { account: 'test240', password: '37123456', platform: 1 },
        { account: 'test241', password: '37123456', platform: 1 },
        { account: 'test242', password: '37123456', platform: 1 },
        { account: 'test243', password: '37123456', platform: 1 },
        { account: 'test244', password: '37123456', platform: 1 },
        { account: 'test245', password: '37123456', platform: 1 },
        { account: 'test246', password: '37123456', platform: 1 },
        { account: 'test247', password: '37123456', platform: 1 },
        { account: 'test248', password: '37123456', platform: 1 },
        { account: 'test249', password: '37123456', platform: 1 },
        { account: 'test250', password: '37123456', platform: 1 },
        { account: 'test251', password: '37123456', platform: 1 },
        { account: 'test252', password: '37123456', platform: 1 },
        { account: 'test253', password: '37123456', platform: 1 },
        { account: 'test254', password: '37123456', platform: 1 },
        { account: 'test255', password: '37123456', platform: 1 },
        { account: 'test256', password: '37123456', platform: 1 },
        { account: 'test257', password: '37123456', platform: 1 },
        { account: 'test258', password: '37123456', platform: 1 },
        { account: 'test259', password: '37123456', platform: 1 },
        { account: 'test260', password: '37123456', platform: 1 },
        { account: 'test261', password: '37123456', platform: 1 },
        { account: 'test262', password: '37123456', platform: 1 },
        { account: 'test263', password: '37123456', platform: 1 },
        { account: 'test264', password: '37123456', platform: 1 },
        { account: 'test265', password: '37123456', platform: 1 },
        { account: 'test266', password: '37123456', platform: 1 },
        { account: 'test267', password: '37123456', platform: 1 },
        { account: 'test268', password: '37123456', platform: 1 },
        { account: 'test269', password: '37123456', platform: 1 },
        { account: 'test270', password: '37123456', platform: 1 },
        { account: 'test271', password: '37123456', platform: 1 },
        { account: 'test272', password: '37123456', platform: 1 },
        { account: 'test273', password: '37123456', platform: 1 },
        { account: 'test274', password: '37123456', platform: 1 },
        { account: 'test275', password: '37123456', platform: 1 },
        { account: 'test276', password: '37123456', platform: 1 },
        { account: 'test277', password: '37123456', platform: 1 },
        { account: 'test278', password: '37123456', platform: 1 },
        { account: 'test279', password: '37123456', platform: 1 },
        { account: 'test280', password: '37123456', platform: 1 },
        { account: 'test281', password: '37123456', platform: 1 },
        { account: 'test282', password: '37123456', platform: 1 },
        { account: 'test283', password: '37123456', platform: 1 },
        { account: 'test284', password: '37123456', platform: 1 },
        { account: 'test285', password: '37123456', platform: 1 },
        { account: 'test286', password: '37123456', platform: 1 },
        { account: 'test287', password: '37123456', platform: 1 },
        { account: 'test288', password: '37123456', platform: 1 },
        { account: 'test289', password: '37123456', platform: 1 },
        { account: 'test290', password: '37123456', platform: 1 },
        { account: 'test291', password: '37123456', platform: 1 },
        { account: 'test292', password: '37123456', platform: 1 },
        { account: 'test293', password: '37123456', platform: 1 },
        { account: 'test294', password: '37123456', platform: 1 },
        { account: 'test295', password: '37123456', platform: 1 },
        { account: 'test296', password: '37123456', platform: 1 },
        { account: 'test297', password: '37123456', platform: 1 },
        { account: 'test298', password: '37123456', platform: 1 },
        { account: 'test299', password: '37123456', platform: 1 },
        { account: 'test300', password: '37123456', platform: 1 },
    ],
};

module.exports = config;