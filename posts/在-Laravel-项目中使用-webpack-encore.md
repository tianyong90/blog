---
title: 在 Laravel 项目中使用 webpack-encore
date: '2019-07-07 13:47:57'
top_img: ''
tags:
  - 'webpack-encore'
categories:
  - '前端'
---

看过我之前写过的博客的应该知道我一直是 laravel-mix 的死忠粉，有好几篇文章都是关于它的。每每提到 laravel-mix 时更是不吝溢美之词。然而就在大概一个月前，我却决定不再使用它，而转投 webpack-encore 阵营。

至于为什么放弃 laravel-mix，主要是因为它的维护状况堪忧，不仅更新节奏缓慢，许多 Issue 久悬未决，更重要的是，作者似乎将很多 bug 完全寄希望于 webpack5，哪怕有热心人士 PR 了，也通常被关掉，然后回复说“兄 dei，这个坑等 webpack5 出来就好了，我之前试过没弄好，估计你这也填好坑，干脆安分点儿等 webpack5 吧”（不是原话，但差不多是这意思 :smile:）。但最终让我下定决心寻求替代方案的，则是这个 [Issue](https://github.com/JeffreyWay/laravel-mix/issues/1914)，细翻源码，发现相关功能依赖的还是 extract-text-webpack-plugin，而这个包，早在 webpack4 发布不久就被宣布废弃了（现在去看它的官方仓库已经被设置为 archived），而作者似乎完全没有使用 mini-css-extract-plugin 的意思。

正所谓爱之深，责之切，在对 laravel-mix 表示失望之后，我翻出了自己 star 多时的另一包 webpack-encore，虽说很早就 star 了，但之前却没试用过它，可能也是因为对于 laravel-mix 的偏爱，然而这次，不试便罢，试完之后大有相见恨晚之意。

[webpack-encore](https://symfony.com/doc/current/frontend/encore/simple-example.html) 是 Symfony 官方的前端集成构建工具，同样是基于 webpack，但它的 API 设计得更为友好，而且文档更完善，当然更关键的一点是，坑更少啊……从开始读它的文档，倒把手里一个项目从 laravel-mix 迁移到 webpack-encore，只用了几个小时，并且期间相当顺利。而我迁移的这个项目，是一个 Laravel 项目，所以下面就分享下，如果在 Laravel 项目中使用 webpack-encore 替代 laravel-mix。

## 安装依赖

首先当然是安装依赖

```bash
yarn add -D @symfony/webpack-encore
```

需要注意的是，webpack-encore 没有像 laravel-mix 那样在自己内部依赖 vue-tempplate-compiler 之类的包，所以如果自己项目里用动了这些，需要自己在项目是手动安装好。

## 配置 webpack

在项目根目录下新建一个 webpack.config.js 文件并在其中配置 webpack-encore 功能（实际上它最终也是一个标准的 webpack 配置文件），以最基本的玩法为例。

```js


```


## 新增 php helper 函数

## 修改 package.json 中的脚本（scripts）

## 运行脚本，愉快撸 BUG
