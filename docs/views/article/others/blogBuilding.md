---
title: 通过vuepress + travis-cl + github pages 搭建个人博客
date: 2020-02-06
categories:
 - 操作教程
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
此时效果如下：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cd5522bda8448af883acbe13c189588~tplv-k3u1fbpfcp-watermark.image)

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

实现博客基础布局：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b2b3b32dcb4fc0971ec9f060125878~tplv-k3u1fbpfcp-watermark.image)

从图中可以看出vuepress本身很简洁，如果我们想要实现更加美观的页面而又嫌配置麻烦，很幸运我们站在了前人的肩膀上，vuepress本身也支持配置主题，所以我们可以引用喜欢的主题，当然你也可以自己开发主题来为后人乘凉，本人使用的主题是[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)。

## 建立github仓库
1. 使用github创建项目[name].github.io。
仓库如此命名的原因是，在此目录下可以直接使用`https://[name].github.io/ `域名访问你的博客。

2. 使用`git remote add origin [你的仓库]`将本地代码与远程库关联

3. 通过`git checkout -b `切换到新分支，该分支存放文档源码，master分支用来存放打包好的 HTML 等文件
之所以在master分支存放打包后的文件，是因为如果存放的不是打包后的文件，那么通过`https://[name].github.io`的域名访问，得到的将是是README自述文件，也可以通过Github Pages改变来源，本质上还是将打包文件放到你要访问的来源上。

## 通过travis-cl实现自动化打包部署
1. 首先我们需要在项目的根目录下建立`.travis.yml`文件，并写如如下配置
```yml
language: node_js
node_js:
    - 10
cache: yarn
install:
    - yarn
script:
    - yarn build
after_success:
    - cd docs/.vuepress/dist
    - git init
    - git config --global user.name "${U_NAME}"
    - git config --global user.email "${U_EMAIL}"
    - git add -A
    - git commit -m 'deploy'
    - git push --quiet --force "https://${GH_TOKEN}@${GH_REF}" master:${P_BRANCH}
```
::: tip
* language: 语言选择 这里用node
* node_js：使用的node版本
* cache： yarn缓存
* install： 安装依赖使用的包管理工具，yarn和npm均可 yarn更快
* script： 一切就绪后通过yarn install安装依赖
* after_success： 安装完成后执行的后续操作，将打包文件自动发布到你配置的对应仓库分支，这里的`${}`是在travis-cl中配置的环境变量，后文再说
:::

2. 为travis-cl创建一个Personal access tokens，[地址](https://github.com/settings/tokens)，权限根据自己的需要授权，不必全选。

3. 访问[travis-cl](https://travis-ci.com/)，使用github账号登录，再进入[dashboard](https://travis-ci.com/dashboard),此时就可以看见你的git仓库了。

4. 启动进入github.io这个项目，再通过setting，来配置上文提到的环境变量。
::: tip
* GH_REF: 项目地址（github.com/[name]/[name].github.io.git）注意去掉 https://
* GH_TOKEN: 上面提到的Personal access tokens
* U_NAME：你的github用户名
* U_EMAIL: 你的github邮箱
:::

5. 进入github.io仓库的setting页面修改`GitHub Pages`的值为上面`.travis.yml`中配置的分支，也可以直接使用master分支。

到这里，travis-ci部署已经完成，我们下一次提交代码到github，就会触发travis-ci自动构建，将打包文件上传到指定分支，上传完成后,就可以通过`https://[name].github.io/`来访问你的博客了。

## 总结
其实，目前网络上搭建博客的框架有很多比如我这次使用的`vuepress`，另外还有`hexo`、`jekyll`等等，搭建博客也变的很简单，难的其实是搭建完成后，持之以恒的发布博文，记录自己的技术积累，希望自己能坚持下去。
这次的博客其实是运行在`GitHub Page`上的，使用的是github提供的服务器，希望未来学习node等服务端语言后，搭建自己的服务器后再将博客搬到自己的服务器上。
