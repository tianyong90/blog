(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{195:function(t,e,n){},207:function(t,e,n){"use strict";var o=n(195);n.n(o).a},237:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(199),l=n.n(r),d=o.a.extend({data:function(){return{repos:[]}},head:function(){return{title:"开源"}},mounted:function(){var t=this;this.$axios.get("https://tianyong90.com/githubapi-data.json").then((function(e){t.repos=e.data.data.user.repositories.nodes}))},methods:{getLanguageTagStyle:function(t){return{backgroundColor:t,color:l()(t).isDark()?"#fff":"#000"}}}}),c=(n(207),n(12)),component=Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container mx-auto"},[n("transition-group",{staticClass:"repo-list",attrs:{name:"list",tag:"div"}},t._l(t.repos,(function(e){return n("div",{key:e.name,staticClass:"shadow-md flex-col rounded-lg relative p-4 repo-list-item"},[n("a",{staticClass:"text-xl font-medium text-gray-800 no-underline",attrs:{href:e.url,target:"_blank"},domProps:{textContent:t._s(e.name)}}),t._v(" "),n("div",{staticClass:"text-sm font-light text-gray-700 py-3"},[t._v("\n        "+t._s(e.description)+"\n      ")]),t._v(" "),n("div",{staticClass:"absolute bottom-0 mb-4"},[e.languages.nodes.length>0?n("span",{staticClass:"mr-3 text-white text-xs px-2 py-1 rounded-sm",style:t.getLanguageTagStyle(e.languages.nodes[0].color)},[t._v(t._s(e.languages.nodes[0].name))]):t._e(),t._v(" "),n("div",{staticClass:"mr-3 text-gray-700 stars"},[n("span",{staticClass:"mdi mdi-star"}),t._v(" "+t._s(e.stargazers.totalCount)+"\n        ")]),t._v(" "),n("div",{staticClass:"mr-3 text-gray-700 stforksars"},[n("span",{staticClass:"mdi mdi-directions-fork"}),t._v(" "+t._s(e.forks.totalCount)+"\n        ")])])])})),0)],1)}),[],!1,null,"1fc6e1aa",null);e.default=component.exports}}]);