/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-02-06 10:58:08
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-02-07 14:07:52
 */
const themeReco = require('./themeReco.js')
const nav = require('./nav/')
const sidebar = require('./sidebar/')

module.exports = Object.assign({}, themeReco, {
  nav,
  sidebar,
  // logo: '/avatar.jpg',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
})