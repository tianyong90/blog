---
title: 如何用 Vue 写一个虚拟数字键盘
date: '2020-03-Su 23:14:35'
top_img: ./top_img.png
tags:
  - vue
  - 数字键盘
categories:
  - 前端
draft: true
---

数字键盘，应用场景非常广泛，尤其在手机端，很多时候我们需要输入手机号、输入短信验证码或者输入支付金额。通常情况下，只需要使用 number 类型的 input，同时辅以适当的表单验证逻辑即可。

但这种方法虽然简单，但不管对于编程开发还是用户体验来说并不是很好。最主要理由如下：

1. 对于不同系统、不同输入法，数字键盘视觉和键位布局上并不统一
2. 即使将 input 的 type 属性指定为 number，用户仍然能自己切换为其它键盘也算是一种误操作（因为 number input 内无法输入中英文等字符，只能切为数字键盘才能正常输入）
3. 有些情况下我们不允许输入小数点和算术符号，但手机输入法原生数字键盘总包含一些多余的符号按键而且无法隐藏，因此需要额外的处理来限制这些键输入
4. 在 iOS 中，弹出的原生键盘，可能影响 fixed 元素定位

如果使用虚拟的数据键盘，上面这些问题了就迎刃而解了。虽然目前已经有不少第三方面数字键盘组件，但我还是深度自己写了一下，主要是为了与自己项目的风格更加统一，二来方便自己设计键位布局。

## 明确按键布局和外观，写出界面

首先需要根据自己的实际应用场景确定需要哪些按键，如何进行布局。比如在我的应用里，是为了输入正整数型的礼物数量，所以除了 0 到 9 数字键之外 ，还需要删除键和确定键，此外为了方便还加了一个 ‘00’ 键。

键盘的布局可以用 table 或者 grid 来实现，当然 flex 之类的布局也是可以的。出于兼容性考虑，我选择了 table。

## 确定交互细节，完成操作逻辑部分代码

在自己的应用中，输入的是正整数，所以开头不能输入一个或多个零，同时限制输入的最大值为 9999。

## 优化视觉效果和操作体验

300ms 延迟问题

防止点击 input 弹出原生键盘

点按按键时的视觉效果
