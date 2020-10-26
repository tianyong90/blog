import path, { join } from 'path'
import { Configuration } from '@nuxt/types'
import CopyPlugin from 'copy-webpack-plugin'
import Sass from 'sass'
import Purgecss from '@fullhuman/postcss-purgecss'
import highlightjs from 'highlight.js'
import posts from './posts/posts.json'

const wrap = (code, lang) => `<pre><code class="hljs ${lang}">${code}</code></pre>`

const purgecss = Purgecss({
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.html',
    './pages/**/*.vue',
    './components/**/*.vue'
  ],

  // This is the function used to extract class names from your templates
  defaultExtractor: (content) => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  },
  safelist: {
    standard: [
      /^token/,
      /^pre/,
      /^code/,
      /^line-numbers-wrapper/,
      /^line-number/,
      /^grayscale/
    ],
    deep: [],
    greedy: []
  }
})

// console.log(posts)
const tailwindJS = join(__dirname, 'tailwind.config.js')

const config: Configuration = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (title) => {
      return title ? `${title} - 田写` : '田写'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '田勇的博客。技术、生活及其它……' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff9b36' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '~/assets/css/app.scss', 'highlight.js/styles/nord.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/app-service.ts',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/dotenv'
  ],

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ],
    '@aceforth/nuxt-optimized-images'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  content: {
    markdown: {
      highlighter (rawCode, lang) {
        if (!lang) {
          return wrap(highlightjs.highlightAuto(rawCode).value, lang)
        }
        return wrap(highlightjs.highlight(lang, rawCode).value, lang)
      }
    }
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
        implementation: Sass
      }
    },

    postcss: {
      plugins: [
        require('tailwindcss')(tailwindJS),
        // require('autoprefixer')({}), // TODO:
        ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
      ]
    },

    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
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
                lineNumbers: false // enable line numbers
              }
            }
          }
        ]
      })

      config.plugins!.push(
        new CopyPlugin({
          patterns: [
            { from: './posts/**/*.jpg', to: '' },
            { from: './posts/**/*.png', to: '' },
            { from: './posts/**/*.gif', to: '' }
          ]
        })
      )
    }
  },

  generate: {
    routes: ['404'].concat(posts.map(post => `/posts/${post.slugifiedFilename}`))
  },

  server: {
    host: '0.0.0.0', // 便于在手机上预览效果
    port: 3000
  }
}

export default config
