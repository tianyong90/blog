(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{235:function(t,e,n){t.exports={}},240:function(t,e,n){"use strict";n(235)},255:function(t,e,n){"use strict";n.r(e);var r=n(11),o=n(2),c=(n(32),n(0)),l=n(237),m=n.n(l),d=n(238),v=c.a.extend({filters:{formatTime:function(t){return m()(t).format("YYYY-MM-DD")}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,c,l,m,d,v,x,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params,o=t.$content,c=t.error,l=n.title,e.prev=2,e.next=5,o("posts",n.title).fetch();case 5:m=e.sent,e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(2),e.abrupt("return",c({message:"Article not found"}));case 11:return console.log(m),e.next=14,o("posts").only(["title","slug"]).sortBy("createdAt","asc").surround(l).fetch();case 14:return d=e.sent,v=Object(r.a)(d,2),x=v[0],f=v[1],console.log(x,f),e.abrupt("return",{post:m,prev:x,next:f});case 20:case"end":return e.stop()}}),e,null,[[2,8]])})))()},data:function(){return{topImg:""}},head:function(){return{title:this.post.title,meta:[{hid:"keywords",name:"keywords",content:this.post.tags.join(",")},{hid:"description",name:"description",content:""}]}},mounted:function(){new d.a(".article").autoSpacing()},computed:{coverUrl:function(){return"/images/post-images/"+this.post.slug+this.post.top_img}}}),x=(n(240),n(15)),component=Object(x.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container max-w-4xl mx-auto my-4"},[n("img",{staticClass:"w-full h-64 md:h-128 object-cover cover-image",attrs:{src:t.coverUrl,alt:""}}),t._v(" "),n("div",{staticClass:"flex flex-col bg-white px-4 md:px-10 py-10 article"},[n("h1",{staticClass:"text-3xl text-gray-600 font-medium leading-none mb-10 title"},[t._v("\n      "+t._s(t.post.title)+"\n    ")]),t._v(" "),n("div",{staticClass:"heti"},[n("nuxt-content",{staticClass:"prose max-w-none prose-blue md:prose-lg lg:prose-xl article-content",attrs:{document:t.post}})],1)]),t._v(" "),n("div",{staticClass:"px-4 md:px-0 navigator"},[t.prev?n("nuxt-link",{staticClass:"navigator-btn mr-auto btn-prev",attrs:{tag:"a",to:t.prev.path}},[n("span",{staticClass:"mdi mdi-chevron-left"}),t._v(" 上一篇\n    ")]):t._e(),t._v(" "),t.next?n("nuxt-link",{staticClass:"navigator-btn ml-auto btn-next",attrs:{tag:"a",to:t.next.path}},[t._v("\n      下一篇"),n("span",{staticClass:"mdi mdi-chevron-right"})]):t._e()],1)])}),[],!1,null,"32dce058",null);e.default=component.exports}}]);