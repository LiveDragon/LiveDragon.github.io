---
title: 记一次h5页面ios唤起软键盘踩坑
date: 2021-02-08 10:00:37
permalink: /pages/da80241dc496d/
categories:
  - 经验
tags:
  - ios
---

周一刚一来到公司，产品便随口对我提了一句，"本周我们要在项目中添加一个类似论坛的功能模块"。没多想我也随口答了声"ok"。

没过一会儿，便和产品与后端同事一起碰了个头，很常规的需求，总结一下大致就是发帖，评论，点赞，分享四个功能，讨论一番后没什么问题，便开始等ui然后投入开发。

## 问题出现

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50e58447d8c647a4a53c8b863160eb57~tplv-k3u1fbpfcp-watermark.image)

上图便是模块中发布帖子的页面，看上去没有什么坑可以踩，写完页面在电脑端和我自己的安卓手机上也都没什么问题，最后拿来苹果的测试机，打开页面便出现了如下问题。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c6c293550484066adec84b18b12ad47~tplv-k3u1fbpfcp-watermark.image)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/380fcddb13254bd9b9ac1aea2a353ab5~tplv-k3u1fbpfcp-watermark.image)

从两张图中可以看出，和安卓手机不同，唤起软键盘时底部的操作栏没有和软键盘一起被顶上来，仍处于页面最底端，需要向下滑动页面才可以看到，这和设计的初衷完全相悖。

## 问题原因

### fiexd定位在ios唤起软键盘时失效

ios中唤起软键盘后会根据相应情况发生如下情况：

- 当前内容高度小于屏幕高度时：上下滑动页面时候，发现之前fixed定位在顶部的元素会跟随页面滚动，变成了absolute定位的效果。
- 当前内容高度大于屏幕高度时：之前fixed定位的元素不在原先的位置，下滑往上翻页面后，才会发现该元素出现在视图中。

### ios在唤起软键盘时并不压缩webview高度

安卓手机中唤起软键盘时页面会压缩webview的高度，窗口会执行resize事件，但ios并不会。

## 解决思路

由于ios不压缩webview视图，我定位的元素仍在webview的底部，但与安卓不同的是此时webview的底部并不是软键盘上方。

所以如果我们可以获取到软键盘的高度，将元素重新定位便可以解决这个bug。

## 解决过程

因为我的项目是用uniapp开发的，所以首先我去官网瞅一瞅，看看有没有现成的api可以供我搬运，哈哈。

你别说，官网确实有。

- 监听键盘高度变化，<a href="https://uniapp.dcloud.io/api/key?id=onkeyboardheightchange">官网地址</a>

- 在input的focus事件中获取软键盘高度，<a href="https://uniapp.dcloud.io/component/input">官网地址</a>

但可惜的是上述两种方法`均不支持h5`，不说了，哭晕在工位。

看来api是不能愉快的接入了，只能自己想想怎么写了。

我的思路是通过`innerHeight`的变化来判断软键盘高度，但ios不压缩webview，所以这直接阻绝了我。另附我找到的<a href="https://www.jianshu.com/p/f5253b3ab100?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation">键盘弹出对iOS浏览器窗口高度的影响。</a>

就在我逐渐烦躁，几乎放弃,准备另寻思路的时候，偶然看见<a href="https://developer.mozilla.org/zh-cn/docs/web/api/element/scrollintoview">Element.scrollIntoView</a>方法，执行此方法会滚动元素的父元素，直到该元素可视。

果断试一试，唤起软键盘时取消定位，ios效果如下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d790c20bee2e47f8908f1152227459d6~tplv-k3u1fbpfcp-watermark.image)

可以看到 键盘弹出的时候，底部操作栏被推上来了，但问题也很明显，整个视图被上移了操作栏虽然出现在了软键盘上，但输入框却被挤到视图外，不过问题不大，我们的目的已经达到了，此时我们可以通过视图偏移量，来得到软键盘的高度。

通过<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect">Element.getBoundingClientRect</a>方法，我们可以拿到视图的偏移量，该方法返回一个`DOMRect`对象，该对象提供有关元素大小及其相对于视图位置的信息。

获取到偏移量后为操作栏重新添加定位，但要注意重新定位底部操作栏后，上方编辑区域的高度也需要重新设置，不然会出现下面的情况，定位元素遮盖输入框。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/425eb4d16de147b6b8d0990f9a027e05~tplv-k3u1fbpfcp-watermark.image)


在聚焦事件里根据视图偏移量为输入框设置高度，失去焦点时再还原，就解决元素错乱的问题。

最后附上结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0adb11508e94406834f53f794a2b3a6~tplv-k3u1fbpfcp-watermark.image)

## 贴上代码

```html
<template>
  <view ref="posting" class="posting">
      <scroll-view 
           :style="{'height': scrollHeight}"
            class="scroll-view"
            :scroll-y="true">
        <view class="main">
            <u-input :height="200" :maxlength="500" v-model="value" @focus="focusIpt" @blur="blurIpt" placeholder="写下您的见解" type="textarea" />
        </view>
      </scroll-view>
      
      <view class="bottom" ref="bottom" :style="{'bottom': bottomVal + 'px', 'position': isFiexd ? 'absolute' : 'relative'}">
          <view class="edit-row">
             底部操作栏
          </view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        bottomVal: 0,
        scrollHeight: 'calc(100vh - 196rpx)',
        isFiexd: true
    };
  },
  onLoad(e) {
  },
  methods: {
    blurIpt() {
        this.bottomVal = 0
        this.scrollHeight = 'calc(100vh - 196rpx)'
    },
    focusIpt() {
        //获取系统信息
        let info = uni.getSystemInfoSync()
        if(info.platform === 'ios') {
            this.isFiexd = false
            setTimeout(() => {
                this.$refs.bottom.$el.scrollIntoView()
                let viewInfo = this.$refs.posting.$el.getBoundingClientRect()
                //获取视图偏移量，重新定位操作栏
                this.bottomVal = Math.abs(parseFloat(viewInfo.top))
                //重置编辑区高度
                this.scrollHeight =  `calc(100vh - ${98 + this.bottomVal}px )`
                //还原偏移量
                scrollTo(0,0)
                this.isFiexd = true
            },500)
        }
    },
  }
};
</script>


```

## 总结

兼容性问题是真的难搞，有个思路走着走着发现走不通是真的难受。不过解决问题的过程中，可以学到很多不熟悉的知识点 。百度也能看见很多人解决问题的思路，虽然有很多可能都不适用于我的场景，但还是受教良多。