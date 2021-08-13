---
title: react基础(三)
date: 2021-02-22 00:00:00
comments: false
categories: 
  - 框架学习
tags: 
  - react
permalink: /pages/978de6eb83095/
---
> react知识点持续up💪🏻
<!-- more -->
## 事件处理
前面有的案例其实已经使用过事件处理，需要注意的点有：
- `this`指向问题；
- 在react中事件的命名采用小驼峰式命名；
- jsx语法中传入的是一个事件处理函数，而非传统的字符串

``` js
<button onClick={this.handleClick.bind(this)}>按钮</button>
```
### 事件修饰
对比`vue`中提供了一些事件修饰符来简化我们对`dom`的事件处理，`react`可能要显得复杂一些。

比如我们要阻止默认行为，我们可以：
``` js
import React, { Component } from 'react';

class Link extends Component {
  handleClick(e) {
    e.preventDefault()
    console.log(e)
  };
  render() {
    return (
      <div>
        <a href="http://www.baidu.com" onClick={this.handleClick.bind(this)}>跳转链接</a>
        {/* 箭头函数不用再绑定this */}
        <button onClick={() => this.handleClick()}>点击</button>
      </div>
    )
  }
}
```
这里的`e`是合成事件，符合`w3c`规范不用担心兼容性问题，[react提供的合成事件](https://zh-hans.reactjs.org/docs/events.html)。

### 事件传参
很多业务场景中,都需要想事件中传递参数,可以这么做(两种方式等价)：
``` js
<button onClick={this.handleClick.bind(this, id)}>点击</button>
<button onClick={(e) => this.handleClick(id, e)}>点击</button>
```
注意点：在这两种情况下，React的事件对象`e`会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过`bind`的方式，事件对象以及更多的参数将会被隐式的进行传递。

## 条件渲染
React中的条件渲染和JavaScript中的一样，使用JavaScript运算符**if**或者**条件运算符**去创建元素来表现当前的状态。

例子：
``` js
import { Component } from 'react'
class Condition extends Component {
    constructor() {
        super();
        this.state = {
            flag: true
        }
    };
    showElement() {
        if(this.state.flag) {
            return <div>就该展示我</div>
        } else {
            return <div>错了，错了，我是意外</div>
            //返回null则表示不会渲染元素
            //return null
        }
    };
    changeShowText() {
        this.setState(state => {
            return { flag: !state.flag}
        })
    };
    render() {
        return (
            <div className="ceshi">
                <button onClick={() => this.changeShowText()}>点击修改文字</button>
                {this.showElement.bind(this)()}
            </div>
        )
    }
}
```
效果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3b6d4c2c8b440ef932c7273b6ba7f42~tplv-k3u1fbpfcp-watermark.image)

## 列表 & Key
这个在前面练习生命周期的时候，其实已经不知不觉的借用`map`函数使用过了。

### 循环渲染
官网示例：
``` js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
这样就实现了一个简单的无序列表，我目前的理解是通过`map`函数构造相应的`dom`结构数组，然后放入`render`函数内，就会被渲染出来，达到`vue`的`v-for`指令循环渲染的效果。

### key
- key帮助React识别哪些元素改变了，比如被添加或删除。
- 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。
- 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key。

以上三点是react官网给出的说明，一看这不是vue中v-for指令绑定key的作用吗，那用索引充当key是不是会出现问题呢？官网给出的是这样做会导致性能变差和引起组件状态问题。

然后去网上找了一些资料，现在先归纳一些。
- key是react用来唯一标识`dom`元素的。当我们向其中`添加或删除`元素的时候，若key不唯一，则会发生我们预期之外的情况。
- key只是在`兄弟节点间`保持唯一性，不需要确保全局唯一。
- 使用下标充当key，元素不再改变时不会发生问题，但当元素有改动是，触发的react的`diff`算法会变慢，同时由于组件实例是基于它们的key来决定是否更新和复用，当修改顺序时改变了key，会导致非受控组件的state（如输入框）相互篡改。
- 适合使用下标充当key值的场景有：1.列表和项目是静态的，它们不再计算也不再改变。2.列表项目没有id。3.列表从不重新排序或筛选。

## 状态提升
多个组件共享同一个状态时，可以将这个状态提升到它们最近的一个共同组件身上，然后通过props向下传递，当props改变时会触发组件更新。

在React应用中，任何可变数据应当只有一个相对应的唯一“数据源”。应当依靠自上而下的数据流，而不是尝试在不同组件间同步state。