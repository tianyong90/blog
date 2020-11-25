---
title: ElementUI radio 小改造
date: '2019-08-10 16:22:20'
top_img: ./top_img.jpg
tags:
  - ElementUI
  - el-radio
categories:
  - ''
---

ElementUI 是自己比较钟爱的一套 vue 组件库，自己好几个项目里都在用它。一直以来这些丰富的组件，让我能快速的搞定各种后台管理页面，极大地提高了工作效率。

但是不管什么软件，肯定都没办法称之为完美，而最近的几个小需求中，也发现了 element ui 的一些不足（也可能是因为自己的需求比较奇葩吧）。其中一点就是本文要提到的，radio 绑定对象类型值的问题。

具体现象就是，当通过 mapState 方法自动一个计算对象数组，然后将它绑定到 el-radio 上时，el-radio-group 里的 el-radio 无法根据其绑定值正确的显示 checked 状态。

例如下面这段代码：

```html
<template>
  <div id="app">
    <el-radio-group
      v-model="checkedUser"
    >
      <el-radio
        v-for="(user, index) in users"
        :key="index"
        :label="user"
        :value="user"
      >
        {{ `${user.name}(${user.age}岁)` }}
      </el-radio >
    </el-radio-group>

    <h2>当前选中</h2>
    <pre>{{ checkedUser }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',

  data () {
    return {
      checkedUser: {
        name: 'C',
        age: 1,
      },
    }
  },

  computed: {
    ...mapState({
      users: state => state.users
    })
  },
}
</script>
```

其中 users 为 vuex store 中的 state。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [
      {
        name: 'A',
        age: 18,
      },
      {
        name: 'B',
        age: 20,
      },
      {
        name: 'C',
        age: 1,
      },
    ]

  },
})

export default store
```

但当运行代码之后看到，第三个 el-radio 并没有像预期的那样处于选中状态。

![](./before.png)

查看代码时发现，el-radio 里的 checked 是根据 `this.model === this.label` 来判断的（[见代码](https://github.com/ElemeFE/element/blob/4680e55b96613004999f9fdeb8bb7b2419853ee8/packages/radio/src/radio.vue#L9)），而当 this.model 和 this.label 都是对象是，它们必须是引用同一个对象才会“恒等”。

得益于 Vue 提供的 extends 属性，我们可以轻松的扩展官方原来的 el-radio 组件，对其稍加改造，就可以解决这个问题。

```html
<template>
  <label
    class="el-radio"
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="el-radio__input"
          :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked
      }"
    >
      <span class="el-radio__inner"></span>
      <input
        ref="radio"
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="el-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import { isEqual } from 'lodash'
import { Radio } from 'element-ui'

export default {
  name: 'MyRadio',

  // 使用 extemds 选项来扩展官方的 el-radio
  extends: Radio,

  computed: {
    // IMPORTANT: 改写部分，主要是支持 object 类型的值
    isChecked () {
      return isEqual(this.model, this.label)
    },
  },
}
</script>
```

改造完成后，引用这个组件并替换掉原来模板里用到的 el-radio，刷新页面后会发现，radio 的初始选中状态正常了。

![](./after.png)

实际上，el-checkbox/el-checkbox-group 也有类似的问题，也是可以解决的，但看过源码之后，发现 el-checkbox 的一些逻辑与 el-radio 又有不小差别，毕竟它绑定的可能就是对象数组，所以具体处理起来会有些不一样，本文就不具体介绍了，如果各位有兴趣可以自行探索。
