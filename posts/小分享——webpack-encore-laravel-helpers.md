---
title: 小分享——webpack-encore-laravel-helpers
date: 2019-09-03 10:52:58
top_img: ./webpack-encore-laravel.jpg
tags:
  - webpack-encore
  - laravel
categories:
  - 前端
---

在我之前一篇博客[《在 Laravel 项目中使用 webpack-encore》](https://tianyong90.com/posts/zai-laravel-xiang-mu-zhong-shi-yong-webpack-encore)中提到，为了方便在 laravel blade 模板中引入 webpack-encore 构建的前端资源，我们需要为项目新增两个 helper 函数，这两个函数参考 Symfony 中同名函数改写而来。

经过这段时间实际使用，我改写的这两个函数被证明基本满足日常使用，也没有出现 BUG。于是我着手在更多新的项目中使用它们（也试着改造了老的项目，将 laravel-mix 换成了 webpack-encore），但是作为一个很懒的程序员，这样为每个项目都复制这两个 helpers，是我无法忍受的，于是花了点儿时间将他们做成了一个独立的 composer 包并发布上线了。

[github 仓库地址](https://github.com/tianyong90/webpack-encore-laravel-helpers)

如此一来，只需要使用 composer 安装好这个包，就可以在 Laravel 项目中使用 `encore_entry_link_tags` 和 `encore_entry_script_tags` 两个函数方便地引入前端资源了。后期我会继续完善它们，使其更灵活可靠。同时也欢迎有兴趣的 phper 提交 PR，改进它们。
