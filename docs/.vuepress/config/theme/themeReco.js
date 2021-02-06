/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-02-06 10:59:01
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-02-06 18:10:56
 */
module.exports = {
    type: 'blog',
    fullscreen: true,
    mode: 'light',
    authorAvatar: '/avatar.jpg',
    logo: '/logo.jpg',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    markdown: {
      lineNumbers: true, //代码显示行号
    },
    codeTheme: 'tomorrow',
    // 最后更新时间
    lastUpdated: '上次更新时间', // string | boolean
    // 作者
    author: '龙云飞',
    // 备案号
    record: '',
    // 项目开始时间
    startYear: '2021',
    search: true,
    searchMaxSuggestions: 10,
}