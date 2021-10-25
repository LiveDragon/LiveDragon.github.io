---
title: 通过electron实现一个桌面悬浮球
date: 2021-10-23 00:00:00
comments: false
categories: 
  - 框架学习
tags: 
  - electron
permalink: /pages/551850e3cd22a/
---
> 悬浮球这个小功能还挺有意思的
<!-- more -->

## 最终效果
![桌面悬浮球](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f37f74ca3d884dc696cde6e596986644~tplv-k3u1fbpfcp-watermark.image?)

## 功能描述
首先产品给到的需求是：打开客户端后，在桌面唤起一个悬浮球。悬浮球可以进行正常的拖拽操作，双击后打开功能面板可以快捷执行一些客户端中的功能操作，右击打开功能菜单可以唤起客户端等操作。

## 基础了解
electron其实在之前也用到过，但可以说基本只是通过它将我们的项目打包成客户端而已，并没有对它有过深入的使用。

我们都知道在electron中存在着两个进程，主进程和渲染进程。这次的项目因为要涉及一些对文件的操作，所以不再是仅仅通过主进程来为项目搭个客户端的壳子。包括悬浮球在内一些功能的实现都需要在两个进程间进行通信，当然我们还要接入electron更多api来实现我们的需求，嘿嘿。

## 实现思路
### 粗略思路
1. 首先明确悬浮球也是一个页面，它区别于项目中其他正常页面，需要一个特定的窗口打开，并且这个窗口时透明且不带边框。
2. 无论是拖拽移动，还是创建菜单，在我们的渲染进程中都是无法实现的，我们要与主进程进行通信，在主进程中实现我们的功能。
### 具体实施
#### 创建悬浮球窗口
先不考虑功能的实现，我们先将悬浮球创建出来。
``` js
const { BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

let win2 //悬浮球

function createSuspensionWindow() {
  win2 = new BrowserWindow({
      width: 120, 
      height: 120,
      type: 'toolbar',    //创建的窗口类型为工具栏窗口
      frame: false,   //要创建无边框窗口
      resizable: false, //禁止窗口大小缩放
      transparent: true,  //设置透明
      alwaysOnTop: true,  //窗口是否总是显示在其他窗口之前
      webPreferences: {
        // nodeIntegration: true, //是否集成node
        // contextIsolation: true, //是否上下文隔离
        preload: path.join(__dirname, './preload.js') // 通过预加载将 electron 中的一些 node 的API挂载到window对象上
      }
  });
  //通过获取用户屏幕的宽高来设置悬浮球的初始位置
  const { left, top } = { left: electron.screen.getPrimaryDisplay().workAreaSize.width - 160, top: electron.screen.getPrimaryDisplay().workAreaSize.height - 160 }
  win2.setPosition(left, top) //设置悬浮球位置
  
  win2.loadURL(`页面地址`);

  win2.once('ready-to-show', () => {
    win2.show()
  });

  win2.on('close', () => {
    win2 = null;
  })
}

```
这里我们声明了一个函数createSuspensionWindow来创建一个无边框透明背景的窗口，只需要在需要的地方来执行该方法就可以创建出我们的悬浮球了。

这里有个坑需要注意：electron中有很多api是需要借助node环境来实现的，主进程通过NodeJs实现底层的调用所以不会有问题，但在渲染进程下往往就会出现一些问题。

- 首先第一个问题，在react页面中我直接使用了`require('electron')`来获取electron的api。这时就会出现报错**require is not defined**，
网上最多的解决办法是配置nodeIntegration参数为true在渲染进程中继承node。这个参数在electron5.0后就默认为false了，但我在项目中配置true也依然报错，
可能后面又有其他的变动吧，electron的更新实在太快了。

- 上面的方法行不通后，又找到的一个新方法，通过编写`preload`脚本，在这个脚本中我们可以通过require获取到electron的部分api，然后我们可以将这个脚本和electron
的内部逻辑挂在到`webContents`中。 网上看到暴力的解决方案是直接将脚本中通过require获取到的对象添加到window上，默默的，我也试上了。不出所料，我又失败了。在脚本中，
我确实获取到了并将它添加到了window身上，但在项目内访问window对象又没有获取到这个对象。原因是在electron12.0以后配置项contextIsolation默认设为了true，默认启用了
上下文隔离。[Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)

