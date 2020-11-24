(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{258:function(n,e){n.exports={html:'<p>今晚……不对，是昨晚，折腾一个的小项目，发现自动填充的中文数据显示起来总不太美观，于是开始琢磨如何填充中文数据进行测试。</p>\n<p>然而一番搜索后惊奇的发现，官方、以及一些非官方的文档均未提及这一功能。期间看到一篇他人的“经验”文章，虽然可以实现这一需求，却要求修改 vendor 目录下 fzaninotto/Faker 包的源码，对于一个中了 Laravel 的“优雅之毒”的人来说，怎能容忍如此风骚的操作？</p>\n<p>一定有更好的办法……</p>\n<p>继续理清 Laravel 模型工厂原理之后，终于有所进展。发现其实只需要一个小小的修改就可以实现这一功能。</p>\n<ul>\n<li>根据官方示例的模型工厂代码</li>\n</ul>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token variable">$factory</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">define</span><span class="token punctuation">(</span>App\\<span class="token package">Product</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>Faker\\<span class="token package">Generator</span> <span class="token variable">$faker</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">[</span>\n        <span class="token single-quoted-string string">\'user_id\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'name\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">name</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'mobile\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">phoneNumber</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'province\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">state</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'city\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">city</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'area\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">area</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'address\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">streetAddress</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'postcode\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">postcode</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<ul>\n<li>调整后的代码</li>\n</ul>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token variable">$factory</span><span class="token operator">-</span><span class="token operator">></span><span class="token function">define</span><span class="token punctuation">(</span>App\\<span class="token package">Address</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token variable">$faker</span> <span class="token operator">=</span> Faker\\<span class="token package">Factory</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'zh_CN\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">[</span>\n        <span class="token single-quoted-string string">\'user_id\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'name\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">name</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'mobile\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">phoneNumber</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'province\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">state</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'city\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">city</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'area\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">area</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'address\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">streetAddress</span><span class="token punctuation">,</span>\n        <span class="token single-quoted-string string">\'postcode\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token variable">$faker</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">postcode</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>调整前，使用依赖注入的 <code>Faker\\Generator</code> 是使用的默认语言，即英文。</p>\n<p>调整后， <code>Faker\\Factory::create(\'zh_CN\')</code> 也会返回一个 <code>Faker\\Generator</code>， 但它是使用汉语初始化的。</p>\n<p><strong>事实上 Faker 本地化对于中文的支持仍有部分待完善，使用暂时不支持生成随机中文句子或者段落（相应的方法返回的仍然会是英文的），但我相信不久之后会有大牛实现这一些功能。</strong></p>\n<p>最后，上图，实际生成数据效果如下：\n<img src="./result.png" alt="file"></p>\n<blockquote>\n<p>请别纠结省市区从属关系，数据仅供测试而已 😄</p>\n</blockquote>\n<p><strong>评论中大牛提醒后发现， Laravel5.4 及更新版本其实已经考虑了这一问题，并设置了相关的配置项 <code>app.faker_locale</code>，只不过在文档和默认的配置文件中看不到这一参数。相关源码在 <code>Illuminate\\Database\\DatabaseServiceProvider</code> 类中，可以查看源码来判断是否支持这一配置项。对于支持的版本，只需要在 <code>config\\app.php</code> 文件中加入 <code>faker_locale =&gt; \'zh_CN\'</code> 就可以实现了</strong></p>\n',attributes:{title:"使用 Laravel 数据填充功能生成中文测试数据",date:"2019-03-10T16:38:18.000Z",top_img:"./top_img.jpg",tags:["laravel","数据填充"],categories:["php","Laravel"]}}}}]);