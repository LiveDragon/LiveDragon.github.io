---
title: react学习笔记(二)
date: 2020-02-20
comments: false
categories:
 - 框架学习
tags:
 - react
---
# react组件的生命周期
## react 17生命周期的变化
起先对着网上博客文章一顿看，然后动手敲起来，才发现有的生命周期在vscode中的代码提示里已经被置灰了。

去官网看了一下文档才发现，原来这两年react大版本已经更新到v17了，生命周期已经和几年前的那些博客中所提的有了较大改变。所以说学习新知识最好的途径还是官方文档，其次才是别人的经验。

然后先附上两张图，分别对应之前版本和此刻v17版本的react周期的变化，或许未来又会有不同。

老版本生命周期:
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a415d4a3db9e42ce91a8184af18cfe2a~tplv-k3u1fbpfcp-watermark.image)

v17中版本的生命周期:
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da6c02c9a1e54a6b8006be72a9b767f7~tplv-k3u1fbpfcp-watermark.image)

从图中首先可以看出新版本中
- 剔除了三个生命周期`componentWillMount`、`componentWillUpdate`、`compontentWillReceiveProps`。
- 新加入了两个生命周期静态的`getDerivedStateFromProps`和`getSnapshotBeforeUpdate`。

其实在react 17版本中剔除的这三个生命周期并不是从react中删除了，我敲了一下发现它们还是存在的，只是官方不在建议使用他们。剔除原因，[移步官网](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillmount)

## 挂载阶段
### constructor()
在react组件挂载之前，会调用它的构造函数。在为`React.Component`子类实现构造函数时，应在其他语句之前前调用`super(props)`。否则， `this.props`在构造函数中可能会出现未定义的bug。

通常，在 React 中，构造函数仅用于以下两种情况：
- 通过`this.state`赋值对象来初始化内部state，在`constructor()`函数中不要调用`setState()`方法。
- 为`事件处理函数`绑定实例。

### componentDidMount()
`componentDidMount()`会在组件挂载后（插入`DOM`树中）立即调用。依赖于`DOM`节点的初始化应该放在这里。请求后台接口的操作可以放到这个生命周期内执行。在这个生命周期内同时也适合添加订阅，但要记得在`componentWillUnmount()`周期内取消订阅。

在这个生命周期内可以使用`setState()`方法来改变组件的`state`的属性值，它将触发额外渲染，但它发生在浏览器更新屏幕前，因此用户不会看出中间状态。

通过这两个生命周期，我们就可以实现从后台接收数据渲染到页面的操作：
``` js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { queryLabelInfo } from '../api/test'

class List extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  };
  componentDidMount() {
    // 请求后台接口
    queryLabelInfo({ current: 1, size: 10})
    .then(res => {
      this.setState({
        list: res.data.records
      })
    })
  };
  render() {
    return (
      <div>
        <div>
          {
            this.state.list.map(item => {
                return <div key={item.id}>{item.typeName}</div>
            })
          }
        </div>
      </div>
    )
  }
}
ReactDOM.render(
    <List />,
    document.getElementById('root')
);
```
效果如图：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08a37c4bbcd46f5a129109670e81bbd~tplv-k3u1fbpfcp-watermark.image)

### static getDerivedStateFromProps()
`getDerivedStateFromProps`会在调用`render`方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新`state`，如果返回`null`则不更新任何内容。

这个生命周期中无权访问组件实例。如果需要，可以通过提取组件`props`的纯函数及`class`之外的状态，在getDerivedStateFromProps()和其他class方法之间重用代码。

## 更新阶段
### shouldComponentUpdate()
根据`shouldComponentUpdate()`的返回值，判断React组件的输出是否受当前state或props更改的影响。默认行为是state每次发生变化组件都会重新渲染。

当props或state发生变化时shouldComponentUpdate()会在渲染执行之前被调用。返回true则更新视图，返回false则不更新视图。返回值默认为true。首次渲染或使用`forceUpdate()`方法时不会调用该方法。

案例：
``` js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
    constructor() {
        super();
        this.state = {
          count: 0,
        };
    };
    //返回false视图不在更新 ture则更新
    shouldComponentUpdate(newProps, newState) {
        if(newState.count > 3) {
            return false
        }
        return true
    };
    add() {
        this.setState({
            count: this.state.count + 1
        })
        console.log('count已增加，值为：', this.state.count)
    };
    render() {
        return (
            <div>
                <span>{this.state.count}</span>
                <button onClick={this.add.bind(this)}>+</button>
            </div>
        )
    };
    ReactDOM.render(
        <Counter />,
        document.getElementById('root')
    );
}
```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d1e18e894574e418725f82c46e1d1d1~tplv-k3u1fbpfcp-watermark.image)

### getSnapshotBeforeUpdate()
`getSnapshotBeforeUpdate()`在最近一次渲染输出（提交到`DOM`节点）之前调用。它使得组件能在发生更改之前从`DOM`中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。返回值应为`snapshot`的值（或`null`）

这个暂时不知道有什么使用场景，官网示例：
``` js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```
在上述示例中，重点是从 getSnapshotBeforeUpdate 读取 scrollHeight 属性，因为 “render” 阶段生命周期（如 render）和 “commit” 阶段生命周期（如 getSnapshotBeforeUpdate 和 componentDidUpdate）之间可能存在延迟。

### componentDidUpdate()
`componentDidUpdate(prevProps, prevState, snapshot)`会在更新后立刻被执行，但首次渲染不会执行此方法。

这里可以对比更新前后的`props`和`state`，然后进行相应操作，如`网络请求`或者调用`setState`方法。但要注意**一定要对比变化，放在条件语句中中执行**，否则可能会反复执行导致**死循环**

- 最好不要此生命周期内调用`setState`；
- 第一次初始化组件时，此方法不会执行；
- 当`shouldComponentUpdate`返回`false`时此方法同样不会执行。

## 卸载阶段
### componentWillUnmount()
`componentWillUnmount()`会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除timer，取消网络请求或清除在componentDidMount()中创建的订阅等。

`componentWillUnmount()`中不应调用`setState()`，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

## componentDidCatch(error, info)
当组件发生异常时会被调用的钩子。 它接收两个参数：
- error —— 抛出的错误。
- info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

注意点：
- 只能在父级组件捕获子组件的异常；
- 如果异常被 `try...catch` 包裹父级组件的钩子就不会执行了。

## 小结
今天学习了react生命周期，联系vue
- `constructor`相当于vue的`created`，组件还未挂载，`dom`元素还不可访问，可以进行一些数据处理；
- `componentDidMount`相当于vue的`mounted`，组件完成挂载，可以对`dom`元素进行操作；
- `componentDidUpdate`相当于vue的`updated`，由于数据更新导致重新渲染时被调用的钩子；
- `componentWillUnmount`相当于vue的`beforeDestroy`，组件从dom中移除时会触发的钩子；
- `getDerivedStateFromProps`、`shouldComponentUpdate`、`getSnapshotBeforeUpdate`似乎在vue中没有对照。
