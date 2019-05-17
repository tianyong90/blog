import path from 'path'
import NuxtConfiguration from '@nuxt/config'
import CopyPlugin from 'copy-webpack-plugin'
import pkg from './package.json'
import posts from './posts/posts.json'

// console.log(posts)

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'gb2312' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/typora-vue-theme/vue.css' },
      // { rel: 'stylesheet', href: '/typora-vue-theme/vue-dark.css' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00f' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.scss'],

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
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
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
    extractCSS: true,

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // TODO: 不使用 eslint-loader，在提交时自动检查并修正即可
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module!.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //   })
      // }

      // frontmatter-markdown-loader
      config.module!.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'posts'),
        options: {
          vue: false,
        },
      })

      // TODO:
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
    routes: ['404'].concat(posts.map(post => `/posts/${post.file}`)),
  },
}

export default config
