/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-08-13 13:43:08
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-08-13 15:06:31
 */
const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  title: "小龙的成长记录",
  base: '/', // 格式：'/<部署仓库名>/'， 默认'/'
  description: "若要前行，就要离开你现在停留的地方。",
  dest: "public",
  theme: require.resolve('../../theme-reco-vdoing'), // 使用本地主题
  markdown: {
    lineNumbers: true // 代码行号
  },
  head,
  plugins,
  themeConfig
}