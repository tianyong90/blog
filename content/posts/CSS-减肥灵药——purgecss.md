---
title: CSS 减肥灵药——purgecss
date: '2019-12-27 05:34:49'
top_img: ''
tags:
  - 'css'
  - 'purgecss'
categories:
  - '前端'
draft: true
---

## 缘起

第一次看到 purgecss 这一名字，是在 laravel-mix 的文档中，但当时并未心动。那时的我还只会精简优化打包的 JS 代码，并没有意识到 CSS 也有很大的瘦身空间。直到后来再一次在 tailwindcss 的文档里看到对 purgecss 的介绍。



## 基本配置

purgecss 通常与一些插件或者构建工具配合使用，例如与 postcss 配合，或者安装 webpack 相关的插件来使用。个人认为与 postcss 配合是最为简单快捷的用法。因此，下面的配置也以此种使用场景为例。



```js
module.exports = {

}
```



## 效果对比（tailwindcss)

tailwindcss 是对 purgecss 支持非常好的项目之一，它的官方文档是明确指出了可以利用 purgecss 大幅度精简构建后的体积。按照文档中的配置进行试验。在仅使用 margin padding 等几个常用类的情况下，purgecss 的瘦身效果相当明显。



## 白名单使用以及注意事项


## 关于开发第三组件或插件的建议

如果你正在开发可复用的组件库或者插件，不管是 Vue 还是 React，在组件样式时，一定要使用一个统一而且尽量与其它主流组件/插件库不同的前缀。虽然这表面上可能会使 CSS 类名变长，却能为在构建时使用 purgecss 带来方便。而且对于使用 scss 等 CSS 预处理语言时而言，添加这类统一前缀是十分方便实现的。至于直接手撸 CSS 的情况，也无非就是复制粘贴一把梭。



## 结语

