<template>
  <div>
    <div
      class="top-0 text-center py-24 bg-gray-800 bg-fixed bg-cover post-head-wrapper"
      :style="{ backgroundImage: `url(${topImg})` }"
    >
      <div class="hidden md:flex flex-col justify-center items-center z-40">
        <h1 class="text-white text-4xl font-normal post-title post-title" v-text="title" />
        <div class="text-white text-base font-normal post-date">{{ date | formatTime }}</div>
      </div>
    </div>

    <div class="mx-auto max-w-3xl py-4">
      <div class="sm:block md:hidden mb-5">
        <div class="">
          <h1 class="text-gray-700 text-xl post-title" v-text="title" />
          <div class="text-gray-600 text-sm post-date">{{ date | formatTime }}</div>
        </div>
      </div>

      <div class="">
        <div class="markdown-body" v-html="html" />
      </div>

      <div class="social-share"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import analyze from 'rgbaster'
import Color from 'color'
import { format } from 'date-fns'
// TODO:
// import 'social-share.js/dist/css/share.min.css'
// import SocialShare from 'social-share.js'

// interface options extends Vue {
//   tags: any
// }

export default Vue.extend({
  head() {
    return {
      title: (this as any).title,
      meta: [
        // TODO: any
        { hid: 'keywords', name: 'keywords', content: (this as any).tags.join(',') },
        // TODO: 关键词等
        { hid: 'description', name: 'description', content: '' },
      ],
    }
  },

  filters: {
    formatTime(val) {
      return format(new Date(val), 'yyyy-mm-dd')
    },
  },

  // TODO: 参数验证
  // validate({ params }) {
  //   return true
  // },

  data() {
    return {
      topImg: null,
    }
  },

  async asyncData({ params }) {
    const { default: posts } = await import('~/posts/posts.json')

    // 链接中拼音化的文件名
    const slugifiedFilename = params.slug

    const thePost: any = posts.find((item: any) => {
      return item.slugifiedFilename === slugifiedFilename
    })

    // posts 目录中 markdown 实际文件名
    const filename = thePost.filename

    const { html, attributes } = await import(`~/posts/${filename}.md`)

    let topImg
    // 顶部背景图
    if (attributes.top_img) {
      topImg = attributes.top_img.replace(/^\./, `/_nuxt/posts/${filename}`)
    }

    return {
      ...attributes,
      topImg,
      html: html.replace(/src="\.\//g, `src="/_nuxt/posts/${filename}/`), // markdown 内容中图片地址引用替换
    }
  },

  async mounted() {
    if (this.topImg) {
      // 取出头部图片主色调
      const result = await analyze(this.topImg, {
        ignore: ['rgba(255, 255, 255)', 'rgba(0, 0, 0)'],
        scale: 0.6,
      })
      const mainColor = result[0].color

      // 主色调使用透明度后设置为半透明遮罩
      const coverColor = Color(mainColor)
        .alpha(0.65)
        .string()
      ;(document.styleSheets[0] as any).addRule('.post-head::before', `background: ${coverColor}`)
    }

    // TODO:
    // SocialShare('.social-share', {
    //   title: 'abc'
    // })
  },
})
</script>

<style scoped lang="scss">
.post-head-wrapper {
  .post-title,
  .post-date {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
  }
}
</style>
