# 大智慧金融云APP

大智慧金融云APP是基于大智慧云服务的开源APP，它提供一个具有行情、资讯功能的APP，可日常使用也可定制。APP 支持的平台为 IOS/Android

## 技术路线

大智慧金融云APP基于[React Native](https://github.com/facebook/react-native)技术搭建，在其之上，额外提供了

- DzhChart 绘图组件
- YunSDK 数据传输组件
- DzhWebView 增强的WebView组件

使得编写金融信息相关的APP更加容易。

部分逻辑使用[J2OBJC](http://j2objc.org/)来进行编写，以最大程度的增强代码的复用。

## 编译环境准备

* 符合 React Native 需求的环境，参考 [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
* 下载 [J2OBJC](https://github.com/google/j2objc/releases), 并将其解压到 `~/Library/J2Objc` ，如果 J2Objc 不在此处，则需要调整 ios 的依赖库目录


## 编译

* 运行 `git clone https://github.com/huicloud/mobile.git` 以下载代码
* 运行 `cd mobile` 进入到代码目录
* 运行 `npm install` 安装依赖

### Android

使用 Android Stuido 打开 `android` 目录，编译

### IOS

使用 XCode 打开 `ios/yunapp.xcodeproj` 工程，编译

### 目录列表

```
├── Libraries        , 大智慧扩展组件
│   ├── DzhChart     , 绘图组件
│   ├── DzhWebView   , 增强web浏览器
│   └── YunSdk       , 网络传输及协议
├── README.md        , 本文件
├── android          , Android工程目录
├── index.android.js , Android初始代码
├── index.ios.js     , IOS初始代码
├── ios              , IOS工程目录
├── package.json     , npm依赖项
└── src              , app实现代码

```


