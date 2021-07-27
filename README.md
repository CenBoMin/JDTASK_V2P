# 简介

- JDTASK_V2P - **Docker环境**下,搭建用elecV2P执行JDTASK的方案
- 脚本基础库来自：
>  JDHelloWorld：https://github.com/JDHelloWorld/jd_scripts

>  Aaron-lv:https://github.com/Aaron-lv/sync/tree/jd_scripts

>  shufflewzc:https://github.com/shufflewzc/faker2

>  curtinlv:https://github.com/curtinlv/JD-Script

>  smiek2221:https://github.com/smiek2221/scripts

>  写程序的思路来自v4和青龙qinglong:https://github.com/whyour/qinglong


# 基础功能

- [x] 简易安装
- [x] 根据订阅,自动更新脚本和任务
- [x] 自动更新脚本所需NodeJS依赖
- [x] 使用原V2P内的JDCookie:CookieJD/CookieJD2/CookiesJD
- [x] 支持py脚本运行
- [x] 账号内自动提取互助码互助
- [ ] TGBOT交互(开发中...)
- [ ] 其他功能（到时候看看）




# 安装/INSTALL

**程序开放权限极大，建议局域网使用。网络部署，风险自负**

![](https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/PNGFile/inti.png)

### STEP1:添加订阅任务
- → 添加订阅任务  
- → 添加订阅JDTASK_V2P:
```
https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/JDTaskV2P.autotask.json
```
- → 获取内容
- → 全部添加 (会自动执行JDTASK_V2P初始化和JDTASKV2P模块的安装）
- → 保存当前任务列表

### STEP2:初始化安装环境
- → 🌟 JDTASK安装 - 执行倒计时任务等待系统重启提示,在进行下一步

### STEP3:添加执行需要的Cookie
- → 【JS 文件管理】→【store/cookie 常量储存管理】:添加以下cookie值（数据类型TYPE string）
- → 👉 v2purl：主页地址  
- → 👉 v2token：WEBHOOK TOKEN
> 上面两个值,可以在【设置】页面找到，如果cookie已经有值,本步可以忽略...

### STEP4:更新脚本列表
- → 🌟 手动更新任务列表 - 执行完毕刷新页面,确定任务已添加成功

### STEP5:通知sendNotify.js
- → 【JS 文件管理】→【加载 JS 文件至服务器】→ 开始推送
```
https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/JDScriptsBak/sendNotify.js
```
- 填写TG通知的相关内容（需代理）
- 在JSMANAGE → 当前服务器 JS 文件 框内输入 → sendNotify.js
- 保存至服务器 ctrl+s

### 恭喜你配置完成🎉,后期任务会根据订阅自动更新,任务详情请见：https://github.com/CenBoMin/JDTASK_V2P/blob/main/JDtaskList.yaml




# JDcookie
- 以上环境以及搭建好了，需要添加JDcookie值（即CookieJD/CookieJD2/CookiesJD这三个)
- 由于有许多种方式,只介绍自己目前使用的两种...

- 另外也可以参照[@Oreomeow](https://github.com/Oreomeow)JDCK填写指南:https://github.com/Oreomeow/VIP/blob/main/INS/Vtop/Tutorial.md#v2p-tutorial

## 第一种方式:BOXJS.Cookie上传V2P服务脚本


- 打开重写获取京东Cookie：
- 1.微信访问含有会员机制的京东自营店会员页面
- 2.访问京东APP内嵌了H5页面：后台杀京东APP后再进入或进首页的免费水果都可获取
- 3.复制 https://bean.m.jd.com/bean/signIndex.action 或 https://home.m.jd.com/myJd/newhome.action 地址到浏览器打开，登录后可自动获取Cookie，没成功就登录后再次访问下之前复制的地址

然后在添加定时脚本，建议每天一次cron或者手动执行...

- ztxtop多账号重写订阅:
```
https://raw.githubusercontent.com/ztxtop/x/main/subscribe/rewrite-jd.plugin
```
- 脚本:
```
https://raw.githubusercontent.com/CenBoMin/GithubSync/main/ELECV2PJS/PushBoxjsCookie_elecV2p.js
```

## 第二种方式:本地JD扫码服务(扫码未弹窗,请自行去设置-重启动elecv2p)


![](https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/PNGFile/cookie.png)

直接执行TASK任务的JDCookie扫码服务，扫码获取JDcookie，多试至少两次


- 来自elecV2P大佬的自用本地版本https://github.com/elecV2/elecV2P-dei/blob/master/examples/JSTEST/getJDCookie.elecV2P.js


# 任务
- 有时间就同步更新关注库的Task订阅:https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/JDTaskV2P.autotask.json
- 任务cron和执行脚本对照：https://github.com/CenBoMin/JDTASK_V2P/blob/main/JDtaskList.yaml


# 问题&文档

关于一些使用问题的查询：
- 1.elecV2P说明文档及一些例程: [https://github.com/elecV2/elecV2P-dei](https://github.com/elecV2/elecV2P-dei)
- 2.TG 交流群讨论: https://t.me/elecV2G


# 注意

- 本程序仅供交流学习使用，请勿使用本程序进行商业行为
- 使用本程序所产生的一切责任自负。
> 欢迎任何人参与和完善：一个人可以走的很快，但是一群人却可以走的更远


# 致谢
>  [@elecV2](https://github.com/elecV2) | [JDHelloWorld](https://github.com/JDHelloWorld) | [@ztxtop](https://github.com/ztxtop) | [@whyour](https://github.com/whyour)|[@Oreomeow](https://github.com/Oreomeow)| [@Aaron-lv](https://github.com/Aaron-lv/sync/tree/jd_scripts)| [@shufflewzc](https://github.com/shufflewzc/faker2)| [@curtinlv](https://github.com/curtinlv/JD-Script) | [smiek2221](https://github.com/smiek2221/scripts)

- 感谢以上开发者的支持和贡献。
