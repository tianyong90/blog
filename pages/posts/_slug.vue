<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 lg:px-0 py-4">
      <img :src="topImg" class="w-full shadow-md" />

      <div class="mb-4">
        <h1 class="text-gray-700 text-xl post-title" v-text="title" />
        <div class="text-gray-600 text-sm post-date">{{ date | formatTime }}</div>
      </div>

      <div class="markdown-body" v-html="html" />

      <div class="social-share"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Color from 'color'
import dayjs from 'dayjs'
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
      return dayjs(val).format('YYYY-MM-DD')
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

.markdown-body {
  min-height: 40vh;
}
</style>
