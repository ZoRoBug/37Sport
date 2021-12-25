// --------------------------------------------------------
// 修改完善发布文件
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const fs = require('fs');

let publishName = '';
process.argv.forEach(function (value, index) {
    if (Number(index) === 2) publishName = value;
});
if (publishName === '') {
    console.error('未传入发布名称参数');
    return;
}

console.log('开始修改web-mobile中index文件');
let pathME = './' + publishName + '/web/me/index.html';
let dataME = String(fs.readFileSync(pathME));
dataME = dataME.replace('Cocos Creator | ', '');
dataME = dataME.replace('})();', '})();if (window.innerWidth >= window.innerHeight) {window.location.href = "/pc/index.html";}');
dataME = dataME.replace('<span style="width: 0%"></span>', '<span style="width: 0%"></span><h3 style="color:white" >第一次加载最多10秒，请耐心等待...</h3>');
fs.writeFile(pathME, dataME, function (error) {
    if (error) console.error(pathME + '写入失败');
});

console.log('开始修改web-desktop中index文件');
let pathPC = './' + publishName + '/web/pc/index.html';
let dataPC = String(fs.readFileSync(pathPC));
dataPC = dataPC.replace('Cocos Creator | ', '');
dataPC = dataPC.replace('<h1 class="header">三七竞技</h1>', '');
dataPC = dataPC.replace('<span style="width: 0%"></span>', '<span style="width: 0%"></span><h3 style="color:white" >第一次加载最多10秒，请耐心等待...</h3>');
dataPC = dataPC.replace('<p class="footer">Created with <a href="http://cocos.com/cocoscreator" title="cocos creator">Cocos Creator</a></p>', '');
dataPC = dataPC.replace('})();', '})();function ResizeWindow() {var sWidth = 540, sHeight = 960;var newWidth = sWidth, newHeight = sHeight;\
    if (window.innerWidth / window.innerHeight < sWidth / sHeight) {newWidth = window.innerWidth - 10;newHeight = Math.floor(newWidth * sHeight / sWidth);\
    } else if (window.innerWidth / window.innerHeight > sWidth / sHeight) {newHeight = window.innerHeight - 10;newWidth = Math.floor(newHeight * sWidth / sHeight);\
    }var gameDiv = document.getElementById("GameDiv");gameDiv.style.width = newWidth + "px";gameDiv.style.height = newHeight + "px";}\
    window.onresize = ResizeWindow;ResizeWindow();if (window.innerWidth < window.innerHeight) {window.location.href = "/me/index.html";}');
fs.writeFile(pathPC, dataPC, function (error) {
    if (error) console.error(pathPC + '写入失败');
});