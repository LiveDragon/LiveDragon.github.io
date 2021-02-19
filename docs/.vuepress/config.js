/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-02-04 15:55:30
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-02-19 18:06:43
 */
const themeConfig = require('./config/theme/')
const plugins = require('./config/theme/plugins/')
module.exports = {
    base: '/',
    title: '龙云飞',
    description: '若要前行，就要离开你现在停留的地方',
    theme: 'reco',
    themeConfig,
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    plugins
}