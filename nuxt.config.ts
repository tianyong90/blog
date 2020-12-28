import path, { join } from 'path'
import { Configuration } from '@nuxt/types'
import Sass from 'sass'
import posts from './posts/posts.json'
import address from 'address'
import defaultGateway from 'default-gateway'

/**
 * 获取本地 IP
 *
 * https://github.com/vuejs/vue-cli/blob/eda18b05424c8c3e6862a7a5e2e15b7513bebbe4/packages/%40vue/cli-service/lib/util/prepareURLs.js#L37
 */
let localIp = 'localhost'
try {
  // This can only return an IPv4 address
  const result = defaultGateway.v4.sync()
  const lanUrlForConfig = address.ip(result && result.interface)
  if (lanUrlForConfig) {
    // Check if the address is a private ip
    // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
    if (
      /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
        lanUrlForConfig,
      )
    ) {
      localIp = lanUrlForConfig
    }
  }
} catch (_e) {
  // ignored
}

const config: Configuration = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

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
      { hid: 'description', name: 'description', content: '田勇的博客。技术、生活及其它……' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff9b36' },

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/app.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/app-service.ts',
      ssr: false,
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    '@nuxt/content',
  ],

  buildModules: [
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@aceforth/nuxt-optimized-images',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  content: {
    liveEdit: true,
    markdown: {
      remarkPlugins: [
        'remark-emoji',
        // 'remark-admonitions',
        'remark-slug',
        'remark-autolink-headings',
        'remark-external-links',
        'remark-footnotes',
      ],

      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  svgSprite: {
    // https://github.com/nuxt-community/svg-sprite-module
    // manipulate module options
  },

  /*
   ** Build configuration
   */
  build: {
    parallel: false, // 这个设置为 false，因为 extractCSS 为true 时冲突

    // 生产环境下才提取，开发环境下提取可能导致修改样式后无法热替换(hmr)
    extractCSS: process.env.NODE_ENV === 'production',

    loaders: {
      scss: {
        implementation: Sass,
      },
    },

    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
  },

  // TODO:
  // generate: {
  //   routes: ['404'].concat(posts.map(post => `/posts/${post.slugifiedFilename}`)),
  // },

  server: {
    host: process.env.DEV_SERVER_HOST || localIp,
    port: 3000,
  },
}

export default config
