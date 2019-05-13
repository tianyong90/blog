---
title: 让 F5 歇一会儿——laravel-mix 自动刷新之道
date: 2019-04-12 22:07:38
top_img: ./top_img.jpg
tags:
    - laravel-mix
    - 前端
    - laravel
categories:
    - 前端
    - webpack
---

转眼入行已五年有余，如今已经成长为一个**全干**程序员。回想起当初使用的一些工具以及工作流，感觉真是笨拙而粗暴，特别是对于浏览器刷新这事儿，只会猛击 F5，不禁感慨那饱经摧残的 F5 键真是坚挺异常，竟没有提前挂掉。

随着踩的坑越来越多，也日渐积累了不少经验，这其中就包括各种自动刷新的办法。因为近几年来大部分时假在与 Laravel 打交道，使用 laravel-mix 已成家常便饭，所以想着总结并分享一下 laravel-mix 工作流中的自动刷新之道。

laravel-mix 自称 `An elegant wrapper around Webpack for the 80% use case`，其功能确实强大，它对于前端开发工作流的考虑也是非常全面，可以通过 `Browsersync`、`Hot Module Replacement` 和 `LiveReload` 实现自动刷新。

> 在接下来的内容之前，需要说明一下我平时使用的环境。
> 系统为 windows10，前端资源编译调试都在宿主机（即 windows10）中完成，而 php, mysql 等由 laradock 容器提供。
> **我还为此创建了一个[演示项目](https://github.com/tianyong90/laravel-mix-autoreload-demo)，文中的几个录屏动画也来自该项目，有兴趣的可自行克隆查看源码。**

## Browsersync

[Browsersync](https://www.browsersync.io/) 是一款强大的前端调试工具，如它的名字一样，主要的功能就是“浏览器同步”，这里的同步不仅是当资源发生变化时同步刷新，它支持局域网中多终端设备同时调试，甚至能同步这些设备上的滚动、点击等操作。此外它还担任了一个易于使用的 UI 界面（页面）以及一些插件，具体信息可前往官网查看。

![Browsersync 同步滚动（图片来源于网络）](./bs-scroll-demo.gif)

1. 安装依赖

    ```bash
    yarn add -D browser-sync browser-sync-webpack-plugin
    ```

1. 在 `webpack.mix.js` 文件中调用 `mix.browserSync()`启动 Browsersync

    ```js
    /**
     *下面方法启用 bs，不传参则使用 laravel-mix 的默认配置
    * 根据实际使用环境配置参数以获得更好体验
    * bs 配置选项参考 https://www.browsersync.io/docs/options
    */
    mix.browserSync({
    proxy: 'laravel-mix-autoreload-demo.test/',
    startPath: '/demo-bs',
    open: true,
    reloadOnRestart: true,
    watchOptions: {
        usePolling: true,
    },
    })
    ```

1. 运行 `yarn run watch-poll`

    如果 Browsersync 的 `open` 选项设置的为 `true`，在首次编译完成之后浏览器会自动打开一个页面，否则需要手动打开，默认的是 http://localhost:3000，具体依所设置的 Browsersync 参数而定。

1. 修改相关文件关保存，webpack 将会自动编译修改的文件，完成之后页面将自动刷新。（如果修改的是后端文件，则直接刷新）

![Browsersync 效果演示](./gif-bs.gif)

## Hot Module Replacement(hmr)

相信熟悉 webpack 的前端 er 都知道 [hmr](https://webpack.js.org/concepts/hot-module-replacement/) 是什么。有别于一般的刷新（即整页相关资源重新加载），它可以只对发生变化的部分模块进行热替换，而其它部分保持不变。这使得它不仅反应及时，通常也能保持当前应用状态不会被刷新，这对于调试 SPA 项目十分方便。当然,并不是所有修改它都能进行热替换，有时也会整页刷新。

要在 laravel-mix 中使用 hmr，不需要安装其它额外的依赖包。

1. 在 `webpack.mix.js` 中根据实际场景配置 hmr 参数

    ```js
    // 配置 hmr 参数
    mix.options({
    hmrOptions: {
        host: 'laravel-mix-autoreload-demo.test',
        port: 8080,
    }
    })
    ```

1. 执行 `yarn run hot`

    首次编辑完成之后，打开对应的页面，例如本文提到的示例项目打开 `http://laravel-mix-autoreload-demo.test/demo-hmr`

1. 修改前端资源文件，愉快撸码

![Hot Module Replacement 效果演示](./gif-hmr.gif)

## LiveReload

LiveReload 算是一个比较老（维护更新也不勤）的工具了，关于它的详细介绍请访问[官网](http://livereload.com)。

1. 安装依赖

    ```bash
    // laravel-mix v4
    yarn add -D webpack-livereload-plugin

    // laravel-mix v3 或更早
    yarn add -D webpack-livereload-plugin@1
    ```

1. 在模板的 body 最后加上额外引用的 js

    ```php
    @if(config('app.env') == 'local')
        <script src="http://localhost:35729/livereload.js"></script>
    @endif
    ```

    > 也可以选择安装[浏览器插件](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)替代

1. 执行 `yarn run watch-poll`

    执行该命令以监听文件变化并让 webpack 自动重新编译。

1. 打开页面，修改页面引用的前端资源（如 js,css）并保存，页面将自动刷新

    因为使用 laravel-mix 编译，一般修改 resource/ 目录下的文件，但实际上直接修改 public/ 目录中的文件也是可以触发刷新的。

![LiveReload 效果演示](./gif-livereload.gif)

## 三者对比

| | Browsersync  | Hot Module Replacement  | LiveReload  |
|---|---|---|---|
|  刷新方式 |  修改 css 文件时为部分替换，其它整页刷新 | 模块热替换或整页刷新  | 整页刷新  |
|  监听范围 |  在配置项 files 规则所包含的前后端文件 | 前端模块（即 webpack 加载的模块）  | 浏览器当前页面所加载的前端文件  |
|  速度 | 修改 css 时较快，其它文件时一般 | 快，特别是热替换时  | 一般  |
|  可靠性 | 可靠 | 存在 Bug，但有特殊处理办法  | 可靠  |
|  使用复杂度 | 简单，仅需安装依赖并调用 mix.browserSync() 方法 | 较复杂，可能需要针对目前存在的 Bug 作特殊处理  | 较复杂，需要安装依赖，并在入口模板中手动添加额外 js 引用（或使用浏览器插件）  |
|  主要优势 | 功能强大，配置灵活，可同时响应前后端文件变化，适合绝大部分场景 | 热替换几乎实现实时预览且不响应应用状态，适合 SPA 项目  | 相对于其它两个似乎没特别优势（至少目前本人未发现 :smile:）  |

## 个人日常使用习惯

因为 Browsersync 的可靠性与广泛适用性，它通常是我开发时使用的主力工具（甚至我为 hexo 与安装的 Browsersync 插件）。

而 hmr 我通常只在调试 SPA 项目时使用，因为它响应速度快，而且通常不会影响应用状态，十分方便。但同时需要注意的是 laravel-mix 环境下使用 hmr 也存在一些问题（当前最新版本 4.0.15 中仍存在），例如与 `mix.extract()`没法同时使用([见 Issue](https://github.com/laravel-enso/Enso/issues/194)) 以及在 windows 环境中存在的路径分隔符问题[见 Issue](https://github.com/JeffreyWay/laravel-mix/pull/1995)，好在这几个 Issue 里也给出了这些问题的解决办法，虽然不甚优雅，但至少行得通。（**在前面提到的示例项目里有相关的代码及注释，可自行查阅**）

至于 LiveReload，我完全不会在日常开发中使用。因为相较于其它两个，它几乎没有什么优势可言，而且维护情况也堪忧。

## 总结

前端开发花样百出，各种技术、框架以及工具层出不穷。作为一个程序员，当然不得不学习这些，毕竟生命在于折腾，而前端开发尤其如此。庆幸的是有些折腾也是值得的，它能解救我们（或者解救我们的 F5 键 :smile:），例如当你掌握了各种各样的自动刷新方法（包括但不限于本文提及的），你会发现自己临幸 F5 键的频率会越来越低，不知不觉省下来不少时间，可以用来睡觉、逛街、吃鸡或者有娃的带娃……
