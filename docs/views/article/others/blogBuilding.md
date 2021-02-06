---
title: 通过vuepress + travis-cl + github pages 搭建个人博客
date: 2020-02-06
categories:
 - web基础
tags:
 - 博客搭建
---
::: tip
记录本次博客搭建过程，本文参考[拯救懒癌文档君 - VuePress + Travis CI + Github Pages 自动线上生成文档](https://juejin.im/post/5d0715f6f265da1ba56b1e01)
:::

## 通过VuePress构建博客页面
1. 通过包管理工具初始化项目
``` sh
yarn init # npm init
```
2. 将vuepress安装为本地依赖
```sh
yarn add -D vuepress # npm install -D vuepress
```
3. 创建第一篇文档
```sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```
4. 在`package.json`中添加一些`script`
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```
5. 启动本地服务器
```sh
yarn dev #npm run dev
```
此时效果如下![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cd5522bda8448af883acbe13c189588~tplv-k3u1fbpfcp-watermark.image)：

6.在`docs`目录下建立`.vuepress`并在改目录下新建`config.js`文件可以实现网站的各项配置。
此时目录结构为：
```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```
具体配置详见[vuepress官网](https://vuepress.vuejs.org/zh/config/)。

实现博客基础布局
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b2b3b32dcb4fc0971ec9f060125878~tplv-k3u1fbpfcp-watermark.image)

从图中可以看出vuepress本身很简洁，如果我们想要实现更加美观的页面又嫌配置麻烦，很幸运我们站在了前人的肩膀上，vuepress本身也支持配置主题，所以我们可以引用喜欢的主题，当然我们也可以自己开发主题为后人乘凉，我个人使用的主题是[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)。

## 建立github仓库
1. 使用github创建项目[name].github.io。
仓库如此命名的原因是，在此目录下可以直接使用`https://[name].github.io/ `域名访问你的博客。

2. 使用`git remote add origin [你的仓库]`将本地代码与远程库关联

3. 通过`git checkout -b `切换到新分支，该分支存放文档源码，master分支用来存放打包好的 HTML 等文件
之所以在master分支存放打包后的文件，是因为需要通过`https://[name].github.io`的域名访问，也可以通过Github Pages改变来源。

## 通过travis-cl实现自动化打包部署
