---
title: Homestead + laravel-mix 环境下 hmr 的两种玩法
date: 2019-04-18 01:33:24
top_img: ./top_img.png
tags:
    - laravel-mix
    - homestead
    - hmr
categories:
    - 前端
    - webpack
---

我在前几天刚写过的[《让 F5 歇一会儿——laravel-mix 自动刷新之道》](https://tianyong90.com/2019/04/12/rang-f5-xie-yi-hui-er-laravel-mix-zi-dong-shua-xin-zhi-dao/)中介绍了 laravel-mix 实现自动刷新的几种方法，其中就有涉及 hmr（Hot Module Replacement），但里面都是以 Laradock 环境为例。对于 Laravel 官方首推的 Homestead 当然也是可以的，只不过用法上有些差别，于加上 laravel-mix 本身的一些 BUG（在 issue 里搜索 `hmr` 结果就有好几页 :smile:），对于刚接触的人来说可能无从下手。

本文介绍两种不同的玩法。

> 首先假定你已经创建了一个 laravel 项目，进行了相关配置（.env 配置及绑定测试域名，如：laravel.test）并已装好了后端依赖

## 玩法一：使用虚拟机中的 Node 环境

因为 Homestead 提供的环境里默认包含了前端开发所需要的 Node 环境及相关工具（gulp, npm, yarn 等），所以直接使用它们似乎是很省事的选择。

![玩法一示意图](./方法1.png)

1. `vagrant ssh` 连接虚拟机，进入项目目录后安装前端依赖

    ```bash
    yarn install
    ```

1. 在 webpack.mix.js 中调整相关配置

    - 使用 mix.Webpack() 配置 devServer

        ```js
        mix.webpackConfig({
            devServer: {
                watchOptions: {
                    poll: 2000, // 这个值可调整，性能高的时候可以调小，也可以直接设置为 true
                    ignored: /node_modules/,
                },
            },
        })
        ```

    > 这一配置很关键，因为要是仅使用 devServer 的默认 watch 选项，对于虚拟机环境是无效的（[见 webpack 文档](https://webpack.js.org/configuration/watch/#watchoptionspoll)）

    - 调整 hmrOptions

        ```js
        mix.options({
            hmrOptions: {
                host: 'laravel.test',
                port: 8080
            }
        })
        ```

1. 在**虚拟机**终端中执行`yarn run hot`，然后在浏览器中使用绑定的测试域名（如：laravel.test）访问

1. 修改 JS 等，自动编译后浏览器中页面即自动更新

## 玩法二：使用宿主机中的 Node 环境

当然也可以使用宿主机的 Node 环境，对于开发都来说，这些环境应该也是必须的了。

![玩法二示意图](./方法2.png)

1. 从宿主机终端进入项目目录并安装前端依赖

    ```bash
    yarn install
    ```

1. webpack.mix.js 中使用 webpackConfig 进行配置

    ```js
    mix.webpackConfig({
        devServer: {
            disableHostCheck: true,
        },
        // 其它配置
    })
    ```

    > disableHostCheck: true 是为了避免出现下面这种错误。

    ![错误截图](./error.png)

    > 与玩法一中不一样，不再需要特别在 hmrOptions 中指定 devServer 和 host 和 port，使用默认的就好（事实上也**不能**像前面那样指定，因为会出现 IP/端口 冲突）

1. 在宿主机终端中执行`yarn run hot`，然后在浏览器中使用绑定的测试域名（如：laravel.test）访问

1. 修改 JS 等，自动编译后浏览器中页面即自动更新

**laravel-mix 4.0.16 中修复了在 windows 中使用 hmr 的 BUG，开发体验相较以前更好。https://github.com/JeffreyWay/laravel-mix/pull/1995**

## 总结

两种方法并没有谁好谁坏之分，具体使用哪种方法视具体场景及个人喜好而定。就我个人而言，通常使用第二种，主要原因有二：

- 一是出于性能/延迟方面的考虑，因为在虚拟机中使用轮询（poll）的方式来监听文件变化，当 poll 设置间隔较大时可能会出现一定延迟，而设置太小轮询太频繁则又可能造成一定的性能压力。所以直接使用宿主机的 Node 环境似乎更为划算。

- 二是自己使用的 IDE（PhpStorm）运行在宿主机（Windows）中，而 PhpStorm 的一些插件（或服务）如 Eslint、TypeScript、 Prettier 需要使用使用本地安装的一些 npm 包，这样就只能在宿主环境里安装依赖。（虽然可以考虑在宿主机全局安装依赖，但诸如 eslint-config-xxx 之类的项目相关的包也全局安装，必然造成混乱）

如同学习很多其它新工具新玩法一样，刚开始折腾 laravel-mix 时总是磕磕绊绊(有不少坑），但一旦掌握了窍门，就能极大的方便日常开发，提高工作效率。博客里记下这些，权当备忘，也算是分享，独乐不如众乐。
