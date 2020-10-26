(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{258:function(n,t){n.exports={html:'<p>在设计 API 时，出于安全性等因素考虑，有时需要放弃使用自增 ID，使 ID 非连续且不可猜测。通常可以使用 Hash id，UUID,雪花 ID 等来实现。</p>\n<p>在最近的一个项目中，我尝试使用雪花 ID。一通折腾下来发现，逼格挺高，实现也挺简单。然而当我继续撸起袖子与前端部分对接时，却出现了 JS 精度丢失问题，因为存储的 ID 是一个 unsigned bigint 型的值。（至于为什么会有精度丢失现象，这里就不具体解释了，不清楚的可以自行搜索），本文主要介绍解决办法。</p>\n<p>想要解决这问题，基本原理也很简单，就是把 ID 转成字符串再返回给前端。</p>\n<h2 id="错误尝试"><a class="header-anchor" href="#错误尝试">#</a> 错误尝试</h2>\n<p>一开始我想到的是使用 Laravel Eloquent 模型的模型访问器。只要给需要转换的模型加一个 getIdAttribute，将 ID 转成字符串不就行了嘛？</p>\n<p>如：App\\Models\\User 模型里这样写：</p>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token comment">/**\n * @return string\n */</span>\n<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">getIdAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">strval</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">attributes</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'id\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>但事实并非如此，属性访问器确实能让 API 返回给前端的 ID 变为字符串。但同时也会影响关联模型插入、修改时的结果，例如，user 关联的了 post 模型，使用 $user-&gt;posts()-&gt;saveMany(...); 这种方式保存的新的 posts 记录，对应的 user_id 会为空。</p>\n<p>这也不难理解，因为模型访问器是要参与模型相关处理的，访问器将 ID 由数字转为了字符串，自然会导致数据错乱。</p>\n<h2 id="正确姿势"><a class="header-anchor" href="#正确姿势">#</a> 正确姿势</h2>\n<p>冷静下来决定先认真思考再动手，查阅了官方文档，才发现 Resource 正是我想要的。Resource 只会影响返回给前端的数据，我们可以通过自定义 Resource 来实现 API 返回结果的结构、类型转换等功能。转换个 ID 自然也不在话下。</p>\n<p>为了省事，我直接修改 App\\Http\\Resource 这个基类。只需要重载它的 toArray() 方法，在其中使用递归，对可能超出 JS 安全数值范围的值进行转换就可以了。大家也可以根据自己的实际情况，新建 Resource 类，如 UserResource 来处理。</p>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Resources</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Resources<span class="token punctuation">\\</span>Json<span class="token punctuation">\\</span>JsonResource</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Resource</span> <span class="token keyword">extends</span> <span class="token class-name">JsonResource</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * Transform the resource into an array.\n     *\n     * @param \\Illuminate\\Http\\Request $request\n     *\n     * @return array\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token variable">$parentReturn</span> <span class="token operator">=</span> <span class="token keyword">parent</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token function">array_keys</span><span class="token punctuation">(</span><span class="token variable">$parentReturn</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token variable">$key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 为方便演示这里把所有整型字段都转成字符串</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is_int</span><span class="token punctuation">(</span><span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">strval</span><span class="token punctuation">(</span><span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token comment">// 关联的字段，如 $user->post，相当于递归处理</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is_array</span><span class="token punctuation">(</span><span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Resource</span><span class="token punctuation">(</span><span class="token variable">$parentReturn</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">return</span> <span class="token variable">$parentReturn</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>然后，在接口控制器中返回 Resource 返回数据，整型字段值就会自动变为字符串了。</p>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Controllers</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Resources<span class="token punctuation">\\</span>Resource</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\\</span>Models<span class="token punctuation">\\</span>User</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Request</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * @return \\App\\Http\\Resources\\Resource\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">__invoke</span><span class="token punctuation">(</span>Request <span class="token variable">$request</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token variable">$user</span> <span class="token operator">=</span> User<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Resource</span><span class="token punctuation">(</span><span class="token variable">$user</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>结果如下图：</p>\n<p><img src="./result.png" alt=""></p>\n<h2 id="注意事项"><a class="header-anchor" href="#注意事项">#</a> 注意事项</h2>\n<ul>\n<li>\n<p>因为这种办法使用了遍历，而且有递归处理，当数据结构复杂、数据量较大时可能会对性能造成一定影响。我这里算是比较偷懒取巧的写法，如果对性能有追求，自定义 Resource 类，然后根据特定的已知的字段名来进行转换会比较好</p>\n</li>\n<li>\n<p>因为返回给前端的 ID 转为了字符串，前端在进行比较判断，特别是 === 判断时要特别注意</p>\n</li>\n</ul>\n',attributes:{title:"Laravel 自动转换长整型雪花 ID 为字符串",date:"2020-10-Mo 16:05:59",top_img:"./top_img.png",tags:["Laravel","雪花 ID"],categories:["Laravel"]}}}}]);