---
title: 编写一个vue线上报错日志采集插件
date: 2020-03-10
comments: false
categories:
 - 其他
tags:
 - vue插件
---
![不影响文章阅读.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81368019e38c41ee8f14c02aa9ba45e9~tplv-k3u1fbpfcp-watermark.image)

目前就职的公司测试资源比较紧张（测试小姐姐都是香饽饽），去年上线的几个项目，客户投诉不能说没有吧，只能咱也没少被约谈。所以年终项目组总结的时候，就讨论过线上报错日志采集的必要性。年后上班后，因为项目组前端就俺一个，只好后端先行，我还得继续进行一些过往项目的收尾工作。直到最近闲了下来，就开始了前端部分的报错日志的研究。

首先，开始前先去网上看看前人的经验，看看能不能减轻工作量了。然后就发现网上其实已经有很多完善的解决方案了，像[FunDebug](https://www.fundebug.com/)，[sentry](https://sentry.io/welcome/)都很牛了，但因为我们要和后端现有的日志插件像集成，所以只好自己动手了。

## 常见收集报错信息的方法
### try...catch
收集错误，首先能想到的就是这个语句了吧。
```js
try {
    //....
} catch(err) {
    //err为捕获的错误
}
```
但我们不能在所有的代码里面都通过它，这效率太低了。

### window.onerror
在全局范围内发生报错的时候，就可以通过这个方法捕获到错误。
```js
window.onerror = function() {
  //获取错误信息 
  let errInfo = format(arguments);
};
```
但遗憾的是在vue项目中通过该方法无法捕获到错误。

### errorHandler
window.onerror无法捕获错误，是因为在vue中这些异常被vue自身提前捕获了。errorHandler就是vue提供的捕获错误的钩子，可以通过`Vue.config`进行全局配置,[官网地址](https://cn.vuejs.org/v2/api/#errorHandler)。
```js
Vue.config.errorHandler = function (err, vm, info) {
  // `err`捕获的错误信息
  // `vm` 发生错误的vue实例
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```

## 编写插件
### 前置准备
vue规定我们在编写插件时需要暴露出一个`install`方法，该方法接收两个参数，第一个参数是`Vue`构造器，第二个参数是可选的配置项。[官网地址](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)。

### 同步异常捕获
首先我们要考虑一下我们是否需要配置项，首先我们收集到的错误日志是要传给后端入库的，所以`接口地址`肯定是需要具体配置的。
```js
import axios from 'axios'
import qs from 'qs'
let errorLog = {}
errorLog.install = function (Vue, options) {
    function pushErrorLog({
        errInfo,
        vueErrInfo
    }) {
        //判断是否传入后台接口地址这个配置项，不判断就会被我们这个插件整入死循环里
        if (options && options.interfaceUrl) {
            let obj = {
                errInfo,
                vueErrInfo
            }
            // 调用后台接口推送记录日志
            axios.post(options.interfaceUrl, qs.stringify({ ...obj })).then(res => {

            })
        }
    }
    function errorHandler(err, vm, info) {
        Vue.nextTick(() => {
            pushErrorLog({
                errInfo: err.stack.toString(),
                vueErrInfo,
            })
        })
    }
    Vue.config.errorHandler = errorHandler
}

export default errorLog
```
就这样我们完成了一个基础版的异常捕获，但通过`errorHandler`只能捕获到同步的错误，我们项目中与后台交互的异步请求发生错误时，便无法捕获错误了。

### 异步异常捕获
这里卡了我很久没有什么思路，开始是想着在`axios`公共封装的拦截器里面做处理的，但这样只能收集到和后端规定的发生错误请求时的信息，意义并不是很大，后端那边的错误日志已经可以捕获到这里的异常了，此时我需要捕获的是请求成功后可能因为接口返回数据等其他原因导致的异常。

在网上找了很久的论坛帖子，找到了一个思路，对promise进行一次拦截，将`Promise.prototype.then`重写加入`try...catch`进行异常捕获。
```js
//判断当前环境是否支持Promise
if (Promise && Promise.prototype.then) {
    let promiseThen = Promise.prototype.then

    Promise.prototype.then = function (resolve, reject) {
        return promiseThen.call(this, coverPromiseFunction(resolve), coverPromiseFunction(reject))
    }
}

// 添加异常捕获
let coverPromiseFunction = (fn) => {
    // 如果fn是个函数，则直接放到try-catch中运行，否则要将类的方法包裹起来，promise中的fn要返回null，不能返回空函数
    if (typeof fn !== 'function') {
        return null
    }
    return function () {
        try {
            return fn.apply(this, arguments)
        } catch (error) {
            pushErrorLog({
                errStr: error.stack.toString(),
            })
            throw (error)
        }
    }
}
```
到这里我们就差不多把发生在代码中错误信息记录下来了，接下来就是继续完善其他的错误信息。

## 记录发生异常时的客户端信息
> 兼容性问题就是前端的一生之敌

虽然我所在的小外包公司对这块要求不高，一般像pc端的项目都是推荐客户使用Chrome的。但手机端出现问题，就不好开口让客户换手机了，所以还是记录一下发生错误时的客户端信息吧。

### 移动端信息采集
移动端信息采集我是基于`mobile-detect.js`来实现的。[官网地址](https://www.mobile-detect.cn/)。
```js
const MobileDetect = require('mobile-detect')

export const getClientDetail = () => {
    let device_type = navigator.userAgent;
    let md = new MobileDetect(device_type); //通过userAgent信息初始化mobile-detect
    let os = md.os(); //获取手机操作系统
    let model = "";
    if (os == "iOS") { //ios系统的处理
        os = md.os() + md.version("iPhone");
        model = md.mobile();
    } else if (os == "AndroidOS") { //Android系统的处理
        os = md.os() + md.version("Android");
        let sss = device_type.split(";");
        let i = sss.contains("Build/");
        if (i > -1) {
            model = sss[i].substring(0, sss[i].indexOf("Build/"));
        }
    }
    return {
        clientOS: os,
        clientModel: model,
        clientType: md.mobile() === null ? 'pc' : 'mobile'
    }
}

Array.prototype.contains = function (needle) {
    for (let i in this) {
        console.log(this[i])
        if (typeof this[i] === 'string' && this[i].indexOf(needle) > 0) {
            return i;
        }
    }
    return -1;
}
```

这里我们收集了`clientOS`，`clientModel`，`clientType`三个信息分别为操作系统，手机型号，客户端类型。

### pc端信息采集
开始我是想收集用户使用是什么浏览器，但网上查了查发现常见的判断方法是，通过`navigator.userAgent`属性来判断，但浏览器更新太快了，通过字符截取并不是很准确，暂时没想到什么好方法，如果你好的解决方法希望不吝赐教。

### 完善插件
因为开发的是线上日志采集，所以我们为插件添加执行环境，本地开发就没有必要推送日志给后端了，我也添加了本地环境启用的配置项，供本地测试所用，所以完善代码，附上完整代码。
```js
import { getClientDetail } from './util'
import axios from 'axios'
import qs from 'qs'

//获取报错日志的环境
let needErrorLog = ['production'] //'development'
// 获取客户端环境
const clientInfo = getClientDetail()

let errorLog = {}
errorLog.install = function (Vue, options) {
    // store.commit('addBaseUrl', options.interfaceUrl)
    function checkNeed() {
        if(options && options.env) {
            if(typeof options.env === 'string') {
                needErrorLog.push(options.env)
            }
            if(Array.isArray(options.env)) {
                needErrorLog = [...needErrorLog, ...options.env]
            }
        }
        
        const env = process.env.NODE_ENV

        return needErrorLog.includes(env)
    }

    function pushErrorLog({
        errInfo,
        vueErrInfo
    }) {
        // 调用后台接口推送记录日志
        if (options && options.interfaceUrl) {
            let obj = {
                ...clientInfo,
                errInfo: errStr,
                vueErrInfo: info,
            }
            axios.post(options.interfaceUrl, qs.stringify({ ...obj })).then(res => {
                // console.log(res)
            })
        }

    }

    function errorHandler(err, vm, info) {
        Vue.nextTick(() => {
            pushErrorLog({
                errInfo: err.stack.toString(),
                vueErrInfo,
            })
        })
    }

    //判断当前环境是否支持Promise
    if (Promise && Promise.prototype.then) {
        let promiseThen = Promise.prototype.then

        Promise.prototype.then = function (resolve, reject) {
            return promiseThen.call(this, coverPromiseFunction(resolve), coverPromiseFunction(reject))
        }
    }

    // 添加异常捕获
    let coverPromiseFunction = (fn) => {
        // 如果fn是个函数，则直接放到try-catch中运行，否则要将类的方法包裹起来，promise中的fn要返回null，不能返回空函数
        if (typeof fn !== 'function') {
            return null
        }
        return function () {
            try {
                return fn.apply(this, arguments)
            } catch (error) {
                pushErrorLog({
                    errStr: error.stack.toString(),
                })
                throw (error)
            }
        }
    }

    Vue.config.errorHandler = errorHandler
}

export default errorLog
```
然后在项目里面使用
``` js
import errorLog from 'lyf-vue-error-log'
Vue.use(errorLog, { interfaceUrl: '接口地址' })
```

## 发布插件
插件开发完成后，发布就很简单了。

### 创建npm账号
首先去[npm](https://www.npmjs.com/)官网创建一个发布使用的账号。

### 发布准备
首先npm建议我们发布的包需要包含以下文件：
- package.json（包的基本信息，其中main属性定义为我们的入口文件）
- README.md （文档）
- index.js （入口文件）
附上此刻我的文件目录
```
├── src
│   ├── lib
|   |   └── util.js 工具方法
│   └── index.js 入口文件
├── README.md
├── package.json
```
### 发布
``` sh
//登录npm账号 会输入账号，密码，邮箱
npm login
//发布
npm publish
```
执行这俩命令就发布完成啦，然后再登录npm就可以查看自己发布的包了。

然后如果我们需要更新我们的包也只要修改package.json中的version版本后再执行`npm publish`即可。
>规则：对于"version":"x.y.z"  
>1.修复bug,小改动，增加  
>2.增加了新特性，但仍能向后兼容，增加  
>3.有很大的改动，无法向后兼容,增加x

最后附上我这次开发的[插件地址](https://www.npmjs.com/package/lyf-vue-error-log)

## 对报错数据进行处理
插件使用中一直本地使用的本地测试，看上去一切正常，但最终是要发布到线上测试，所以本地起一个`tomat`，将打包后的文件丢上去模拟了一下线上发布，果然再次与问题不期而遇。

![打包文件得到的报错信息.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/166bdfda54634faf80a94db061c4dcd8~tplv-k3u1fbpfcp-watermark.image)

可以看出我们获取的报错栈信息得到的是打包后的错误消息，完全不知道具体位置。

通过uniapp开发的还可以通过它拼接的js文件名找到相应的文件，但正常的vue项目就无法看懂了，所以这样的记录错误并不能给我们定位到具体的代码位置，还得继续优化。

网上的解决方法一般是打包时生成对应的.map文件，通过文件名和对应的报错js联系起来，然后通过`source map`解析方法进行解析，得到想要的报错信息。

这里我直接借用了npm上的`sourceMap`进行解析，直接上代码。

``` js
const fs = require('fs'); // 读取文件

const sourceMap = require('source-map'); //解析source-map的内容

/**
 * @description: 解析错误栈信息
 * @param {String} info
 * @author: longyunfei
 */
async function analyzingErrInfo(info) {
    let infoList = []; //报错信息列表
    let lineList = []; //报错行
    let columnList = []; //报错列
    let sourceList = []; //对应打包的map文件列表
    let geJsMap = /(?<=js\/).*?(?=:)/; //将报错栈信息以js文件切割多条信息
    info.split('at').forEach(item => {
        if (item.match(geJsMap)) {
            infoList.push(item.match(geJsMap)[0])
            //行数和列信息需要根据具体报错信息格式分割
            lineList.push(item.split(':')[3])
            columnList.push(item.split(':')[4].split(')')[0])
        }
    })
    let pormiseList = getSourceMapList(infoList)
    Promise.all(pormiseList).then(res => {
        res.forEach((item, index) => {
            let ret = item.originalPositionFor({
                line: parseInt(lineList[index]), // 压缩后的行号
                column: parseInt(columnList[index])// 压缩后的列号
            })
            sourceList[index] = ret
        })
        console.log(sourceList)
    })
}

/**
 * @description: 将报错js文件名转换成相应map文件名并返回解析后的smc对象返回
 * @param {Array} list
 * @return {Array}
 * @author: longyunfei
 */
function getSourceMapList(list) {
    let result = []
    for (let i in list) {
        // 得到js文件对应的.map文件
        let fileUrl = `${list[i]}.map`;
        // 通过sourceMap解析map文件的smc对象
        let smc = new sourceMap.SourceMapConsumer(fs.readFileSync(`./js/${fileUrl}`, 'utf8')); // 返回的是一个promise对象
        result.push(smc)
    }
    return result
}

//得到的报错信息
let str = "TypeError: Cannot set property 'name' of undefined    at o.clickBtn (http://localhost:8080/js/chunk-3308011b.3c4f470b.js:1:680067)    at nt (http://localhost:8080/js/chunk-vendors.6b75dfdf.js:14:11644)    at HTMLLIElement.n (http://localhost:8080/js/chunk-vendors.6b75dfdf.js:14:13456)    at HTMLLIElement.Zr.a._wrapper (http://localhost:8080/js/chunk-vendors.6b75dfdf.js:14:51712)"

analyzingErrInfo(str)
```
这里得到了我们想要的报错信息

![解析后报错信息.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3d1b8569fe74ace80556637d7049507~tplv-k3u1fbpfcp-watermark.image)

## 总结
之前开会的时候还很担心自己一个小菜鸡搞不定，但一个插件总体开发下来，才发现其实并没有自己想象中的那么难。整个流程下来也学习到了不少，像vue插件的开发，npm包的发布等等...

插件还没有正式投入生产，可能还会有不少问题，但后续慢慢优化了，这里只是记录一下开发的过程。