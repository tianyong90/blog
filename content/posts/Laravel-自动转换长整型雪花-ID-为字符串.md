---
title: Laravel 自动转换长整型雪花 ID 为字符串
date: '2020-10-Mo 16:05:59'
top_img: /top_img.jpg
tags:
  - Laravel
  - 雪花 ID
categories:
  - Laravel
draft: false
---

在设计 API 时，出于安全性等因素考虑，有时需要放弃使用自增 ID，使 ID 非连续且不可猜测。通常可以使用 Hash id，UUID,雪花 ID 等来实现。

在最近的一个项目中，我尝试使用雪花 ID。一通折腾下来发现，逼格挺高，实现也挺简单。然而当我继续撸起袖子与前端部分对接时，却出现了 JS 精度丢失问题，因为存储的 ID 是一个 unsigned bigint 型的值。（至于为什么会有精度丢失现象，这里就不具体解释了，不清楚的可以自行搜索），本文主要介绍解决办法。

想要解决这问题，基本原理也很简单，就是把 ID 转成字符串再返回给前端。

## 错误尝试

一开始我想到的是使用 Laravel Eloquent 模型的模型访问器。只要给需要转换的模型加一个 getIdAttribute，将 ID 转成字符串不就行了嘛？

如：App\Models\User 模型里这样写：

```php
/**
 * @return string
 */
public function getIdAttribute()
{
    return strval($this->attributes['id']);
}
```

但事实并非如此，属性访问器确实能让 API 返回给前端的 ID 变为字符串。但同时也会影响关联模型插入、修改时的结果，例如，user 关联的了 post 模型，使用 $user->posts()->saveMany(...); 这种方式保存的新的 posts 记录，对应的 user_id 会为空。

这也不难理解，因为模型访问器是要参与模型相关处理的，访问器将 ID 由数字转为了字符串，自然会导致数据错乱。

## 正确姿势

冷静下来决定先认真思考再动手，查阅了官方文档，才发现 Resource 正是我想要的。Resource 只会影响返回给前端的数据，我们可以通过自定义 Resource 来实现 API 返回结果的结构、类型转换等功能。转换个 ID 自然也不在话下。

为了省事，我直接修改 App\Http\Resource 这个基类。只需要重载它的 toArray() 方法，在其中使用递归，对可能超出 JS 安全数值范围的值进行转换就可以了。大家也可以根据自己的实际情况，新建 Resource 类，如 UserResource 来处理。

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
            // 为方便演示这里把所有整型字段都转成字符串
            if (is_int($parentReturn[$key])) {
                $parentReturn[$key] = strval($parentReturn[$key]);
            }

            // 关联的字段，如 $user->post，相当于递归处理
            if (is_array($parentReturn[$key])) {
                $parentReturn[$key] = new Resource($parentReturn[$key]);
            }
        }

        return $parentReturn;
    }
}
```

然后，在接口控制器中返回 Resource 返回数据，整型字段值就会自动变为字符串了。

```php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\Resource;
use App\Models\User;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * @return \App\Http\Resources\Resource
     */
    public function __invoke(Request $request)
    {
        $user = User::first();

        return new Resource($user);
    }
}
```

结果如下图：

![](./result.png)

## 注意事项

- 因为这种办法使用了遍历，而且有递归处理，当数据结构复杂、数据量较大时可能会对性能造成一定影响。我这里算是比较偷懒取巧的写法，如果对性能有追求，自定义 Resource 类，然后根据特定的已知的字段名来进行转换会比较好

- 因为返回给前端的 ID 转为了字符串，前端在进行比较判断，特别是 === 判断时要特别注意
