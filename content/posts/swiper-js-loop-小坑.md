---
title: swiper.js loop 小坑
date: '2020-02-08 02:15:49'
top_img: ./top_img.png
tags:
  - 'swiper.js'
  - 'vue'
categories:
  - '前端'
---

swiper.js 是一款强大的插件，也是我最喜欢的开源插件之一。它可以轻松实现轮播、tab 标签以及各种风骚的页面滑动效果。

我在自己的很多项目里都用到了 swiper，配合 vue 使用真的非常方便。不过近日遇到一个小坑，几番搜索和试验，才发现与 loop 特性有关。

具体现象是，当 swiper 开启 loop 属性实现循环轮播，同时用 vue 的事件绑定语法为每个轮播页绑定事件，当轮播到特定的页面时绑定的事件无法被正常监听。

例如下面的代码:

```html
<template>
  <div id="app">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="i in 2"
          :key="i"
        >Slide {{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'app',

  mounted () {
    const mySwiper = new Swiper('.swiper-container', {
      loop: true
    })

    console.log(mySwiper)
  },

  methods: {
    handleClick (i) {
      console.log(`click slide ${i}`)
    }
  }
}
</script>
```

这段代码实际上添加了两页轮番，loop = true 会实现循环轮播的效果。但实际使用过程中发现，Slide1 上绑定的 click 事件监听，除了初始时第一次显示时能正常捕获外，当连续向左滚动之后显示的 Slide1 页上点击就没效果了。同样，向右滑动时，Slide2 上绑定的事件监听器也可能出现问题。

![](./screenshot1.png)

打开调试控制台查看页面元素，发现除了实际添加的两页轮播对应的 slide 元素之外，左边多了一个复制的 Slide2 元素，而右边则多了一个复制的 Slide1。

![](./nodes.png)

原来 Swiper 是通过在实际轮播页前后复制若干个页面来实现 loop（首尾相连循环滚动）效果的，联想到前面提到的问题现象，马上猜测是因为虽然复制了轮播页元素但 vue 所绑定的事件处理器却没有被复制。于是进一步查看了这个元素上绑定的事件监听器，果然如此。

找到的问题原因，那也就有头绪了。Swiper.js 自己其实也提供了一套事件绑定机制，我们只需要把原代码里 vue 指定绑定的事件监听器通过 Swiper 初始选项中绑定就好了。调整后的代码如下。

```vue
<template>
  <div id="app">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="i in 2"
          :key="i"
          :data-index="i"
        >Slide {{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'app',

  mounted () {
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
      on: {
        click: (e) => {
          const index = e.target.dataset.index
          console.log(`click slide ${index}`)
        }
      }
    })

    console.log(mySwiper)
  }
}
</script>
```

再次试用点击事件，一切正常了。

![](./screenshot2.png)
