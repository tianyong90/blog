(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{236:function(t,e,n){t.exports={}},241:function(t,e,n){"use strict";n(236)},256:function(t,e,n){"use strict";n.r(e);var r=n(2),o=(n(32),n(0)),c=o.a.extend({asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.query,o=parseInt(r.page||1),e.next=4,n("posts").where({draft:!1}).sortBy("createdAt","desc").limit(12).skip(12*(o-1)).fetch();case 4:return c=e.sent,e.next=7,n("posts").only(["title"]).where({draft:!1}).fetch();case 7:return l=e.sent.length,e.abrupt("return",{posts:c,page:o,totalPostCount:l});case 9:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"首页",meta:[{hid:"keywords",name:"keywords",content:"田写，田勇的博客，tianyong90,田较瘦"},{hid:"description",name:"description",content:"田勇的个人博客，技术、分享、生活及其它"}]}},computed:{paginatedPosts:function(){var t=Math.ceil(this.totalPostCount/12),e=parseInt(this.page),n=1===e,r=e===t;return{is_first_page:n,is_last_page:r,prev_link:n?"":"/?page="+(e-1),next_link:r?"":"/?page="+(e+1)}}},watch:{$route:function(t,e){var n=this,r=parseInt(t.query.page||1);this.$content("posts").where({draft:!1}).sortBy("createdAt","desc").limit(12).skip(12*(r-1)).fetch().then((function(t){n.posts=t})),this.page=r}},methods:{coverImgUrl:function(t){return"/images/post-images/"+t.slug+t.top_img}}}),l=(n(241),n(15)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container mx-auto"},[n("div",{staticClass:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10 post-list"},t._l(t.posts,(function(e){return n("nuxt-link",{key:e.title,staticClass:"shadow-md rounded-md overflow-hidden post-list-item",attrs:{to:e.path}},[n("div",{staticClass:"cover-wrapper"},[n("img",{staticClass:"post-cover",attrs:{src:t.coverImgUrl(e),loading:"lazy"}})]),t._v(" "),n("div",{staticClass:"flex flex-col h-full justify-between p-4"},[n("h1",{staticClass:"text-gray-800 text-lg font-normal no-underline post-title"},[t._v("\n          "+t._s(e.title)+"\n        ")]),t._v(" "),n("ul",{staticClass:"flex mt-4"},t._l(e.tags,(function(e,r){return n("li",{key:r,staticClass:"bg-gray-600 mr-1 px-2 py-1 rounded-sm text-sm text-white font-light tag",domProps:{textContent:t._s(e)}})})),0)])])})),1),t._v(" "),n("div",{staticClass:"paginator"},[t.paginatedPosts.is_first_page?t._e():n("nuxt-link",{staticClass:"paginator-btn mr-auto btn-prev",attrs:{to:t.paginatedPosts.prev_link}},[n("span",{staticClass:"mdi mdi-chevron-left"}),t._v(" 上一页\n    ")]),t._v(" "),t.paginatedPosts.is_last_page?t._e():n("nuxt-link",{staticClass:"paginator-btn ml-auto btn-next",attrs:{to:t.paginatedPosts.next_link}},[t._v("\n      下一页"),n("span",{staticClass:"mdi mdi-chevron-right"})])],1)])}),[],!1,null,"41b05bb8",null);e.default=component.exports}}]);