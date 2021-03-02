---
title: react基础(四)
date: 2020-02-24
comments: false
categories:
 - 框架学习
tags:
 - react
---

# react Hook
1. Hook是`React 16.8`的新增特性。它可以让你在不编写class的情况下使用state以及其他的React特性。

2. Hook是一些可以让你在函数组件里“钩入” `React state`及`生命周期`等特性的函数。

3. Hook 不能在 class 组件中使用。

## State Hook
简单示例：
``` js
import { useState } from "react";
import ReactDOM from 'react-dom';
function ExampleHook() {
    const [ count, setCount ] = useState(0);
    return (
        <div>
          <p>已点击{count}次</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}

ReactDOM.render(
    <ExampleHook />,
    document.getElementById('root')
);
```
效果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e654f920c1e4c59a9242a12f1903b46~tplv-k3u1fbpfcp-watermark.image)

这里导入的`useState`就是一个Hook，通过在函数中调用会给组件添加一些内部`state`。注意点：

- `useState`接收的唯一参数就是初始state，这个初始state参数只有在第一次渲染时会被用到，而且不同于`this.state`,使用`useState`时声明的state不一定要是一个对象
- `useState`会返回一个**当前状态**和一个**更新状态的函数更新状态的函数**，通过`数组解构`我们调用`useState`的时候可以给state变量取任意名称，更新函数同理。

与class组件中state变量的区别：
1. 声明方式不同，class中我们需要在`构造函数中`设置`this.state`；在函数组件中，通过调用`useState`Hook来声明。
2. 读取方式不同，class中我们通过`this.state.count`读取我们声明在state中的count值；在函数组件中我可以直接使用`count`。
3. 更新state状态的方式不同，class中我们需要调用`setState()`来更新值；在函数组件中，我们需要调用`useState`时声明的更新函数。

## Effect Hook
Effect Hook 可以让你在函数组件中执行副作用操作，它跟class组件中的`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`具有相同的用途，可以看成将它们合并成了一个API。

将上面的例子稍加改造：
``` js
import { useState, userEffect } from "react";
import ReactDOM from 'react-dom';
function ExampleHook() {
    const [ count, setCount ] = useState(0);
    useEffect(() => {
        console.log(`按钮被点击${count}次`)
    });
    return (
        <div>
          <p>已点击{count}次</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}

ReactDOM.render(
    <ExampleHook />,
    document.getElementById('root')
);
```
实现效果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e43ce73c0e85430caf10cd3c270f592f~tplv-k3u1fbpfcp-watermark.image)

当你调用useEffect时，就是在告诉React在完成对DOM的更改后运行你的“副作用”函数。注意点：

- 由于副作用函数是在组件内（函数作用域中）声明的，所以它们可以访问到组件的props和state。
- 默认情况下，React会在每次渲染后调用副作用函数（包括第一次渲染的时候）。

### 无需清除的effect
有时候，我们只想**在React更新DOM之后运行一些额外的代码**。比如发送网络请求，手动变更DOM，记录日志，这些都是常见的无需清除的操作。上面的例子便是无需清除的。

### 需要清除的effect
我们在组件的操作，有些在组件销毁时是应该被清除的，例如**订阅外部数据源**，在class组件中，我们一般在`componentDidMount`生命周期中绑定 ,在`componentWillUnmount`生命周期内清除它。

