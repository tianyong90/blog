(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{220:function(n,t){n.exports={html:'<p>ElementUI 是自己比较钟爱的一套 vue 组件库，自己好几个项目里都在用它。一直以来这些丰富的组件，让我能快速的搞定各种后台管理页面，极大地提高了工作效率。</p>\n<p>但是不管什么软件，肯定都没办法称之为完美，而最近的几个小需求中，也发现了 element ui 的一些不足（也可能是因为自己的需求比较奇葩吧）。其中一点就是本文要提到的，radio 绑定对象类型值的问题。</p>\n<p>具体现象就是，当通过 mapState 方法自动一个计算对象数组，然后将它绑定到 el-radio 上时，el-radio-group 里的 el-radio 无法根据其绑定值正确的显示 checked 状态。</p>\n<p>例如下面这段代码：</p>\n\x3c!--beforebegin--\x3e<div class="language-html extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio-group</span>\n      <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>checkedUser<span class="token punctuation">"</span></span>\n    <span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-radio</span>\n        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>(user, index) in users<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span>\n        {{ `${user.name}(${user.age}岁)` }}\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio</span> <span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-radio-group</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>当前选中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">></span></span>{{ checkedUser }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'vuex\'</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n\n  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      checkedUser<span class="token operator">:</span> <span class="token punctuation">{</span>\n        name<span class="token operator">:</span> <span class="token string">\'C\'</span><span class="token punctuation">,</span>\n        age<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  computed<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token function-variable function">users</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>users\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>其中 users 为 vuex store 中的 state。</p>\n\x3c!--beforebegin--\x3e<div class="language-js extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-js"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">\'vue\'</span>\n<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">\'vuex\'</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  state<span class="token operator">:</span> <span class="token punctuation">{</span>\n    users<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        name<span class="token operator">:</span> <span class="token string">\'A\'</span><span class="token punctuation">,</span>\n        age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        name<span class="token operator">:</span> <span class="token string">\'B\'</span><span class="token punctuation">,</span>\n        age<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        name<span class="token operator">:</span> <span class="token string">\'C\'</span><span class="token punctuation">,</span>\n        age<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span>\n\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> store\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>但当运行代码之后看到，第三个 el-radio 并没有像预期的那样处于选中状态。</p>\n<p><img src="./before.png" alt=""></p>\n<p>查看代码时发现，el-radio 里的 checked 是根据 <code>this.model === this.label</code> 来判断的（<a href="https://github.com/ElemeFE/element/blob/4680e55b96613004999f9fdeb8bb7b2419853ee8/packages/radio/src/radio.vue#L9">见代码</a>），而当 this.model 和 this.label 都是对象是，它们必须是引用同一个对象才会“恒等”。</p>\n<p>得益于 Vue 提供的 extends 属性，我们可以轻松的扩展官方原来的 el-radio 组件，对其稍加改造，就可以解决这个问题。</p>\n\x3c!--beforebegin--\x3e<div class="language-html extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span>\n    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>el-radio<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[\n      border &amp;&amp; radioSize ? \'el-radio--\' + radioSize : \'\',\n      { \'is-disabled\': isDisabled },\n      { \'is-focus\': focus },\n      { \'is-bordered\': border },\n      { \'is-checked\': isChecked }\n    ]<span class="token punctuation">"</span></span>\n    <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:aria-checked</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>isChecked<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:aria-disabled</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>isDisabled<span class="token punctuation">"</span></span>\n    <span class="token attr-name">:tabindex</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tabIndex<span class="token punctuation">"</span></span>\n    <span class="token attr-name">@keydown.space.stop.prevent</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>model = isDisabled ? model : label<span class="token punctuation">"</span></span>\n  <span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>el-radio__input<span class="token punctuation">"</span></span>\n          <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{\n        \'is-disabled\': isDisabled,\n        \'is-checked\': isChecked\n      }<span class="token punctuation">"</span></span>\n    <span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>el-radio__inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n        <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span>\n        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>el-radio__original<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>label<span class="token punctuation">"</span></span>\n        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span>\n        <span class="token attr-name">aria-hidden</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>\n        <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>model<span class="token punctuation">"</span></span>\n        <span class="token attr-name">@focus</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>focus = true<span class="token punctuation">"</span></span>\n        <span class="token attr-name">@blur</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>focus = false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>handleChange<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span>\n        <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>isDisabled<span class="token punctuation">"</span></span>\n        <span class="token attr-name">tabindex</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>-1<span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>el-radio__label<span class="token punctuation">"</span></span> <span class="token attr-name">@keydown.stop</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>!$slots.default<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{label}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> isEqual <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'lodash\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Radio <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'element-ui\'</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">\'MyRadio\'</span><span class="token punctuation">,</span>\n\n  <span class="token comment">// 使用 extemds 选项来扩展官方的 el-radio</span>\n  <span class="token keyword">extends</span><span class="token operator">:</span> Radio<span class="token punctuation">,</span>\n\n  computed<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// IMPORTANT: 改写部分，主要是支持 object 类型的值</span>\n    <span class="token function">isChecked</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token function">isEqual</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>model<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>label<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>改造完成后，引用这个组件并替换掉原来模板里用到的 el-radio，刷新页面后会发现，radio 的初始选中状态正常了。</p>\n<p><img src="./after.png" alt=""></p>\n<p>实际上，el-checkbox/el-checkbox-group 也有类似的问题，也是可以解决的，但看过源码之后，发现 el-checkbox 的一些逻辑与 el-radio 又有不小差别，毕竟它绑定的可能就是对象数组，所以具体处理起来会有些不一样，本文就不具体介绍了，如果各位有兴趣可以自行探索。</p>\n',attributes:{title:"ElementUI radio 小改造",date:"2019-08-10 16:22:20",top_img:"./top_img.jpg",tags:["ElementUI","el-radio"],categories:[""]}}}}]);