- 官方启用上下文隔离的原因也很简单，普适性解释——出于安全性目的考虑。同时官方也推出一个新的方法`contextBridge `来实现从上下文隔离的预加载脚本向渲染器公开自身api。
[contextBridge](https://www.electronjs.org/docs/latest/api/context-bridge)

这里同时赋上一个简单预加载脚本
``` js
const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld(
  'electronApi',
  {
    //发送消息
    send: (channel, data) => {
      let validChannels = ["createSuspensionMenu", "suspensionWindowMove", "getFilePath", "downloadFile"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    //接收消息
    receive: (channel, func) => {
      let validChannels = ["replyFilePath"];
      if (validChannels.includes(channel)) {
          ipcRenderer.on(channel, (event, ...args) => func(event,...args));
      }
    },
    showItemInFolder: (url) => {
      shell.showItemInFolder(url)
    }
  }
)
```

#### 实现悬浮球拖拽移动
悬浮球页面代码：
``` js
import React, { Component } from 'react'

const { send } = window.electronApi

function moveEvent(e) {
  send('suspensionWindowMove', {x: e.screenX - biasX, y: e.screenY - biasY})
}

export default class Suspension extends Component {
  
  initSuspension = () => {
    const suspensionDom = document.getElementsByClassName('suspension')[0]
    let biasX = 0;
    let biasY = 0;
    suspensionDom.addEventListener('mousedown', function (e) {
      switch (e.button) {
        case 0:
          biasX = e.x;
          biasY = e.y;
          document.addEventListener('mousemove', moveEvent);
          break;
        case 2:
          send('createSuspensionMenu');
        break;
      }
    });
    suspensionDom.addEventListener('mouseup', function () {
      biasX = 0;
      biasY = 0;
      document.removeEventListener('mousemove', moveEvent)
    });
  }

  componentDidMount() {
    this.initSuspension()
  }

  render() {
    return (
      <div className="suspension">T</div>
    )
  }
}

```
这里我们在鼠标移动过程中向主进程发送了消息`suspensionWindowMove`并将移动的位移当做参数传递给了主进程。所以接下来我们要在主进程中对窗口进行平移就好啦。

主进程代码：
``` js
const { ipcMain } = require('electron')
//移动悬浮球
ipcMain.on('suspensionWindowMove', (event, message) => {
  win2.setPosition(message.x, message.y)
});

```

#### 实现悬浮球右击创建菜单
上面在页面中右击已经向主进程传递了消息`createSuspensionMenu`，所以我们只需要在主进程中接受消息并创建菜单。
``` js
const { app, ipcMain, Menu } = require('electron')

let win = null //应用窗口
let suspensionMenu = null //悬浮球右击菜单
let win2 = null //悬浮球窗口

//创建悬浮球右击菜单
ipcMain.on('createSuspensionMenu', (e) => {
  if(!suspensionMenu) {
    suspensionMenu = Menu.buildFromTemplate([
      {
        label: '打开客户端',
        click: () => {
          if (win === null) { //判断主窗口是否存在，已关闭则创建主窗口
            createWindow()
          }
        }
      },
      {
        label: '关闭悬浮球',
        click: () => {
          win2.close()
        }
      },
      {
        label: '退出软件',
        click: () => {
          app.quit();
        }
      },
    ]);
  }
  suspensionMenu.popup({});
});
```
#### 双击打开功能菜单
这里一开始死脑筋了，一直想着通过通信创建新窗口什么的，后来发现太麻烦了。后来仔细一想这个菜单的功能都是业务功能，我完全没必要舍近求远，完全可以在页面内部实现。

最后的实现就是在页面内通过css3来展示功能面板，和electron无关就不贴代码了。

## 总结
- 在渲染进程中需要使用electron的api，目前可以使用预加载脚本的方法实现。
- 通过渲染进程中的`ipcRenderer`和主进程中的`ipcMain`可以实现两个进程间的通信来实现我们的一些业务需求。
- electron的更新很快，网上的博客，论坛文章有很多解决方法可能已经失效，包括本文此刻使用的方法，最终还要以官方的文档为准。

## 感谢
过程中参考了一些文章和提问对我很有帮助，这里向他们表达感谢。

[Electron实现悬浮球功能](https://juejin.cn/post/6844904178641272846)

[contextBridge的使用问题](https://stackoverflow.com/questions/59993468/electron-contextbridge)