在Hook中，由于添加和删除订阅的代码的紧密性，所以 useEffect 的设计是在同一个地方执行。effect函数还可以通过返回一个函数来指定如何“清除”副作用（可以同时清除多个），React将会在执行清除操作时调用它。例如，同样继续改造上面的例子：
``` js
import { Component, useState, userEffect } from "react";
import ReactDOM from 'react-dom';
function ExampleHook() {
    const [ count, setCount ] = useState(0);
    useEffect(() => {
        console.log(`按钮被点击${count}次`)
        let interval = setInterval(() => {
            console.log('当前时间戳', new Date().getTime())
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    });
    return (
        <div>
          <p>已点击{count}次</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      hookComponentFlag: true
    };
  };
  changeHookFlag() {
    this.setState(newState => {
      return {
        hookComponentFlag: !newState.hookComponentFlag
      }
    })
  };
  render(){
    return (
      <div>
        <button onClick={this.changeHookFlag.bind(this)}>{ this.state.hookComponentFlag ? '移除' : '添加'}hook组件</button>
        {this.state.hookComponentFlag ? <ExampleHook /> : null}
      </div>
    )
  }
} 

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
在这个示例中，React会在组件销毁时清除定时器，然后在后续渲染时重新执行副作用函数创建定时器。

效果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/431ba3fc5c2c4217a778823f9ae23600~tplv-k3u1fbpfcp-watermark.image)

### useEffect使用技巧

**将useEffect用于一个单一功能**

在React Hooks，可以有多个`useEffect`函数。这样我们可以简洁代码，每一个函数对应一个单一功能，同时将`useEffect`拆分为单独的用途函数，可以防止意外发生（使用依赖数组时）。
继续改动上面的例子：
``` js
import { Component, useState, userEffect } from "react";
function ExampleHook() {
    const [ count, setCount ] = useState(0);
    const [ number, setNumber ] = useState(0);
    useEffect(() => {
        console.log(`按钮被点击${count}次`)
    })
    useEffect(() => {
        let interval = setInterval(() => {
            console.log('当前时间戳', new Date().getTime())
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    });
    useEffect(() => {
        let interval = setInterval(() => {
            // setNumber(number + 1)
            setNumber(number => number + 1) //当变量依赖先前状态时建议这样使用
            console.log('当前数量', number)
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    });
    return (
        <div>
          <p>已点击{count}次</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}
```
**通过跳过 Effect 进行性能优化**

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState`的比较逻辑解决：
``` js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    //进行操作
  }
}
```
`useEffect `的Hook API中同样支持，如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可:
``` js
useEffect(() => {
  document.title = `已点击 ${count} 次`;
}, [count]); // 仅在 count 更改时更新
```
这里传入[count]作为第二个参数，当组件重新渲染的时候如果count的值没有改变，则React会跳过这个effect。

**加条件执行Effect**
有些业务条件下，除了比对值是否改变的情况，还有是否满足某些条件才执行Effect。

我们可以在`Effect`的头部添加条件返回：
```js
function ExampleHook() {
    const [ number, setNumber ] = useState(0);
    useEffect(() => {
        if(number > 5) return;
        let interval = setInterval(() => {
            // setNumber(number + 1)
            setNumber(number => number + 1) //当变量依赖先前状态时建议这样使用
            console.log('当前数量', number)
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [number]);
    return (
        <div>
          <p>已点击{count}次</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}
```
## 其他Hook
### useContext
可以让你不使用组件嵌套就可以订阅 React 的 Context。
``` js
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

### useReducer
可以让你通过reducer来管理组件本地的复杂state。
``` js
function Example() {
  function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
}
```

React 内置的 [Hook API索引](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## 自定义Hook
自定义Hook是一个函数，其名称以**use**开头，函数内部可以调用其他的Hook。

示例：
```js
function useVariable(porps) {
    // const value = 
    const [ variable, setVariabl] = useState(null);

     useEffect(() => {
        variable = setVariabl(porps)
    });

    return variable
}

function getValue(porps) {
    const value = useVariable(porps)
    if(value === null) {
        return 'error'
    }
    return value
}

function getResultByVariable(porps) {
    const value = useVariable(porps)
    if(value === null) {
        return 'waiting'
    }
    return (
        <div>
            {`结果为：${value === 'success' ：'成功' : '失败'}`}
        </div>
    )
```
上述组件`getValue`和`getResultByVariable`都使用了自定义Hook `useVariable`，但它们并没有共享`state`，每一次使用自定义Hook时，其中所有的state和副作用都是完全隔离的。




