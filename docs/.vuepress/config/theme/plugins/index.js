/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-02-07 11:35:12
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-02-07 17:32:18
 */
module.exports = [
    '@vuepress/medium-zoom',
    ['ribbon'],
    // 鼠标点击特效
    [
      "cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: ['star'],  // shape of the particle, default: 'star'， 可选'circle'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    
    // 动态标题
    [
        "dynamic-title",
        {
          showIcon: "/favicon.ico",
          showText: "(/≧▽≦/)咦！又好了！",
          hideIcon: "/failure.ico",
          hideText: "(●—●)喔哟，崩溃啦！",
          recoverTime: 2000
        }
    ],
    ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
      title: '个人微信',
      body: [
        {
          type: 'title',
          content: '微信号：onlinelyf',
          style: 'text-align: left;font-size: 16px;padding-top:10px;'
        },
        {
          type: 'image',
          src: '/WeChat.jpg'
        }
      ]
    }]
] 