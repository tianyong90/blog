---
title: 在 Laravel 项目中使用 webpack-encore
date: 2019-07-07 13:47:57
top_img: ./encore.png
tags:
  - webpack-encore
  - laravel-mix
  - laravel
categories:
  - 前端
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

需要注意的是，webpack-encore 没有像 laravel-mix 那样在自己内部依赖 vue-tempplate-compiler 之类的包，所以如果自己项目里用动了这些，需要自己在项目里手动安装好。

## 配置 webpack

在项目根目录下新建一个 webpack.config.js 文件并在其中配置 webpack-encore 功能（实际上它最终也是一个标准的 webpack 配置文件），以最基本的玩法为例。

```js
const Encore = require('@symfony/webpack-encore')

Encore
// directory where compiled assets will be stored
  .setOutputPath('public/js/')
  // public path used by the web server to access the output path
  .setPublicPath('/js')
  // only needed for CDN's or sub-directory deploy
  //.setManifestKeyPrefix('build/')

  /*
   * ENTRY CONFIG
   *
   * Add 1 entry for each "page" of your app
   * (including one that's included on every page - e.g. "app")
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
   */.addEntry('app', './resources/js/app.js')

// will require an extra script tag for runtime.js
// but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  .cleanupOutputBeforeBuild().enableSourceMaps(!Encore.isProduction())
// enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  .enableVueLoader()
  .enableSassLoader(options => {
    options.implementation = require('sass')
  })

// fetch the config, then modify it!
const config = Encore.getWebpackConfig()

// export the final config
module.exports = config
```


## 新增 php helper 函数

Laravel 自带了一个 mix() 函数用于引用 mix 编译的资源，与之类似，syfony 也有这样的函数，而且更为方便。为此你需要在 Laravel 项目中自行实现这两方法，下面是我参考 symfony 里相关源码改写的，可能逻辑上并不算完善，但以自己一个多月的使用情况来看，它们表现良好。

```php
use Illuminate\Support\HtmlString;

/**
 * @param  string  $entryName
 * @return HtmlString
 */
function encore_entry_link_tags(string $entryName): HtmlString
{
    $entryPointsFile = public_path('js/entrypoints.json');

    $jsonResult = json_decode(file_get_contents($entryPointsFile), true);

    if (!array_key_exists('css', $jsonResult['entrypoints'][$entryName])) {
        return null;
    }

    $tags = array_map(function ($item) {
        return '<link rel="stylesheet" href="'.$item.'"/>';
    }, $jsonResult['entrypoints'][$entryName]['css']);

    return new HtmlString(implode('', $tags));
}

/**
 * @param  string  $entryName
 * @return HtmlString
 */
function encore_entry_script_tags(string $entryName): HtmlString
{
    $entryPointsFile = public_path('js/entrypoints.json');

    $jsonResult = json_decode(file_get_contents($entryPointsFile), true);

    if (!array_key_exists('js', $jsonResult['entrypoints'][$entryName])) {
        return null;
    }

    $tags = array_map(function ($item) {
        return '<script src="'.$item.'"></script>';
    }, $jsonResult['entrypoints'][$entryName]['js']);

    return new HtmlString(implode('', $tags));
}
```

## 使用 `encore_entry_link_tags` 和 `encore_entry_script_tags` 引用编译的前端资源

在模板里使用前面添加的 helper 函数引用资源，你会发现它比 Laravel 自带的 mix() 函数更方便，只需要一个函数，就可以自动引入 vendor.js 和 app.js 了。

```php
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- app.css -->
    {{ encore_entry_link_tags('app') }}
</head>
<body>

    <div id="app"></div>

    {{ encore_entry_script_tags('app') }}
</body>
</html>
```

## 修改 package.json 中的脚本（scripts）

因为 laravel 项目默认 package.json 中 develop 等相关的脚本都是使用 laravel-mix 的，为了方便日常开发，现在要对它们进行一些调整，改用 webpack-cocore。调整后大致如下，你也可以根据自己实际应用情况进行其它调整

```json
"scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development encore dev",
    "watch": "npm run development -- --watch",
    "watch-poll": "npm run watch -- --watch-poll",
    "hot": "encore dev-server --port=9001 --hot",
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production encore production"
},
```

## 运行脚本，愉快撸 BUG

做完前面的这些步骤之后，在终端执行 `yarn run hot`，浏览器中输入项目绑定的域名（如 app.test)，就可以体验方便高效的 HMR 开发了。

## 后记

使用 webpack-encore 已经快两个月了，这期间总体说来相当顺利，小坑虽然有，但没什么大坑。去 github 上提 issue，维护成员基本上都很友善耐心，几个小时就会有回复。这种态度也让我对它更加放心了，相信它会折腾得越来越好。虽然 webpack-encore 是作为 Symfony 默认集成工具来设计的，但这并不妨碍它在 Laravel 中发挥强大威力。

相比于 laravel-mix，encore 的 API 以及一些默认配置方面考虑得更为科学和全面，想要配置 vue-loader 或者  ts-loader 之类的，只需要调用相应的方法。另外还有点让我先惊讶的是，他们竟然对 `watchOptions.ignored` 的默认值也考虑到了，默认忽略 /node_modules/，降低 CPU 占用。当然，更为重要的是，mix4 里因为一些 bug 而无法使用的功能，在 encore 里却正常，如 dynamic import。

总之，如果你已经发现了 laravel-mix 的种种不足但又苦于没更好选择的话，不妨试试 webpack-encore，相信你会对它爱不释手。
