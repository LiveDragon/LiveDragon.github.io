
// nav
module.exports = [
  { text: '首页', link: '/', icon: 'reco-home' },
  { 
    text: '文档', 
    link: '',
    icon: '',
    items: [
      { text: '慕课教程', link: '/web/docs/imooc/wiki/', icon: 'reco-blog' },
      { text: 'ES6 入门教程', link: '/web/docs/es6/', icon: 'reco-blog' },
      { text: 'React 文档', link: '/web/docs/react/', icon: 'reco-blog' },
      { text: 'Vue 文档', link: '/web/docs/vue/', icon: 'reco-blog' },
      { text: 'Node 文档', link: '/web/docs/node/', icon: 'reco-blog' },
      { text: 'Babel 文档', link: '/web/docs/babel/', icon: 'reco-blog' },
      { text: 'Webpack 文档', link: '/web/docs/webpack/', icon: 'reco-blog' },
      { text: 'TypeScript 文档', link: '/web/docs/typescript/', icon: 'reco-blog' },
      { text: 'Turf 文档', link: '/web/docs/turf/', icon: 'reco-blog' },
      { text: '菜鸟教程', link: '/web/docs/runoob/', icon: 'reco-blog' },
      { text: '印记中文', link: '/web/docs/docschina/', icon: 'reco-blog' },
    ]
  },
  {
    text: '索引',
    icon: 'reco-api',
    items: [
      { text: '分类', link: '/categories/', icon: 'reco-category' },
      { text: '标签', link: '/tags/', icon: 'reco-tag' },
      { text: '归档', link: '/archives/', icon: 'reco-date' },
    ]
  },
  // { text: '留言板', link: '/bookshop/message-board/', icon: 'reco-suggestion' },
  { text: '资源导航', link: '/web/docs/nav/', icon: 'reco-api' },
  {
    text: '关于',
    icon: 'reco-message',
    items: [
      {
        text: '联系',
        items: [
          { text: 'GitHub', link: 'https://github.com/LiveDragon', icon: 'reco-github' },
          { text: '关于我', link: '/bookshop/aboutme/', icon: 'reco-account' },
        ]
      },
      {
        text: '博客',
        items: [
          { text: '本站源码', link: 'https://github.com/LiveDragon/LiveDragon.github.io/', icon: 'reco-document' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: '友情链接', link: '/bookshop/friendslink/', icon: 'reco-friend' },
        ]
      },
    ]
  }
]
