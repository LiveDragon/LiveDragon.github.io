---
title: React Router
date: 2020-02-25
comments: false
categories:
 - 框架学习
tags:
 - react
---

路由，在日常的前端开发中感觉是一个必不可少的，从实习做项目开始，无论是后台管理页面还是前台的门户网页，总是在和它打交道。所以在前面几天跟着官网陆陆续续敲了几天`react`的基础上，为了后面能够完成一个简单的后台管理项目，对照公司里`vue`项目经验，今天继续学习`react router`。

## 官网示例
```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
```
实现效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fb2ca51652d4946988f8b8ee02920dd~tplv-k3u1fbpfcp-watermark.image)

可以看出官网示例实现了一个嵌套路由效果，但是代码中从`react-router-dom`中导入的`Switch`、`Route`、`Link`、`useRouteMatch`、`useParams`这些api，看上去我似乎知道它干了什么，但我还是继续查看文档，学习学习这些常用的`API`。

## 组件分类
`react router`的组件主要分为三类：
- 路由器，例如`<BrowserRouter>`和`<HashRouter>`。
- 路由匹配器，例如`<Route>`和`<Switch>`。
- 导航(路线更改器)，例如`<Link>`，`<NavLink>`和`<Redirect>`。

### 路由器
react-router-dom提供`<BrowserRouter>`和`<HashRouter>`路由器，两者的区别主要在于它们存储url和web服务器通信的方式。

#### BrowserRouter
使用常规的url路径，例如`http://baidu.com/path`，它的原理是通过JavaScript的history属性实现的。

#### HashRouter
使用hash路径，例如`http://baidu.com/#/path`，它的原理是通过监听url中的hash的变化实现的。

### 路由匹配器
#### Router
通过匹配组件定义的`path`，当`path`匹配成功时会渲染该组件。
``` js
<Route path="/home">
	<Home />
</Route>
```
当url中的路径匹配上了home页面即渲染Home组件。

#### Switch
当`<Switch>`被渲染时，会搜索它的子`<Route>`，当找到其中第一个path与当前url匹配时，渲染该对象并忽略其他`<Route>`。如果没有找到`<Route>`匹配项，则`<Switch>`渲染器不会渲染任何内容。
``` js
<Switch>  
  <Route path="/about">
    <About />
  </Route>
  <Route path="/topics">
    <Topics />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
```
使用上面官网的示例代码，当我们在搜索`/about`的时候，`<About>`和`<Home>`组件都匹配了，但因为Switch的特性页面只渲染了`<About>`就不会再往下匹配了。因此我们应该将根目录'/'匹配的`<Route>`放在最后的`<Switch>`中。

### 导航
#### Link
`<Link>`组件最终会渲染为a标签，同时通过`to`参数切换路径到指定目录。

#### NavLink
`<NavLink>`是`<Link>`的一个特定版本，会在匹配上当前url的时候为已经渲染的元素添加参数，参数有：
- activeClassName(string)：设置选中样式，默认值为active。
- activeStyle(object)：当元素被选中时，为此元素添加样式。
- exact(bool)：为true时，只有当导致和完全匹配class和style才会应用。
- strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线。
- isActive(func)判断链接是否激活的额外逻辑的功能。
``` js

// activeClassName选中时样式为selected
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
 
// 选中时样式为activeStyle的样式设置
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
 
// 当event id为奇数的时候，激活链接
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}
 
<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```

#### Redirect
强制导航，通过参数to重定向到指定页面。
``` js
//重定向到登录页
<Redirect to="/login" />
```

## Hook
React Router附带有一些`Hook`，可让您访问路由器的状态并从组件内部执行导航，必须使用React >= 16.8才能使用这些Hook。

### useHistory
使用该Hook，可以访问浏览器的`history`对象，一般用于路由调整。

### useLocation
使用该Hook，可以获取`location`对象，当url改变时，就会返回一个新的对象，一般同`useEffect`一同使用。

### useParams
使用该Hook，可以获取匹配的url参数，例如路由定义为`/home/:value`，当访问该路径时，就可以通过该钩子获取值`home`，修改一下上面官网代码。
``` js
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/getParam/123456">Topic</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/getParam/:vuele">
            <ParamVal />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ParamVal() {
  let { vuele } = useParams();
  return <h3>url传值为: {vuele}</h3>;
}

function Home() {
  return <h3>Home</h3>;
}
```
效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79052e78a0174c3aa18d0633073aedbd~tplv-k3u1fbpfcp-watermark.image)

### useRouteMatch
useRouteMatch钩子尝试以与`<Route>`相同的方式匹配当前URL。它主要用于访问匹配数据，而无需实际渲染`<Route>`。

![](https://pic1.zhimg.com/80/v2-f8c9f3b545ef8f041f3e63d82342fde8_720w.jpg)

注意点：
- 不接受任何参数时并返回当前`<Route>`的match对象
- 接受单个参数时，该参数与matchPath的props参数相同，可以是字符串的路径名，也可以是带有匹配的Route接受道具的对象。