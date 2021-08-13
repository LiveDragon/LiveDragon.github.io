---
title: 记一次uniapp开发微信小程序的流程
sidebar: auto
date: 2021-03-26 00:00:00
comments: false
categories: 
  - 经验
tags: 
  - 微信小程序
permalink: /pages/02f9534e72ae2/
---

这个月本来是计划被外派到别的公司干活的，后来因为一些情况耽误了。所以临时给安排了俩小项目，一个微信小程序一个手机app，功能都十分简单，但这两方面确实之前没干过，虽然都会用uniapp开发但和之前开发h5页面相比，我想应该还是会有一些不同的，这两个简单的项目就显得很难能可贵了。

app目前还没动工，今天先记录一下小程序的开发过程。

## 开发前置准备
首先我们需要去微信公众平台注册一个小程序。进入[微信公众平台](https://mp.weixin.qq.com/)，选择右下角小程序按照提示的步骤，注册一个小程序。

进入注册完成的小程序页面后，绑定小程序开发者，完成开发信息的配置，之后作为开发者的我们再进入公众平台就可以通扫码选择相对应的小程序修改相应权限配置。

## 开发
emm...实际开发貌似h5页面没什么不同，只是编译运行和发布需要借助[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。

还有一个注意点，在开发微信公众号页面时，我们需要引入微信jssdk才可以使用官方提供的相应的api接口。但在小程序中，我们在程序中可以直接拿到`wx`对象并使用相应的api。

### 登录逻辑
微信提供的登录流程图：

![登录流程](https://res.wx.qq.com/wxdoc/dist/assets/img/api-login.2fcc9f35.jpg)

1. 首先我们通过调取`wx.login()`获取到一个临时登录凭证`code`。
2. 通过`code`以及我们小程序的`appid`、`appsecret`通过解密算法，可以获得**用户唯一标识 OpenID**、用户在微信开放平台帐号下的**唯一标识UnionID**（若当前小程序已绑定到微信开放平台帐号） 和**会话密钥 session_key**。(通常操作是我们将三个参数传给后端，服务端通过调用[auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)接口解密数据)
3. 根据返回的`openid`和`session_key`，我们来自定义自己的小程序登录状态并完成后面的相应业务场景。

### 用户授权
在小程序中我们想要使用某些api权限，需要获取相应的用户授权。

通过`wx.getSetting()`查看用户的授权项，在success回调中我们可以拿到相应的scope，对照[scope](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)表查看用户授权项。

使用`wx.authorize()`通过传入不同scope来向用户发起对应的授权请求，该api不会弹出授权窗口，但某些授权无法通过该api调用，需要用户点击对应type的按钮唤起授权窗口，如获取用户信息，获取手机号等。

项目里使用open-type为`getUserInfo`的按钮获取用户授权用户信息，就看见微信开发者工具疯狂给警告

![警告.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d9d9195f854d4d8c6cecc3a9dc5ec6~tplv-k3u1fbpfcp-watermark.image)

后续小程序中无法通过`wx.getUserInfo`与`<button open-type="getUserInfo"/>`获取用户个人信息了，[更新公告](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801)

## 发布
### 打包
- 使用HBuilder构建项目的，可以通过顶部操作栏对应操作打出小程序的包。
- 使用vue-cli构建项目，则需执行`package.json`中相对应的打包命令。

### 上传
在微信开发者工具中导入打包好的文件，本地预览，真机调试没有问题，通过该工具上传版本。

### 审核
上传完成后的版本，会在微信开放平台小程序中版本管理内的`开发版本`中显示，此时提交审核。

### 发布
当审核通过后，即可将小程序发布到线上。