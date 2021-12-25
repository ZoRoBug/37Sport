@echo off 
echo 删除PRPublish文件夹
IF EXIST PRPublish rmdir /s/q PRPublish
echo ------------------------
echo 把客户端配置修改为发布配置
node AlterCfg PRConfig alter
echo ------------------------
SET cccExePath="D:\Program Files\CocosCreator\CocosCreator.exe"
SET projectPath="..\client"
SET buildPath="..\publish\PRPublish\web"
SET pcBuildParam= "title=三七竞技;platform=web-desktop;buildPath=%buildPath%;startScene=7dCC1hlvNFBIUITq13gbPL;debug=false;sourceMaps=false;inlineSpriteFrames=true;mergeStartScene=true;md5Cache=true;previewWidth=540;previewHeight=960"
SET meBuildParam= "title=三七竞技;platform=web-mobile;buildPath=%buildPath%;startScene=7dCC1hlvNFBIUITq13gbPL;debug=false;sourceMaps=false;inlineSpriteFrames=true;mergeStartScene=true;md5Cache=true;webOrientation=portrait;embedWebDebugger=false;"
echo 开始生成web-mobile...
%cccExePath% --path %projectPath% --build %meBuildParam%  --force
echo 生成web-mobile完成！
echo ------------------------
echo 开始生成web-desktop...
%cccExePath% --path %projectPath% --build %pcBuildParam%  --force
echo 生成web-desktop完成！
echo ------------------------
echo 还原客户端配置
node AlterCfg PRConfig reset
echo ------------------------
echo 把web-mobile文件夹名修改为me
ren .\PRPublish\web\web-mobile me
echo 把web-desktop文件夹名修改为pc
ren .\PRPublish\web\web-desktop pc
echo ------------------------
echo 拷贝LOGO图片到web下替换原图片
COPY .\Web\logo.png .\PRPublish\web\me\splash.03ce1.png /Y
COPY .\Web\logo.png .\PRPublish\web\pc\splash.03ce1.png /Y
echo ------------------------
echo 拷贝index首页到web目录下
COPY .\Web\index.html .\PRPublish\web\index.html /Y
echo ------------------------
node Modify PRPublish
echo ------------------------
echo 【server】开始复制公共文件...
xcopy ..\public .\PRPublish\server\public\ /E /Y /Q
echo 【server】开始复制服务器文件...
xcopy ..\server .\PRPublish\server\server\ /E /Y /Q /exclude:exclude.txt
echo 【server】开始复制消息协议文件...
xcopy ..\protocol .\PRPublish\server\protocol\ /E /Y /Q
echo 【server】开始复制JSON配置文件...
copy ..\package.json .\PRPublish\server\package.json /Y
copy ..\package-lock.json .\PRPublish\server\package-lock.json /Y
echo 【server】把服务器配置替换为仿真配置...
xcopy .\PRConfig\server .\PRPublish\server\server\ /E /Y /Q
echo 【server】开始复制NODE_MODULES文件...
xcopy ..\node_modules .\PRPublish\server\node_modules\ /E /Y /Q
echo ------------------------
echo 【robot】开始复制公共文件...
xcopy ..\public .\PRPublish\robot\public\ /E /Y /Q
echo 【robot】开始复制机器人文件...
xcopy ..\robot .\PRPublish\robot\robot\ /E /Y /Q /exclude:exclude.txt
echo 【robot】开始复制消息协议文件...
xcopy ..\protocol .\PRPublish\robot\protocol\ /E /Y /Q
echo 【robot】开始复制JSON配置文件...
copy ..\package.json .\PRPublish\robot\package.json /Y
copy ..\package-lock.json .\PRPublish\robot\package-lock.json /Y
echo 【robot】把服务器配置替换为仿真配置...
xcopy .\PRConfig\robot .\PRPublish\robot\robot\ /E /Y /Q
echo 【robot】开始复制NODE_MODULES文件...
xcopy ..\node_modules .\PRPublish\robot\node_modules\ /E /Y /Q
echo ------------------------
echo 【sql】开始复制数据库文件...
xcopy .\DataBase\sql .\PRPublish\sql\ /E /Y /Q
echo ------------------------
echo 发布完成！
pause