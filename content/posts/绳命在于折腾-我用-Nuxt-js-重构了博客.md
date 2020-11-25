---
title: 绳命在于折腾，我用 Nuxt.js 重构了博客
date: 2019-05-26 03:11:46
top_img: ./top_img.png
tags:
  - 博客
  - Nuxt.js
categories:
  - Vue
---

[博客地址: https://tianyong90.com](https://tianyong90.com/)

[github 仓库地址:https://github.com/tianyong90/blog](https://github.com/tianyong90/blog)

其实自己的博客上线没多久，之前闲时会写些乱七八糟的玩意儿，一来当作总结和备忘，二来分享一些个人经验，也是种很有趣的经历。然后几个月前，想着自己手里有个注册但闲置很久的域名，又正好有台服务器，就干脆折腾个博客。

不就是个博客嘛？能有多难？也没多想就用了之前使用过的 Hexo 撸了起来，只花了一晚上就弄上线了。不过上线一时爽，维护火葬场。之后花上它上面的时间要远多于此，因为 hexo 如果想要充分的自定义模板或者功能，还是很麻烦的，特别是因为模板用的 pug 以及写样式用的 stylus 都是自己不擅长且不太喜欢的语言。几番折腾下来总不得劲，终于心一横，不如重构吧。

重构时要比当初选择 hexo 时要谨慎多了，对比了下自己了解的一些工具，最终选择了 Nuxt.js。

## 为什么是 Nuxt.js？

最主要的原因就是自己用 Vue 很久了，学 Nuxt 的成本也就小得多。Nuxt 可以让我用最熟悉的姿势来写代码，同时又能解决博客在静态化、SEO 等方面的一些要求，它的布局、自动路由、插件、中间件等特性让我大有相见恨晚的感觉。

其实在作决定之前也试过 Vuepress，但 Vuepress 的出发点是文档类的站，并不太适合写博客。虽然 1.0 版中加入了博客的支持，但目前仍在 alpha 阶段，体验不太好，更新进度又不理想，等到正式稳定可用的版本出来，估计黄花菜也凉了。

此外也考虑过用 hugo，甚至想过用 Laravel 来弄。但 hugo 基于 Go，自己完全不懂，而用 Laravel 写博客似乎大材小用了，毕竟我只需要一个静态的小站，也不会给服务器增加多少压力。

## 具体实施

1. 创建 nuxt 项目并进行基础配置

  首先当然是创建项目，根据 Nuxt 文档使用 `yarn create nuxt-app` 命令创建一个新项目，根据需要配置好 eslint、typescript 等。

2. 确定目录结构（路由）、文章文件名命名规范

  因为之前用 hexo 部署的也是纯静态的站，只要之前所部署的旧文件不删除，那么使用原来的链接仍然能访问旧版的文章。所以也不用太纠结重构后路由的变化。当然这并不意味着不需要进行规划。

  为此，我新建了一个 posts 目录，用于保存 markdown 文件，文件夹内建与 markdown 文件同名的文件夹用来存文章中用到的图片等。

  ```
  -| posts/
  ----| hello-中国/
  ----| hello-中国.md
  ```
  > 这里要注意一下的是，文件名将一些特殊字符和空格替换成了连词符，而实际访问用的路由是将文件名拼音化。为什么不直接用拼音化文件名或者英文呢？主要是方便日后管理。

  然后在 `pages` 目录下创建 `psots/_slug.vue` 页面。这样文章就可以用 https://tianyong90.com/psots/hello-zhong-guo 这样形式来访问了。


3. 安装并配置 [@tianyong90/vue-markdown-loader](https://github.com/tianyong90/vue-markdown-loader)

  [@tianyong90/vue-markdown-loader](https://github.com/tianyong90/vue-markdown-loader) 是自己之前从 vuepress 中提取的 markdown-loader 部分代码改写出来的一个 webpack loader。它的主要功能是加载 markdown 文件，进行一些处理，如解析 emoji、代码高亮等，最后返回可以供 vue-loader 的内容。最近又进一步优化，让它可以返回 html 而被  html-loader 处理，或者直接返回一个包含 markdown 文件信息的对象。

  配置如下：

  ```js
  build: {
    extend(config, ctx) {
      // frontmatter-markdown-loader
      config.module!.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'posts'),
        use: [
          {
            loader: '@tianyong90/vue-markdown-loader',
            options: {
              mode: 'raw', // 这里表示 import md 文件后直接返回一个对象
              contentCssClass: 'markdown-body',
              markdown: {
                lineNumbers: true, // enable line numbers
              },
            },
          },
        ],
      })
    },
  }
  ```

4. 文章页的一些处理

  有了前面的这些，就可以开始动手处理文章页了，这也是博客的关键部分。而其中最为重要的工作就是根据 url 中拼音化的文章标题正确加载 posts 目录中的 markdown 链接半渲染显示，这些基本都在 asyncData 方法中完成。

  ```ts
  async asyncData({ params }) {
    // 这里的 posts.json 是用脚本生成的保存 posts 目录中文章列表信息的
    // 相当于一个小的数据库
    const { default: posts } = await import('~/posts/posts.json')

    // 链接中拼音化的文件名
    const slugifiedFilename = params.slug

    const thePost: any = posts.find((item: any) => {
      return item.slugifiedFilename === slugifiedFilename
    })

    // posts 目录中 markdown 实际文件名
    const filename = thePost.filename

    // 解析渲染都交给前面提到的 @tianyong90/vue-markdown-loader 完成
    // 这里的 html 就是渲染出来的 html,可以直接应用于 v-html 指令
    // attributes 则是 markdown 文件头部的 frontmatter 数据如标题、日期等
    const { html, attributes } = await import(`~/posts/${filename}.md`)

    return {
      ...attributes,
      html: html.replace(/src="\.\//g, `src="/_nuxt/posts/${filename}/`), // markdown 内容中图片地址引用替换
    }
  },
  ```

  然后在模板中显示这些数据，其中 html 使用 v-html 指令就可以了。

  ```html
  <div class="container-fluid py-4">
    <div class="row post-info-sm">
      <div class="col-12">
        <h1 class="post-title" v-text="title" />
        <div class="post-date">{{ date }}</div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-xl-6 mx-auto">
        <div class="markdown-body" v-html="html" />
      </div>
    </div>
  </div>
  ```

5. 布局、样式等细节

  博客并不只是文字内容，因此还需要在布局、样式等方面下些功夫。因为自己设计水平实在有限，所以直接使用了 bootstrap 和 github-markdown-css，撸完文章列表页以及文章内容页就够用了，其它的页面看需要再加吧。

6. 生成、部署以及自动化

  最后要生成静态页，而博客所使用的又是动态路由，就需要在 nuxt.config.js 中的 genarate 荐中进行配置。

  如下，根据当前 posts 目录下的 markdown 文件名来确定该生成哪些页面。

  ```js
  generate: {
    routes: ['404'].concat(posts.map(post => `/posts/${post.slugifiedFilename}`)),
  },
  ```

  执行 `yarn run generate` 后可以看到下面的结果，`dist` 目录里也出现了静态文件，剩下的就只是部署了。

  ![](./generate-result.png)

  对于部署，配置上 Circle CI，当推关新内容上 master 分支时由 CI 进行构建并部署到自己服务器简直不能更爽。

  此外，为了省事，还写了几个脚本来创建新的 markdown 文件和相应的文件夹，虽然这也不是必须的，但使用脚本显然要比手动创建要省事得多。

## 总结

Nuxt.js 确实是个好东西，写了近三年 Vue 了才开始盘它，确实是有点儿迟了。Nuxt 利用 SSR 等机制能很好地弥补 SPA 应用在 SEO 等方面的不足，其自带的生成静态站的功能也非常适合平时写一些博客之类的应用。

感谢 Hexo 陪伴多年（虽然期间也没用它写出什么东西来），但以后可能不会再用它了…… 😄
