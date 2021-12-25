"use strict";

const config = {
    log: {
        fileName: 'impawn.log',
        consoleLevel: 'verbose',
        fileLevel: 'info',
    },

    login: {
        address: 'ws://192.168.1.14:2207',
        loginTime: 300,
        logoutTime: 300,
    },

    impawn: {
        loginTime: 300,
        logoutTime: 300,

        betMin: 10000, // 最小押分
        betMax: 500000, // 最大押分
        betRate: 0.1, // 押分概率
        tailRate: 0.1, // 加尾概率
        betCount: 3, // 每人押分次数
        betChuRate: 0.3, // 押楚概率，0.5=随机，1=押楚，0=押汉

        betGapTime: 100, // 押分间隔时间ms
        minBetTime: 10000, // 最小押分时间ms
        maxBetTime: 48000, // 最大押分时间ms
    },

    players: [
        { account: 'test100', password: '37123456', platform: 1 },
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
        { account: 'test199', password: '37123456', platform: 1 },
        /*{ account: 'test200', password: '37123456', platform: 1 },
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
        { account: 'test301', password: '37123456', platform: 1 },
        { account: 'test302', password: '37123456', platform: 1 },
        { account: 'test303', password: '37123456', platform: 1 },
        { account: 'test304', password: '37123456', platform: 1 },
        { account: 'test305', password: '37123456', platform: 1 },
        { account: 'test306', password: '37123456', platform: 1 },
        { account: 'test307', password: '37123456', platform: 1 },
        { account: 'test308', password: '37123456', platform: 1 },
        { account: 'test309', password: '37123456', platform: 1 },
        { account: 'test310', password: '37123456', platform: 1 },
        { account: 'test311', password: '37123456', platform: 1 },
        { account: 'test312', password: '37123456', platform: 1 },
        { account: 'test313', password: '37123456', platform: 1 },
        { account: 'test314', password: '37123456', platform: 1 },
        { account: 'test315', password: '37123456', platform: 1 },
        { account: 'test316', password: '37123456', platform: 1 },
        { account: 'test317', password: '37123456', platform: 1 },
        { account: 'test318', password: '37123456', platform: 1 },
        { account: 'test319', password: '37123456', platform: 1 },
        { account: 'test320', password: '37123456', platform: 1 },
        { account: 'test321', password: '37123456', platform: 1 },
        { account: 'test322', password: '37123456', platform: 1 },
        { account: 'test323', password: '37123456', platform: 1 },
        { account: 'test324', password: '37123456', platform: 1 },
        { account: 'test325', password: '37123456', platform: 1 },
        { account: 'test326', password: '37123456', platform: 1 },
        { account: 'test327', password: '37123456', platform: 1 },
        { account: 'test328', password: '37123456', platform: 1 },
        { account: 'test329', password: '37123456', platform: 1 },
        { account: 'test330', password: '37123456', platform: 1 },
        { account: 'test331', password: '37123456', platform: 1 },
        { account: 'test332', password: '37123456', platform: 1 },
        { account: 'test333', password: '37123456', platform: 1 },
        { account: 'test334', password: '37123456', platform: 1 },
        { account: 'test335', password: '37123456', platform: 1 },
        { account: 'test336', password: '37123456', platform: 1 },
        { account: 'test337', password: '37123456', platform: 1 },
        { account: 'test338', password: '37123456', platform: 1 },
        { account: 'test339', password: '37123456', platform: 1 },
        { account: 'test340', password: '37123456', platform: 1 },
        { account: 'test341', password: '37123456', platform: 1 },
        { account: 'test342', password: '37123456', platform: 1 },
        { account: 'test343', password: '37123456', platform: 1 },
        { account: 'test344', password: '37123456', platform: 1 },
        { account: 'test345', password: '37123456', platform: 1 },
        { account: 'test346', password: '37123456', platform: 1 },
        { account: 'test347', password: '37123456', platform: 1 },
        { account: 'test348', password: '37123456', platform: 1 },
        { account: 'test349', password: '37123456', platform: 1 },
        { account: 'test350', password: '37123456', platform: 1 },
        { account: 'test351', password: '37123456', platform: 1 },
        { account: 'test352', password: '37123456', platform: 1 },
        { account: 'test353', password: '37123456', platform: 1 },
        { account: 'test354', password: '37123456', platform: 1 },
        { account: 'test355', password: '37123456', platform: 1 },
        { account: 'test356', password: '37123456', platform: 1 },
        { account: 'test357', password: '37123456', platform: 1 },
        { account: 'test358', password: '37123456', platform: 1 },
        { account: 'test359', password: '37123456', platform: 1 },
        { account: 'test360', password: '37123456', platform: 1 },
        { account: 'test361', password: '37123456', platform: 1 },
        { account: 'test362', password: '37123456', platform: 1 },
        { account: 'test363', password: '37123456', platform: 1 },
        { account: 'test364', password: '37123456', platform: 1 },
        { account: 'test365', password: '37123456', platform: 1 },
        { account: 'test366', password: '37123456', platform: 1 },
        { account: 'test367', password: '37123456', platform: 1 },
        { account: 'test368', password: '37123456', platform: 1 },
        { account: 'test369', password: '37123456', platform: 1 },
        { account: 'test370', password: '37123456', platform: 1 },
        { account: 'test371', password: '37123456', platform: 1 },
        { account: 'test372', password: '37123456', platform: 1 },
        { account: 'test373', password: '37123456', platform: 1 },
        { account: 'test374', password: '37123456', platform: 1 },
        { account: 'test375', password: '37123456', platform: 1 },
        { account: 'test376', password: '37123456', platform: 1 },
        { account: 'test377', password: '37123456', platform: 1 },
        { account: 'test378', password: '37123456', platform: 1 },
        { account: 'test379', password: '37123456', platform: 1 },
        { account: 'test380', password: '37123456', platform: 1 },
        { account: 'test381', password: '37123456', platform: 1 },
        { account: 'test382', password: '37123456', platform: 1 },
        { account: 'test383', password: '37123456', platform: 1 },
        { account: 'test384', password: '37123456', platform: 1 },
        { account: 'test385', password: '37123456', platform: 1 },
        { account: 'test386', password: '37123456', platform: 1 },
        { account: 'test387', password: '37123456', platform: 1 },
        { account: 'test388', password: '37123456', platform: 1 },
        { account: 'test389', password: '37123456', platform: 1 },
        { account: 'test390', password: '37123456', platform: 1 },
        { account: 'test391', password: '37123456', platform: 1 },
        { account: 'test392', password: '37123456', platform: 1 },
        { account: 'test393', password: '37123456', platform: 1 },
        { account: 'test394', password: '37123456', platform: 1 },
        { account: 'test395', password: '37123456', platform: 1 },
        { account: 'test396', password: '37123456', platform: 1 },
        { account: 'test397', password: '37123456', platform: 1 },
        { account: 'test398', password: '37123456', platform: 1 },
        { account: 'test399', password: '37123456', platform: 1 },
        { account: 'test400', password: '37123456', platform: 1 },*/
    ],
};

module.exports = config;