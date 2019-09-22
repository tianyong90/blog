import path, { join } from 'path'
import { Configuration } from '@nuxt/types'
import CopyPlugin from 'copy-webpack-plugin'
import Sass from 'sass'
import Purgecss from '@fullhuman/postcss-purgecss'
import posts from './posts/posts.json'

const purgecss = Purgecss({
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.html',
    './pages/**/*.vue',
    './components/**/*.vue',
    './components/**/*.jsx',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelist: ['html', 'body', 'nuxt-progress'],
  whitelistPatternsChildren: [/^token/, /^pre/, /^code/, /^line-numbers-wrapper/, /^line-number/],
})

// console.log(posts)
const tailwindJS = join(__dirname, 'tailwind.config.js')

const config: Configuration = {
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
  css: ['~/assets/css/tailwind.css', '~/assets/css/app.scss'],

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
    '@nuxtjs/dotenv',
  ],

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
      },
    ],
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
      },
    },

    postcss: {
      plugins: [
        require('tailwindcss')(tailwindJS),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
      ],
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
