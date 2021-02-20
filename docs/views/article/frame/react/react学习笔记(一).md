---
title: react学习笔记(一)
date: 2020-02-19
comments: false
categories:
 - 框架学习
tags:
 - react
---
## 前言
在我就职的这家小型公司里，前端开发基本都是使用的都是vue，究其根本应该是成本相对较低吧。

从大四实习到现在已经工作1年多了，特别是近半年越发感觉自己陷入了无休止的业务代码内，又一次感觉到了大四即将步入社会的迷茫感，这一次我选择先拓展一下自己的技术栈，故而将目光投向了react。

## Hello World
搭建项目，正如vue使用vue-cli一样，react我使用了create-react-app这个脚手架。

最近尤大大力推的vite似乎挺火的，试了构建了一个vue项目结果是3.0的之前学了点，好久没用忘记的差不多了，尴尬。有点扯远了，回归正题。

安装脚手架
``` sh
npm install -g create-react-app
```

构建项目
``` sh
//first-react-project 项目跟目录名
create-react-app first-react-project
//后续按照提示即可创建完成
```

项目目录
```
├── public
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js // 项目入口文件
│   ├── logo.svg
│   └── registerServiceWorker.js
│   └── setupTests.js
├── .gitignore
├── package.json
```

修改index.js完成hello world页面
``` js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello World!</h1>,
  document.getElementById('root')
);
```
`ReactDOM.render(template,targetDOM)`方法接受两个参数：

- 第一个是创建的模板，多个`dom`元素外层需使用一个标签进行包裹；
- 第二个参数是插入该模板的目标位置。这里找到id为root的dom节点下插入`Hello World`

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14fe763d70664eef93ded7ca8f1eb250~tplv-k3u1fbpfcp-watermark.image)

## JSX
JSX是一个JavaScript的语法扩展，它的格式比较像模板语言，如`const element = <h1>Hello, world!</h1>;`就可以被称为JSX

### 在JSX中嵌入表达式
在JSX语法中，在任何大括号内都可以写入`JavaScript表达式`
``` js
const name = 'longyunfei';
const element = <h1>hellow, {name}</h1>;
```

### JSX也是一个表达式
在编译后，JSX表达式会被转为普通JavaScript函数调用，并且对其取值后得到 JavaScript 对象。

所以我们在js代码中可以直接使用JSX。

### JSX特定属性
- 通过使用引号，来将属性值指定为字符串字面量：`const element = <div tabIndex="0"></div>;`
- 通过使用大括号，来在属性值中插入一个 JavaScript 表达式：`const element = <img src={user.avatarUrl}></img>;`

在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

### 使用JSX指定子元素
假如一个标签里面没有内容，你可以使用 /> 来闭合标签，就像 XML 语法一样
``` js
const element = <img src={user.avatarUrl} />;
```
JSX 标签里能够包含很多子元素:
``` js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX 表示对象
Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。以下两种示例代码完全等效：
``` js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

``` js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()`会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：
``` js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

## State & Props
### State
state(状态)，state是一个组件的ui数据模型，是组件渲染的数据依据

用法：
``` js
import React, { Component } from 'react';

class Counter extends Component {
    constructor() {
        super();
        this.state = {
          count: 0,
        };
    };
    add() {
        this.setState({
            count: this.state.count + 1
        })
    };
    subtract() {
        this.setState(prevState => {
            return {
                count: prevState.count - 1
            }
        })
    };
    render() {
        return (
            <div>
                <button onClick={this.subtract.bind(this)}>-</button>
                <span>{this.state.count}</span>
                <button onClick={this.add.bind(this)}>+</button>
            </div>
        )
    };
}

ReactDOM.render(
    <Counter />,
    document.getElementById('root')
);
```
1. 这里实现了一个加减器，定义的`Counter`组件的数据状态中存在属性`count`，为两个按钮分别添加事件控制`count`属性的加减，并体现在网页上。

2. 修改`state`中的属性需要使用`setState()`方法，setState(updater, [callback]) 接受两个参数。

参数一为带有形式参数的`updater`函数或者对象， 官方推荐使用`updater`函数
``` js
(state, props) => stateChange
```
- `updater`函数中接收的 state 和 props 都保证为最新。`updater`的返回值会与组件的 state 进行浅合并。
- 传入对象则直接将传入对象浅层合并到新的state中


参数二为可选的回调函数，它将在`setState`完成合并并重新渲染组件后执行。官方建议使用`omponentDidUpdate()`来代替此方法。

### Props
props是从外部注入到组件身上的属性，通常来自它的父级元素，它在react中是单向流动的。

将上面加减器的代码稍加修改：
``` js
import React, { Component } from 'react';

class Counter extends Component {
    constructor() {
        super();
        this.state = {
          count: 0,
        };
    };
    add() {
        this.setState({
            count: this.state.count + 1
        })
    };
    subtract() {
        this.setState(prevState => {
            return {
                count: prevState.count - 1
            }
        })
    };
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <button onClick={this.subtract.bind(this)}>-</button>
                <span>{this.state.count}</span>
                <button onClick={this.add.bind(this)}>+</button>
            </div>
        )
    };
}

ReactDOM.render(
    <Counter name="加减器" />,
    document.getElementById('root')
);
```
可以看到从外部添加到组件身上的属性`name`在组件内部是可以通过`this.props`来访问的。

### 区别
- `state`是组件自己管理的状态数据，可以改变；
- `props`是外部传入的数据参数，不应该改变；
- 没有`state`的叫做无状态组件，有`state`的叫做有状态组件；

## 小结
学习到了react的几个基础知识，对比vue：
- `state`就如同vue组件身上的`data`属性，管理组件自身的属性状态；
- `props`同vue相同都是父组件向子组件传值，单项数据流，不应该被改变；
- `JSX`的语法和写vue使用的.vue文件的template模板差异还是较大的，vue也有jsx的写法但一直没用使用过，这次学习完react后对这种语法的了解应该会更深一点。