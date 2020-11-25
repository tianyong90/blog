---
title: github + wakatime => x-dashboard
date: 2019-09-11 07:55:43
top_img: ./top_img.jpg
tags:
  - laravel
  - react
categories:
  - ''
---

作为一个码农，每天工作中除了写代码，就是流连于各网站。而去得最多的地方就是 GitHub 和 wakatime。关注 github，可以让我了解一些大佬又造了什么新的骚轮子，眼下流行的项目是什么。而 wakatime 上的统计数据，则让我知道每天都写了多少 bug 摸了多长时间鱼。

但每天重复打开这些页面，总感觉比较繁琐，而且在不同页面间切换时不知不觉中也浪费了一些时间。后来无意间发现，原来 github 和 wakatime 官方都提供了一系列 API，顿时有了新想法——何不将这些网站里有用的信息整合到一起，这样既方便又省事。

于是马上行动了起来，一开始用 laravel + vue 写了一大半（因为这几年一直在使用 vue），但近段时间开始学习 react，本着实践出真知的原则用 react 重写了这个项目，同时也将 laravel 升级到了最新的 v6 版本。折腾到现在也算有了个雏形，独乐不如众乐，顺便将它分享出来。

直接放出项目地址：[x-dashboard](https://github.com/tianyong90/x-dashboard)

效果截图：

![github](./x-dashboard.test_github.png)
![wakatime](./x-dashboard.test_wakatime.png)

目前这项目已经实现了自己最初的基本想法，但后面可能也会加入新的功能。正如前面提到的，自己学 react 没多久，相比于已经使用了好几年的 vue 来说，熟练程度还差得远，因此也有许多不规范或者不科学的地方。非常希望 react 方面的大佬能指正，也欢迎有兴趣的一起折腾。
