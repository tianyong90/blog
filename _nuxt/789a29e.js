(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{194:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(83);function r(t){return encodeURI(t).replace(/%5B/g,"[").replace(/%5D/g,"]")}},196:function(t,e,n){},208:function(t,e,n){"use strict";var r=n(6),o=n(209)(5),c=!0;"find"in[]&&Array(1).find((function(){c=!1})),r(r.P+r.F*c,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(86)("find")},209:function(t,e,n){var r=n(32),o=n(85),c=n(33),f=n(16),d=n(210);t.exports=function(t,e){var n=1==t,l=2==t,h=3==t,m=4==t,v=6==t,$=5==t||v,y=e||d;return function(e,d,w){for(var O,D,M=c(e),_=o(M),x=r(d,w,3),S=f(_.length),k=0,j=n?y(e,S):l?y(e,0):void 0;S>k;k++)if(($||k in _)&&(D=x(O=_[k],k,M),t))if(n)j[k]=D;else if(D)switch(t){case 3:return!0;case 5:return O;case 6:return k;case 2:j.push(O)}else if(m)return!1;return v?-1:h||m?m:j}}},210:function(t,e,n){var r=n(211);t.exports=function(t,e){return new(r(t))(e)}},211:function(t,e,n){var r=n(10),o=n(129),c=n(3)("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[c])&&(e=void 0)),void 0===e?Array:e}},212:function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",c="date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,d=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},h=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},m={s:h,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+h(r,2,"0")+":"+h(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(f){return{M:u,y:o,w:s,d:i,D:c,h:r,m:n,s:e,ms:t,Q:a}[f]||String(f||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",$={};$[v]=l;var y=function(t){return t instanceof D},w=function(t,e,n){var r;if(!t)return v;if("string"==typeof t)$[t]&&(r=t),e&&($[t]=e,r=t);else{var i=t.name;$[i]=t,r=i}return!n&&r&&(v=r),r||!n&&v},O=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},g=m;g.l=w,g.i=y,g.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function l(t){this.$L=this.$L||w(t.locale,null,!0),this.parse(t)}var h=l.prototype;return h.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(f);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},h.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},h.$utils=function(){return g},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},h.isAfter=function(t,e){return O(t)<this.startOf(e)},h.isBefore=function(t,e){return this.endOf(e)<O(t)},h.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(t,a){var f=this,d=!!g.u(a)||a,l=g.p(t),h=function(t,e){var n=g.w(f.$u?Date.UTC(f.$y,e,t):new Date(f.$y,e,t),f);return d?n:n.endOf(i)},m=function(t,e){return g.w(f.toDate()[t].apply(f.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),f)},v=this.$W,$=this.$M,y=this.$D,w="set"+(this.$u?"UTC":"");switch(l){case o:return d?h(1,0):h(31,11);case u:return d?h(1,$):h(0,$+1);case s:var O=this.$locale().weekStart||0,D=(v<O?v+7:v)-O;return h(d?y-D:y+(6-D),$);case i:case c:return m(w+"Hours",0);case r:return m(w+"Minutes",1);case n:return m(w+"Seconds",2);case e:return m(w+"Milliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(s,a){var f,d=g.p(s),l="set"+(this.$u?"UTC":""),h=(f={},f[i]=l+"Date",f[c]=l+"Date",f[u]=l+"Month",f[o]=l+"FullYear",f[r]=l+"Hours",f[n]=l+"Minutes",f[e]=l+"Seconds",f[t]=l+"Milliseconds",f)[d],m=d===i?this.$D+(a-this.$W):a;if(d===u||d===o){var v=this.clone().set(c,1);v.$d[h](m),v.init(),this.$d=v.set(c,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.get=function(t){return this[g.p(t)]()},h.add=function(t,a){var c,f=this;t=Number(t);var d=g.p(a),l=function(e){var n=O(f);return g.w(n.date(n.date()+Math.round(e*t)),f)};if(d===u)return this.set(u,this.$M+t);if(d===o)return this.set(o,this.$y+t);if(d===i)return l(1);if(d===s)return l(7);var h=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[d]||1,m=this.$d.getTime()+t*h;return g.w(m,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,c=i.months,f=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},l=function(t){return g.s(s%12||12,t,"0")},h=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:f(i.monthsShort,a,c,3),MMMM:f(c,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:f(i.weekdaysMin,this.$W,o,2),ddd:f(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:l(1),hh:l(2),a:h(s,u,!0),A:h(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(d,(function(t,e){return e||m[t]||r.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(t,c,f){var d,l=g.p(c),h=O(t),m=6e4*(h.utcOffset()-this.utcOffset()),v=this-h,$=g.m(this,h);return $=(d={},d[o]=$/12,d[u]=$,d[a]=$/3,d[s]=(v-m)/6048e5,d[i]=(v-m)/864e5,d[r]=v/36e5,d[n]=v/6e4,d[e]=v/1e3,d)[l]||v,f?$:g.a($)},h.daysInMonth=function(){return this.endOf(u).$D},h.$locale=function(){return $[this.$L]},h.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},h.clone=function(){return g.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},l}(),p=D.prototype;return O.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",c]].forEach((function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t(e,D,O),O},O.locale=w,O.isDayjs=y,O.unix=function(t){return O(1e3*t)},O.en=$[v],O.Ls=$,O}()},213:function(t,e,n){var map={"./CSS-减肥灵药——purgecss.md":[216,9],"./ElementUI-radio-小改造.md":[217,10],"./Homestead-laravel-mix-环境下-hmr-的两种玩法.md":[218,11],"./Laravel-laravel-echo-EasyWeChat-实现微信扫码登录.md":[219,12],"./Laravel-中使用-puppeteer-采集异步加载的网页内容.md":[220,13],"./deployer-实战经验分享.md":[221,14],"./github-wakatime-x-dashboard.md":[222,15],"./highlight-js-在-Vue-中使用的一点儿经验.md":[223,16],"./intervention-image-中的一个小坑及其破解之法.md":[224,17],"./laravel5-5-中读写分离需要注意的一点小问题.md":[225,18],"./swiper-js-loop-小坑.md":[226,19],"./也来扯扯-Vue-单元测试.md":[227,20],"./使用-Laravel-数据填充功能生成中文测试数据.md":[228,21],"./在-Laravel-项目中使用-webpack-encore.md":[229,22],"./如何用-Vue-写一个虚拟数字键盘.md":[230,23],"./小分享——webpack-encore-laravel-helpers.md":[231,24],"./用-Algolia-DocSearch-轻松实现文档全站搜索.md":[232,25],"./绳命在于折腾-我用-Nuxt-js-重构了博客.md":[233,26],"./自己撸个-vue-markdown-loader.md":[234,27],"./让-F5-歇一会儿——laravel-mix-自动刷新之道.md":[235,28]};function r(t){if(!n.o(map,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=map[t],r=e[0];return n.e(e[1]).then((function(){return n.t(r,7)}))}r.keys=function(){return Object.keys(map)},r.id=213,t.exports=r},214:function(t,e,n){"use strict";var r=n(196);n.n(r).a},238:function(t,e,n){"use strict";n.r(e);n(52),n(22),n(25),n(13),n(38);var r=n(20),o=(n(83),n(208),n(31),n(2)),c=n(0),f=n(212),d=n.n(f),l=n(84),h=n(194);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var $=c.a.extend({filters:{formatTime:function(t){return d()(t).format("YYYY-MM-DD")}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,o,c,f,d,m,$,y,w,O,D,M,html,_,x;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,e.next=3,Promise.resolve().then(n.t.bind(null,124,3));case 3:return o=e.sent,c=o.default,c=Object(l.orderBy)(c,"date","desc"),f=r.slug,d=c.find((function(t){return t.slugifiedFilename===f})),m=c.indexOf(d),$=0===m?null:c[m-1],y=m===c.length-1?null:c[m+1],w=$?"/posts/".concat($.slugifiedFilename):null,O=y?"/posts/".concat(y.slugifiedFilename):null,D=d.filename,e.next=16,n(213)("./".concat(D,".md"));case 16:return M=e.sent,html=M.html,(_=M.attributes).top_img&&(x=_.top_img.replace(/^\./,Object(h.a)("https://raw.githubusercontent.com/tianyong90/blog/gh-pages/_nuxt/posts/".concat(D,"/")))),e.abrupt("return",v(v({},_),{},{topImg:x,html:html.replace(/src="\.\//g,'src="'+Object(h.a)("https://raw.githubusercontent.com/tianyong90/blog/gh-pages/_nuxt/posts/".concat(D,"/"))),prevLink:w,nextLink:O}));case 21:case"end":return e.stop()}}),e)})))()},data:function(){return{topImg:""}},head:function(){return{title:this.title,meta:[{hid:"keywords",name:"keywords",content:this.tags.join(",")},{hid:"description",name:"description",content:""}]}}}),y=(n(214),n(12)),component=Object(y.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container mt-4 md:my-4"},[n("div",{staticClass:"post rounded-lg overflow-hidden bg-white"},[n("img",{staticClass:"w-full cover-image",attrs:{src:t.topImg,loading:"lazy"}}),t._v(" "),n("div",{staticClass:"px-4 md:px-8 py-2"},[n("div",{staticClass:"mb-4"},[n("h1",{staticClass:"text-gray-800 text-xl font-normal",domProps:{textContent:t._s(t.title)}}),t._v(" "),n("div",{staticClass:"text-gray-700 text-xs post-date"},[t._v(t._s(t._f("formatTime")(t.date)))])]),t._v(" "),n("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.html)}}),t._v(" "),n("div",{staticClass:"social-share"})])]),t._v(" "),n("div",{staticClass:"px-4 md:px-0 navigator"},[t.prevLink?n("nuxt-link",{staticClass:"navigator-btn mr-auto btn-prev",attrs:{tag:"a",to:t.prevLink}},[n("span",{staticClass:"mdi mdi-chevron-left"}),t._v(" 上一篇\n    ")]):t._e(),t._v(" "),t.nextLink?n("nuxt-link",{staticClass:"navigator-btn ml-auto btn-next",attrs:{tag:"a",to:t.nextLink}},[t._v("下一篇"),n("span",{staticClass:"mdi mdi-chevron-right"})]):t._e()],1)])}),[],!1,null,"27cbca2e",null);e.default=component.exports}}]);