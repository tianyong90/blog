(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{104:function(e,t,n){"use strict";n(17);var o=n(154),r=n(155);t.a=function(e){var t=e.app,n=e.store,l=o.filter((function(e){return!e.draft}));n.commit("UPDATE_POST_COUNT",l.length),n.commit("UPDATE_UPDATED_AT",r.updatedAt);var c=new Date;2020===c.getFullYear()&&3===c.getMonth()&&4===c.getDate()&&window.document.body.classList.add("grayscale"),t.router.beforeEach((function(e,t,o){n.commit("UPDATE_DROPDOWN_MENU_VISIBLE",!1),o()}))}},128:function(e,t,n){},129:function(e,t,n){},154:function(e){e.exports=JSON.parse('[{"filename":"ElementUI-radio-小改造","slugifiedFilename":"elementui-radio-xiao-gai-zao","title":"ElementUI radio 小改造","date":"2019-08-10 16:22:20","top_img":"./top_img.jpg","tags":["ElementUI","el-radio"],"categories":[""],"description":"ElementUI 是自己比较钟爱的一套 vue 组件库，自己好几个项目里都在用它。一直以来这些丰富的组件，让我能快速的"},{"filename":"Homestead-laravel-mix-环境下-hmr-的两种玩法","slugifiedFilename":"homestead-laravel-mix-huan-jing-xia-hmr-de-liang-zhong-wan-fa","title":"Homestead + laravel-mix 环境下 hmr 的两种玩法","date":"2019-04-18T01:33:24.000Z","top_img":"./top_img.png","tags":["laravel-mix","homestead","hmr"],"categories":["前端","webpack"],"description":"我在前几天刚写过的《让 F5 歇一会儿——laravel-mix 自动刷新之道》中介绍了 laravel-mix 实现自"},{"filename":"Laravel-laravel-echo-EasyWeChat-实现微信扫码登录","slugifiedFilename":"laravel-laravel-echo-easywechat-shi-xian-wei-xin-sao-ma-deng-lu","title":"Laravel + laravel-echo + EasyWeChat 实现微信扫码登录","date":"2019-03-19T16:25:48.000Z","top_img":"./top_img.jpg","tags":["php","laravel","EasyWeChat"],"categories":["Laravel"],"description":"扫码登录成为一种日趋流行的登录方式，它具有较高的安全性，同时又使我们从记忆大量的账号密码并手动输入的繁琐流程中解脱出来，"},{"filename":"Laravel-中使用-puppeteer-采集异步加载的网页内容","slugifiedFilename":"laravel-zhong-shi-yong-puppeteer-cai-ji-yi-bu-jia-zai-de-wang-ye-nei-rong","title":"Laravel 中使用 puppeteer 采集异步加载的网页内容","date":"2019-03-10T16:44:31.000Z","top_img":"./top_img.png","tags":["laravel","puppeteer","采集"],"categories":["php","Laravel"],"description":"采集网页内容是一项很常见的需求，比较传统的静态页面，curl 就能搞定。但如果页面中有动态加载的内容，比如有些页面里通过"},{"filename":"Laravel-自动转换长整型雪花-ID-为字符串","slugifiedFilename":"laravel-zi-dong-zhuan-huan-chang-zheng-xing-xue-hua-id-wei-zi-fu-chuan","title":"Laravel 自动转换长整型雪花 ID 为字符串","date":"2020-10-Mo 16:05:59","top_img":"./top_img.jpg","tags":["Laravel","雪花 ID"],"categories":["Laravel"],"description":"在设计 API 时，出于安全性等因素考虑，有时需要放弃使用自增 ID，使 ID 非连续且不可猜测。通常可以使用 Hash"},{"filename":"deployer-实战经验分享","slugifiedFilename":"deployer-shi-zhan-jing-yan-fen-xiang","title":"deployer 实战经验分享","date":"2019-03-10T16:45:56.000Z","top_img":"./top_img.jpg","tags":["deployer","php"],"categories":"php","description":"开发完项目，免不了要部署上线。纯手动操作，登录、拉代码、改配置、清缓存、各种服务重启等等一条龙下来，人生宝贵的几分钟就过"},{"filename":"highlight-js-在-Vue-中使用的一点儿经验","slugifiedFilename":"highlight.js-zai-vue-zhong-shi-yong-de-yi-dian-er-jing-yan","title":"highlight.js 在 Vue 中使用的一点儿经验","date":"2019-03-10T16:42:07.000Z","top_img":"./top_img.jpg","tags":["vue","highlight.js"],"categories":["js","vue"],"description":"使用 markdown 来给程序写文档是非常方便的，自从用顺了 markdown 之后，都很久没打开过 Word 了。 "},{"filename":"intervention-image-中的一个小坑及其破解之法","slugifiedFilename":"intervention-image-zhong-de-yi-ge-xiao-keng-ji-qi-po-jie-zhi-fa","title":"intervention/image 中的一个小坑及其破解之法","date":"2019-03-10T16:39:54.000Z","top_img":"./top_img.jpg","tags":["intervention-image","php"],"categories":"php","description":"事实上 intervention/iamge 用了很有些时日了，它的 api 设计得很简洁，文档也很全面，用起来相当顺手"},{"filename":"laravel5-5-中读写分离需要注意的一点小问题","slugifiedFilename":"laravel5.5-zhong-du-xie-fen-chi-xu-yao-zhu-yi-de-yi-dian-xiao-wen-ti","title":"laravel5.5 中读写分离需要注意的一点小问题","date":"2019-03-10T16:41:04.000Z","top_img":"./top_img.jpg","tags":["laravel","读写分离"],"categories":["php","Laravel"],"description":"Laravel5.5 是 Laravel 最新的一个 LTS 版本，发布至今已有些时日，眼看着 5.6 都快出来了，最近"},{"filename":"swiper-js-loop-小坑","slugifiedFilename":"swiper.js-loop-xiao-keng","title":"swiper.js loop 小坑","date":"2020-02-08 02:15:49","top_img":"./top_img.png","tags":["swiper.js","vue"],"categories":["前端"],"description":"swiper.js 是一款强大的插件，也是我最喜欢的开源插件之一。它可以轻松实现轮播、tab 标签以及各种风骚的页面滑动"},{"filename":"也来扯扯-Vue-单元测试","slugifiedFilename":"ye-lai-che-che-vue-dan-yuan-ce-shi","title":"也来扯扯 Vue 单元测试","date":"2019-03-10T16:43:51.000Z","top_img":"./top_img.png","tags":["js","vue","jest","单元测试"],"categories":["js","vue"],"description":"从使用 Vue 写出第一个 Hello world 到现在已经有近两年时间了，期间利用业余时间折腾了一套组件 we-vu"},{"filename":"使用-Laravel-数据填充功能生成中文测试数据","slugifiedFilename":"shi-yong-laravel-shu-ju-tian-chong-gong-neng-sheng-cheng-zhong-wen-ce-shi-shu-ju","title":"使用 Laravel 数据填充功能生成中文测试数据","date":"2019-03-10T16:38:18.000Z","top_img":"./top_img.jpg","tags":["laravel","数据填充"],"categories":["php","Laravel"],"description":"今晚……不对，是昨晚，折腾一个的小项目，发现自动填充的中文数据显示起来总不太美观，于是开始琢磨如何填充中文数据进行测试。"},{"filename":"在-Laravel-项目中使用-webpack-encore","slugifiedFilename":"zai-laravel-xiang-mu-zhong-shi-yong-webpack-encore","title":"在 Laravel 项目中使用 webpack-encore","date":"2019-07-07T13:47:57.000Z","top_img":"./encore.png","tags":["webpack-encore","laravel-mix","laravel"],"categories":["前端"],"description":"看过我之前写过的博客的应该知道我一直是 laravel-mix 的死忠粉，有好几篇文章都是关于它的。每每提到 larav"},{"filename":"用-Algolia-DocSearch-轻松实现文档全站搜索","slugifiedFilename":"yong-algolia-docsearch-qing-song-shi-xian-wen-dang-quan-zhan-sou-suo","title":"用 Algolia DocSearch 轻松实现文档全站搜索","date":"2019-03-10T16:46:31.000Z","top_img":"./top_img.jpg","tags":["Algolia DocSearch","全站搜索"],"categories":["js"],"description":"话说，有两件事能让程序员抓狂，一是写文档，二是看别人的代码发现没写文档…… 没错，咱程序员就是这么“双标”。 :smil"},{"filename":"绳命在于折腾-我用-Nuxt-js-重构了博客","slugifiedFilename":"sheng-ming-zai-yu-zhe-teng-wo-yong-nuxt.js-chong-gou-liao-bo-ke","title":"绳命在于折腾，我用 Nuxt.js 重构了博客","date":"2019-05-26T03:11:46.000Z","top_img":"./top_img.png","tags":["博客","Nuxt.js"],"categories":["Vue"],"description":"博客地址: https://tianyong90.com github 仓库地址:https://github.com/"},{"filename":"自己撸个-vue-markdown-loader","slugifiedFilename":"zi-ji-lu-ge-vue-markdown-loader","title":"自己撸个 vue markdown loader","date":"2019-03-10T16:45:23.000Z","top_img":"./top_img.jpg","tags":["vue loader","markdown-loader"],"categories":["vue","webpack"],"description":"最近，当我把 vue-loader 升级到 v15 后发现，自己项目中所使用的一个 vue-markdown-loade"},{"filename":"让-F5-歇一会儿——laravel-mix-自动刷新之道","slugifiedFilename":"rang-f5-xie-yi-hui-er-laravel-mix-zi-dong-shua-xin-zhi-dao","title":"让 F5 歇一会儿——laravel-mix 自动刷新之道","date":"2019-04-12T22:07:38.000Z","top_img":"./top_img.jpg","tags":["laravel-mix","前端","laravel"],"categories":["前端","webpack"],"description":"转眼入行已五年有余，如今已经成长为一个全干程序员。回想起当初使用的一些工具以及工作流，感觉真是笨拙而粗暴，特别是对于浏览"}]')},155:function(e){e.exports=JSON.parse('{"updatedAt":"2022-02-14 16:16:09"}')},157:function(e,t,n){"use strict";var o={},r=n(7),component=Object(r.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("Nuxt")}),[],!1,null,null,null);t.a=component.exports},158:function(e,t,n){"use strict";n(22),n(19),n(17),n(42),n(43);var o=n(11),r=n(44),l=n(98),c=n(73),d=n(99);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var h={components:{Header:l.default,Footer:c.default,BackToTop:d.default},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(r.b)({postCount:function(e){return e.postCount},updatedAt:function(e){return e.updatedAt}}))},f=h,v=n(7),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Header"),e._v(" "),n("nuxt"),e._v(" "),n("Footer",{attrs:{"post-count":e.postCount,"updated-at":e.updatedAt}}),e._v(" "),n("BackToTop")],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{Header:n(98).default,Footer:n(73).default,BackToTop:n(99).default})},164:function(e,t,n){n(165),e.exports=n(166)},201:function(e,t,n){},204:function(e,t,n){"use strict";n(128)},207:function(e,t,n){"use strict";n(129)},208:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return o})),n.d(t,"mutations",(function(){return r}));var o=function(){return{dropdownMenuVisible:!1,postCount:0,updatedAt:""}},r={UPDATE_DROPDOWN_MENU_VISIBLE:function(e,t){e.dropdownMenuVisible=t},UPDATE_POST_COUNT:function(e,t){e.postCount=t},UPDATE_UPDATED_AT:function(e,t){e.updatedAt=t}}},215:function(e,t,n){var map={"./icons.svg":216,"./resume.svg":217};function o(e){var t=r(e);return n(t)}function r(e){if(!n.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}o.keys=function(){return Object.keys(map)},o.resolve=r,e.exports=o,o.id=215},216:function(e,t,n){"use strict";n.r(t),t.default=n.p+"59c8ce3c1873b55585be0341833a38fe.svg"},217:function(e,t,n){"use strict";n.r(t),t.default=n.p+"fe063f959a8e23a59b908ce3e9203835.svg"},31:function(e,t,n){"use strict";var o={props:{error:Object}},r=n(7),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.error.statusCode))])])}),[],!1,null,null,null);t.a=component.exports},73:function(e,t,n){"use strict";n.r(t);n(159);var o=n(1).a.extend({name:"Footer",props:{postCount:{type:Number,default:0},updatedAt:{type:String,default:""}}}),r=n(7),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"pt-6 pb-4 footer"},[n("div",{staticClass:"container mx-auto"},[n("p",{staticClass:"text-gray-800 text-center"},[e._v("\n      @2019-2022 ♥ tianyong90\n    ")]),e._v(" "),n("p",{staticClass:"text-gray-800 text-center text-sm"},[e._v("\n      共 "+e._s(e.postCount)+" 篇文章 最后更新于 "+e._s(e.updatedAt)+"\n    ")])])])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Footer:n(73).default})},98:function(e,t,n){"use strict";n.r(t);var o=n(2),r=(n(35),n(95),n(1)),l=n(151),c=n(152),d=r.a.extend({name:"Header",data:function(){return{posts:[],keyword:"",searchResult:[],fuse:null}},computed:{menutoggleClass:function(){return this.dropdownMenuVisible?"mdi-close":"mdi-menu"},dropdownMenuVisible:{get:function(){return this.$store.state.dropdownMenuVisible},set:function(e){this.$store.commit("UPDATE_DROPDOWN_MENU_VISIBLE",e)}}},watch:{keyword:function(e){this.searchResult=this.fuse.search(e)},$route:function(){this.keyword=""}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var o,r,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(n.t.bind(null,154,3));case 2:o=t.sent,r=o.default,r=Object(l.orderBy)(r,"date","desc"),e.posts=r,d={shouldSort:!0,threshold:.6,location:0,distance:100,minMatchCharLength:1,keys:["title"]},e.fuse=new c.a(e.posts,d);case 8:case"end":return t.stop()}}),t)})))()},methods:{toggleDropdownMenu:function(){this.dropdownMenuVisible=!this.dropdownMenuVisible}}}),m=(n(204),n(7)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"sticky inset-x-0 top-0 z-50 nav"},[n("div",{staticClass:"container flex mx-auto z-50 justify-between items-center h-full"},[n("nuxt-link",{staticClass:"text-white text-xl font-normal no-underline",attrs:{tag:"a",to:"/"}},[e._v("\n      田写\n    ")]),e._v(" "),n("div",{staticClass:"ml-auto mr-2 search-bar"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"search-input",attrs:{type:"text",placeholder:"搜索文章"},domProps:{value:e.keyword},on:{input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.searchResult.length>0,expression:"searchResult.length > 0"}],staticClass:"search-result"},e._l(e.searchResult,(function(t,o){return n("nuxt-link",{key:o,staticClass:"search-result-item",attrs:{tag:"a",to:"/posts/"+t.slugifiedFilename}},[e._v("\n          "+e._s(t.title)+"\n        ")])})),1)]),e._v(" "),n("div",{staticClass:"hidden md:flex space-x-8"},[n("nuxt-link",{staticClass:"text-white ml-4 font-light no-underline",attrs:{tag:"a",to:"/resume"}},[e._v("\n        个人简历\n      ")]),e._v(" "),n("a",{staticClass:"text-white ml-4 font-light no-underline",attrs:{href:"https://github.com/tianyong90",target:"_blank"}},[e._v("GitHub")]),e._v(" "),n("a",{staticClass:"text-white ml-4 font-light no-underline",attrs:{href:"https://weibo.com/1707227001",target:"_blank"}},[e._v("微博")])],1),e._v(" "),n("span",{staticClass:"md:hidden mdi text-white text-lg dropdown-menu-toggle",class:e.menutoggleClass,on:{click:e.toggleDropdownMenu}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.dropdownMenuVisible,expression:"dropdownMenuVisible"}],staticClass:"container flex md:hidden dropdown-menu"},[n("nuxt-link",{staticClass:"dropdown-menu-item",attrs:{to:"/resume"}},[e._v("\n        个人简历\n      ")]),e._v(" "),n("a",{staticClass:"dropdown-menu-item",attrs:{href:"https://github.com/tianyong90",target:"_blank"}},[e._v("GitHub")]),e._v(" "),n("a",{staticClass:"dropdown-menu-item",attrs:{href:"https://weibo.com/1707227001",target:"_blank"}},[e._v("微博")])],1)],1)])}),[],!1,null,"34769021",null);t.default=component.exports},99:function(e,t,n){"use strict";n.r(t);var o=n(1).a.extend({name:"BackToTop",data:function(){return{shouldShow:!1}},mounted:function(){var e=this;this.$nextTick((function(){e.shouldShow=window.scrollY>500,window.addEventListener("scroll",(function(t){e.shouldShow=window.scrollY>500}),!1)}))},methods:{onClick:function(){window.scrollTo({top:0,behavior:"smooth"})}}}),r=(n(207),n(7)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.shouldShow,expression:"shouldShow"}],staticClass:"btn-back-to-top",on:{click:function(t){return t.stopPropagation(),e.onClick.apply(null,arguments)}}},[n("i",{staticClass:"mdi mdi-arrow-collapse-up"})])}),[],!1,null,"aa1dd434",null);t.default=component.exports}},[[164,16,2,17]]]);