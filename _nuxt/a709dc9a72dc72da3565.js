(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{232:function(n,t){n.exports={html:'<p>看过我之前写过的博客的应该知道我一直是 laravel-mix 的死忠粉，有好几篇文章都是关于它的。每每提到 laravel-mix 时更是不吝溢美之词。然而就在大概一个月前，我却决定不再使用它，而转投 webpack-encore 阵营。</p>\n<p>至于为什么放弃 laravel-mix，主要是因为它的维护状况堪忧，不仅更新节奏缓慢，许多 Issue 久悬未决，更重要的是，作者似乎将很多 bug 完全寄希望于 webpack5，哪怕有热心人士 PR 了，也通常被关掉，然后回复说“兄 dei，这个坑等 webpack5 出来就好了，我之前试过没弄好，估计你这也填好坑，干脆安分点儿等 webpack5 吧”（不是原话，但差不多是这意思 😄）。但最终让我下定决心寻求替代方案的，则是这个 <a href="https://github.com/JeffreyWay/laravel-mix/issues/1914">Issue</a>，细翻源码，发现相关功能依赖的还是 extract-text-webpack-plugin，而这个包，早在 webpack4 发布不久就被宣布废弃了（现在去看它的官方仓库已经被设置为 archived），而作者似乎完全没有使用 mini-css-extract-plugin 的意思。</p>\n<p>正所谓爱之深，责之切，在对 laravel-mix 表示失望之后，我翻出了自己 star 多时的另一包 webpack-encore，虽说很早就 star 了，但之前却没试用过它，可能也是因为对于 laravel-mix 的偏爱，然而这次，不试便罢，试完之后大有相见恨晚之意。</p>\n<p><a href="https://symfony.com/doc/current/frontend/encore/simple-example.html">webpack-encore</a> 是 Symfony 官方的前端集成构建工具，同样是基于 webpack，但它的 API 设计得更为友好，而且文档更完善，当然更关键的一点是，坑更少啊……从开始读它的文档，倒把手里一个项目从 laravel-mix 迁移到 webpack-encore，只用了几个小时，并且期间相当顺利。而我迁移的这个项目，是一个 Laravel 项目，所以下面就分享下，如果在 Laravel 项目中使用 webpack-encore 替代 laravel-mix。</p>\n<h2 id="安装依赖"><a class="header-anchor" href="#安装依赖">#</a> 安装依赖</h2>\n<p>首先当然是安装依赖</p>\n\x3c!--beforebegin--\x3e<div class="language-bash extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D @symfony/webpack-encore\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<p>需要注意的是，webpack-encore 没有像 laravel-mix 那样在自己内部依赖 vue-tempplate-compiler 之类的包，所以如果自己项目里用动了这些，需要自己在项目里手动安装好。</p>\n<h2 id="配置-webpack"><a class="header-anchor" href="#配置-webpack">#</a> 配置 webpack</h2>\n<p>在项目根目录下新建一个 webpack.config.js 文件并在其中配置 webpack-encore 功能（实际上它最终也是一个标准的 webpack 配置文件），以最基本的玩法为例。</p>\n\x3c!--beforebegin--\x3e<div class="language-js extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-js"><code><span class="token keyword">const</span> Encore <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'@symfony/webpack-encore\'</span><span class="token punctuation">)</span>\n\nEncore\n<span class="token comment">// directory where compiled assets will be stored</span>\n  <span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span><span class="token string">\'public/js/\'</span><span class="token punctuation">)</span>\n  <span class="token comment">// public path used by the web server to access the output path</span>\n  <span class="token punctuation">.</span><span class="token function">setPublicPath</span><span class="token punctuation">(</span><span class="token string">\'/js\'</span><span class="token punctuation">)</span>\n  <span class="token comment">// only needed for CDN\'s or sub-directory deploy</span>\n  <span class="token comment">//.setManifestKeyPrefix(\'build/\')</span>\n\n  <span class="token comment">/*\n   * ENTRY CONFIG\n   *\n   * Add 1 entry for each "page" of your app\n   * (including one that\'s included on every page - e.g. "app")\n   *\n   * Each entry will result in one JavaScript file (e.g. app.js)\n   * and one CSS file (e.g. app.css) if you JavaScript imports CSS.\n   */</span><span class="token punctuation">.</span><span class="token function">addEntry</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">,</span> <span class="token string">\'./resources/js/app.js\'</span><span class="token punctuation">)</span>\n\n<span class="token comment">// will require an extra script tag for runtime.js</span>\n<span class="token comment">// but, you probably want this, unless you\'re building a single-page app</span>\n  <span class="token punctuation">.</span><span class="token function">enableSingleRuntimeChunk</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n  <span class="token punctuation">.</span><span class="token function">cleanupOutputBeforeBuild</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableSourceMaps</span><span class="token punctuation">(</span><span class="token operator">!</span>Encore<span class="token punctuation">.</span><span class="token function">isProduction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token comment">// enables hashed filenames (e.g. app.abc123.css)</span>\n  <span class="token punctuation">.</span><span class="token function">enableVersioning</span><span class="token punctuation">(</span>Encore<span class="token punctuation">.</span><span class="token function">isProduction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n  <span class="token punctuation">.</span><span class="token function">enableVueLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">enableSassLoader</span><span class="token punctuation">(</span><span class="token parameter">options</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    options<span class="token punctuation">.</span>implementation <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'sass\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// fetch the config, then modify it!</span>\n<span class="token keyword">const</span> config <span class="token operator">=</span> Encore<span class="token punctuation">.</span><span class="token function">getWebpackConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token comment">// export the final config</span>\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> config\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<h2 id="新增-php-helper-函数"><a class="header-anchor" href="#新增-php-helper-函数">#</a> 新增 php helper 函数</h2>\n<p>Laravel 自带了一个 mix() 函数用于引用 mix 编译的资源，与之类似，syfony 也有这样的函数，而且更为方便。为此你需要在 Laravel 项目中自行实现这两方法，下面是我参考 symfony 里相关源码改写的，可能逻辑上并不算完善，但以自己一个多月的使用情况来看，它们表现良好。</p>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>HtmlString</span><span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * @param  string  $entryName\n * @return HtmlString\n */</span>\n<span class="token keyword">function</span> <span class="token function">encore_entry_link_tags</span><span class="token punctuation">(</span>string <span class="token variable">$entryName</span><span class="token punctuation">)</span><span class="token punctuation">:</span> HtmlString\n<span class="token punctuation">{</span>\n    <span class="token variable">$entryPointsFile</span> <span class="token operator">=</span> <span class="token function">public_path</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'js/entrypoints.json\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token variable">$jsonResult</span> <span class="token operator">=</span> <span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token variable">$entryPointsFile</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean constant">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">array_key_exists</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'css\'</span><span class="token punctuation">,</span> <span class="token variable">$jsonResult</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'entrypoints\'</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token variable">$entryName</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token constant">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token variable">$tags</span> <span class="token operator">=</span> <span class="token function">array_map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token single-quoted-string string">\'&lt;link rel="stylesheet" href="\'</span><span class="token punctuation">.</span><span class="token variable">$item</span><span class="token punctuation">.</span><span class="token single-quoted-string string">\'"/>\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token variable">$jsonResult</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'entrypoints\'</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token variable">$entryName</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'css\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HtmlString</span><span class="token punctuation">(</span><span class="token function">implode</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'\'</span><span class="token punctuation">,</span> <span class="token variable">$tags</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/**\n * @param  string  $entryName\n * @return HtmlString\n */</span>\n<span class="token keyword">function</span> <span class="token function">encore_entry_script_tags</span><span class="token punctuation">(</span>string <span class="token variable">$entryName</span><span class="token punctuation">)</span><span class="token punctuation">:</span> HtmlString\n<span class="token punctuation">{</span>\n    <span class="token variable">$entryPointsFile</span> <span class="token operator">=</span> <span class="token function">public_path</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'js/entrypoints.json\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token variable">$jsonResult</span> <span class="token operator">=</span> <span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token variable">$entryPointsFile</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean constant">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">array_key_exists</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'js\'</span><span class="token punctuation">,</span> <span class="token variable">$jsonResult</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'entrypoints\'</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token variable">$entryName</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token constant">null</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token variable">$tags</span> <span class="token operator">=</span> <span class="token function">array_map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token single-quoted-string string">\'&lt;script src="\'</span><span class="token punctuation">.</span><span class="token variable">$item</span><span class="token punctuation">.</span><span class="token single-quoted-string string">\'">&lt;/script>\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token variable">$jsonResult</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'entrypoints\'</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token variable">$entryName</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token single-quoted-string string">\'js\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HtmlString</span><span class="token punctuation">(</span><span class="token function">implode</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'\'</span><span class="token punctuation">,</span> <span class="token variable">$tags</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<h2 id="使用-encore-entry-link-tags-和-encore-entry-script-tags-引用编译的前端资源"><a class="header-anchor" href="#使用-encore-entry-link-tags-和-encore-entry-script-tags-引用编译的前端资源">#</a> 使用 <code>encore_entry_link_tags</code> 和 <code>encore_entry_script_tags</code> 引用编译的前端资源</h2>\n<p>在模板里使用前面添加的 helper 函数引用资源，你会发现它比 Laravel 自带的 mix() 函数更方便，只需要一个函数，就可以自动引入 vendor.js 和 app.js 了。</p>\n\x3c!--beforebegin--\x3e<div class="language-php extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-php"><code><span class="token operator">&lt;</span><span class="token operator">!</span>doctype html<span class="token operator">></span>\n<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token double-quoted-string string">"{{ app()->getLocale() }}"</span><span class="token operator">></span>\n<span class="token operator">&lt;</span>head<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> Required meta tags <span class="token operator">--</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token double-quoted-string string">"utf-8"</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token double-quoted-string string">"viewport"</span> content<span class="token operator">=</span><span class="token double-quoted-string string">"width=device-width, initial-scale=1, shrink-to-fit=no"</span><span class="token operator">></span>\n\n    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token constant">CSRF</span> Token <span class="token operator">--</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token double-quoted-string string">"csrf-token"</span> content<span class="token operator">=</span><span class="token double-quoted-string string">"{{ csrf_token() }}"</span><span class="token operator">></span>\n\n    <span class="token operator">&lt;</span>title<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'app.name\'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>\n\n    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> app<span class="token punctuation">.</span>css <span class="token operator">--</span><span class="token operator">></span>\n    <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token function">encore_entry_link_tags</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'app\'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>\n<span class="token operator">&lt;</span>body<span class="token operator">></span>\n\n    <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token double-quoted-string string">"app"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n\n    <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token function">encore_entry_script_tags</span><span class="token punctuation">(</span><span class="token single-quoted-string string">\'app\'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<h2 id="修改-package-json-中的脚本（scripts）"><a class="header-anchor" href="#修改-package-json-中的脚本（scripts）">#</a> 修改 package.json 中的脚本（scripts）</h2>\n<p>因为 laravel 项目默认 package.json 中 develop 等相关的脚本都是使用 laravel-mix 的，为了方便日常开发，现在要对它们进行一些调整，改用 webpack-cocore。调整后大致如下，你也可以根据自己实际应用情况进行其它调整</p>\n\x3c!--beforebegin--\x3e<div class="language-json extra-class">\x3c!--afterbegin--\x3e<pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"npm run development"</span><span class="token punctuation">,</span>\n    <span class="token property">"development"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=development encore dev"</span><span class="token punctuation">,</span>\n    <span class="token property">"watch"</span><span class="token operator">:</span> <span class="token string">"npm run development -- --watch"</span><span class="token punctuation">,</span>\n    <span class="token property">"watch-poll"</span><span class="token operator">:</span> <span class="token string">"npm run watch -- --watch-poll"</span><span class="token punctuation">,</span>\n    <span class="token property">"hot"</span><span class="token operator">:</span> <span class="token string">"encore dev-server --port=9001 --hot"</span><span class="token punctuation">,</span>\n    <span class="token property">"prod"</span><span class="token operator">:</span> <span class="token string">"npm run production"</span><span class="token punctuation">,</span>\n    <span class="token property">"production"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=production encore production"</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre>\n\x3c!--beforeend--\x3e</div>\x3c!--afterend--\x3e<h2 id="运行脚本，愉快撸-bug"><a class="header-anchor" href="#运行脚本，愉快撸-bug">#</a> 运行脚本，愉快撸 BUG</h2>\n<p>做完前面的这些步骤之后，在终端执行 <code>yarn run hot</code>，浏览器中输入项目绑定的域名（如 app.test)，就可以体验方便高效的 HMR 开发了。</p>\n<h2 id="后记"><a class="header-anchor" href="#后记">#</a> 后记</h2>\n<p>使用 webpack-encore 已经快两个月了，这期间总体说来相当顺利，小坑虽然有，但没什么大坑。去 github 上提 issue，维护成员基本上都很友善耐心，几个小时就会有回复。这种态度也让我对它更加放心了，相信它会折腾得越来越好。虽然 webpack-encore 是作为 Symfony 默认集成工具来设计的，但这并不妨碍它在 Laravel 中发挥强大威力。</p>\n<p>相比于 laravel-mix，encore 的 API 以及一些默认配置方面考虑得更为科学和全面，想要配置 vue-loader 或者  ts-loader 之类的，只需要调用相应的方法。另外还有点让我先惊讶的是，他们竟然对 <code>watchOptions.ignored</code> 的默认值也考虑到了，默认忽略 /node_modules/，降低 CPU 占用。当然，更为重要的是，mix4 里因为一些 bug 而无法使用的功能，在 encore 里却正常，如 dynamic import。</p>\n<p>总之，如果你已经发现了 laravel-mix 的种种不足但又苦于没更好选择的话，不妨试试 webpack-encore，相信你会对它爱不释手。</p>\n',attributes:{title:"在 Laravel 项目中使用 webpack-encore",date:"2019-07-07T13:47:57.000Z",top_img:"./encore.png",tags:["webpack-encore","laravel-mix","laravel"],categories:["前端"]}}}}]);