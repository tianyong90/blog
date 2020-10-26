---
title: Laravel 自动转换长整型雪花 ID 为字符串
date: '2020-10-Mo 16:05:59'
top_img: ./top_img.png
tags:
  - Laravel
  - 雪花 ID
categories:
  - Laravel
draft: true
---

在设计 API 时，出于安全性等因素考虑，有时需要放弃使用自增 ID，使 ID 非连续且不可猜测。通常可以使用 Hash id，UUID,雪花 ID 等来实现。

在最近的一个项目中，我尝试使用雪花 ID。一通折腾下来发现，逼格挺高，实现也挺简单。然而当我继续撸起袖子与前端部分对接时，却出现了 JS 精度丢失问题，因为存储的 ID 是一个 unsigned bigint 型的值。（至于为什么会有精度丢失现象，这里就不具体解释了，不清楚的可以自行搜索），本文主要介绍解决办法。


## 错误尝试

## 正确姿势

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $parentReturn = parent::toArray($request);

        foreach (array_keys($parentReturn) as $key) {
            // TODO: 判断是长整型
            if (is_int($parentReturn[$key])) {
                $parentReturn[$key] = strval($parentReturn[$key]);
            }

            // 关联的字段，如 $user->merchant
            if (is_array($parentReturn[$key])) {
                $parentReturn[$key] = new Resource($parentReturn[$key]);
            }
        }

        return $parentReturn;
    }
}
```
