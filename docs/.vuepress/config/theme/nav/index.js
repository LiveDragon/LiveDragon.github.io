/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2021-02-06 11:02:35
 * @LastEditors: longyunfei
 * @LastEditTime: 2021-02-06 15:38:08
 */

module.exports = [
    { text: '首页', link: '/',  icon: 'reco-home' },
    { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
    { 
        text: '关于我', 
        icon: 'reco-message',
        items: [
            { text: '关于我', link: '/views/about/me', icon: 'reco-account' },
            { text: 'GitHub', link: 'https://github.com/LiveDragon', icon: 'reco-github' },
        ]
    }
]