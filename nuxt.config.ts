import path from 'path'
import NuxtConfiguration from '@nuxt/config'
import CopyPlugin from 'copy-webpack-plugin'
import Fiber from 'fibers'
import Sass from 'sass'
import posts from './posts/posts.json'
const join = require('path').join
// console.log(posts)
const tailwindJS = join(__dirname, 'tailwind.config.js')

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '田写',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '田勇的博客。技术、生活及其它……' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00f' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    parallel: false, // 这个设置为 false，因为 extractCSS 为true 时冲突

    // 生产模式下使用 extractCSS，开发时不用，以免影响热替换 hmr
    extractCSS: process.env.NODE_ENV === 'production',

    loaders: {
      scss: {
        implementation: Sass,
        fiber: Fiber,
      },
    },

    postcss: {
      plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')],
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // markdown loader
      config.module!.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'posts'),
        use: [
          {
            loader: '@tianyong90/vue-markdown-loader',
            options: {
              // 注意模式，直接返回对象数据
              mode: 'raw',
              // sourceDir: ''
              contentCssClass: 'markdown-body',
              markdown: {
                lineNumbers: true, // enable line numbers
              },
            },
          },
        ],
      })

      config.plugins!.push(
        new CopyPlugin([
          { from: './posts/**/*.jpg', to: '' },
          { from: './posts/**/*.png', to: '' },
          { from: './posts/**/*.gif', to: '' },
        ])
      )
    },
  },

  generate: {
    routes: ['404'].concat(posts.map(post => `/posts/${post.slugifiedFilename}`)),
  },
}

export default config
