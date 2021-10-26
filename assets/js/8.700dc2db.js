(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{541:function(t,e,v){"use strict";v.r(e);var _=v(7),a=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"伪元素与伪类"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#伪元素与伪类"}},[t._v("#")]),t._v(" 伪元素与伪类")]),t._v(" "),v("p",[t._v("承接上篇css选择器的归类，细化区分一下伪元素和伪类的区别。ps：在日常开发中总是弄混。")]),t._v(" "),v("h2",{attrs:{id:"概念"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),v("ul",[v("li",[t._v("伪元素")])]),t._v(" "),v("p",[v("code",[t._v("w3c")]),t._v("定义：用于将特殊的效果添加到某些选择器。")]),t._v(" "),v("p",[t._v("我的理解：在原有的dom树中，添加新的元素并为它们添加效果")]),t._v(" "),v("ul",[v("li",[t._v("伪类")])]),t._v(" "),v("p",[v("code",[t._v("w3c")]),t._v("定义：用于向某些选择器添加特殊的效果。")]),t._v(" "),v("p",[t._v("我的理解：为处在不同状态中的已有元素添加效果")]),t._v(" "),v("h2",{attrs:{id:"伪元素有哪些"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#伪元素有哪些"}},[t._v("#")]),t._v(" 伪元素有哪些？")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("伪元素")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("after")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("在选中元素中创建一个后置的子节点")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("before")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("在选中元素中创建一个前置的子节点")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("first-line")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取文字块首行字符")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("first-letter")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取文字块首行首个字符")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("selection")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取文档中高亮(反白)的部分")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("placeholder")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取字段的占位符文本(提示信息)")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("grammar-error")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取被 UA 标记为语法错误的文本")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("spelling-error")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取被 UA 标记为拼写错误的文本")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("marker")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取列表自动生成的项目标记符号")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("cue")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("匹配所选元素中 WebVTT 提示")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("backdrop")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("匹配全屏模式下的背景")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("slotted")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("用于选定那些被放在 HTML模板 中的元素")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("inactive-selection")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("选取非活动状态时文档中高亮(反白)的部分")])])])]),t._v(" "),v("h2",{attrs:{id:"伪类划分"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#伪类划分"}},[t._v("#")]),t._v(" 伪类划分")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("伪类")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("分类")]),t._v(" "),v("th",[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:link")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("动态伪类")]),t._v(" "),v("td",[t._v("选择匹配的E元素，而且匹配元素被定义了超链接并未被访问过。常用于链接描点上")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:visited")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("动态伪类")]),t._v(" "),v("td",[t._v("选择匹配的E元素，而且匹配元素被定义了超链接并已被访问过。常用于链接描点上")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:active")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("动态伪类")]),t._v(" "),v("td",[t._v("选择匹配的E元素，且匹配元素被激活。常用于链接描点和按钮上")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:hover")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("动态伪类")]),t._v(" "),v("td",[t._v("选择匹配的E元素，且用户鼠标停留在元素E上。IE6及以下浏览器仅支持a:hover")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:focus")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("动态伪类")]),t._v(" "),v("td",[t._v("选择匹配的E元素，而且匹配元素获取焦点")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:fisrt-child")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("作为父元素的第一个子元素的元素E。与E:nth-child(1)等同")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:last-child")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("作为父元素的最后一个子元素的元素E。与E:nth-last-child(1)等同")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:root")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择匹配元素E所在文档的根元素。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E F:nth-child(n)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素E的第n个子元素F。其中n可以是整数（1，2，3）、关键字（even，odd）、可以是公式（2n+1）,而且n值起始值为1，而不是0.")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E F:nth-last-child(n)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素E的倒数第n个子元素F。此选择器与E:nth-child(n)选择器计算顺序刚好相反，但使用方法都是一样的，其中：nth-last-child(1)始终匹配最后一个元素，与last-child等同")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:nth-of-type(n)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素内具有指定类型的第n个E元素")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:nth-last-of-type(n)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素内具有指定类型的倒数第n个E元素")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:first-of-type")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素内具有指定类型的第一个E元素，与E:nth-of-type(1)等同")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:last-of-tye")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素内具有指定类型的最后一个E元素，与E:nth-last-of-type(1)等同")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:only-child")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素只包含一个子元素，且该子元素匹配E元素")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:only-of-type")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择父元素只包含一个同类型子元素，且该子元素匹配E元素")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:empty")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("结构伪类")]),t._v(" "),v("td",[t._v("选择没有子元素的元素，而且该元素也不包含任何文本节点")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E: lang(language)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("语言伪类")]),t._v(" "),v("td",[t._v("用来匹配使用指定语言的元素。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:checked")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("元素状态伪类")]),t._v(" "),v("td",[t._v("匹配每个选中的输入元素（仅适用于单选按钮或复选框）")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:enabled")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("元素状态伪类")]),t._v(" "),v("td",[t._v("匹配每个启用的的元素（主要用于表单元素）")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:disabled")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("元素状态伪类")]),t._v(" "),v("td",[t._v("匹配每个禁用的的元素（主要用于表单元素）")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:target")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("目标伪类")]),t._v(" "),v("td",[t._v("选择匹配E的所有元素，且匹配元素被相关URL指向。URL 带有后面跟有锚名称 #，指向文档内某个具体的元素，这个被链接的元素就是目标元素(target element)。")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("E:not(F)")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("否定伪类")]),t._v(" "),v("td",[t._v("匹配所有除F外的E元素")])])])]),t._v(" "),v("p",[t._v("css伪类可被分为6种，分别为："),v("code",[t._v("动态伪类")]),t._v("、"),v("code",[t._v("目标伪类")]),t._v("、"),v("code",[t._v("语言伪类")]),t._v("、"),v("code",[t._v("元素状态伪类")]),t._v("、"),v("code",[t._v("结构伪类")]),t._v("、"),v("code",[t._v("否定伪类")]),t._v("。其中动态伪类又包含两种：锚点伪类（常见有:link，:visited）、行为伪类（常见有:hover，:active和:focus）。")]),t._v(" "),v("h2",{attrs:{id:"区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[t._v("#")]),t._v(" 区别")]),t._v(" "),v("p",[t._v("伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素，所以两者的主要区别是："),v("code",[t._v("它们是否创建了一个文档树之外的元素")])]),t._v(" "),v("p",[v("strong",[t._v("css3规范中要求使用双冒号（::）表示伪元素，以此来区分伪类和伪元素")]),t._v("，但除了少部分伪元素如::backdrop必须使用双冒号（::），大部分伪元素都支持单冒号和双冒号的写法，比如::after，写成:after一样可以正常运行。")])])}),[],!1,null,null,null);e.default=a.exports}}]);