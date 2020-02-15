<template>
  <div class="container mt-4 md:my-4">
    <div class="post rounded-lg overflow-hidden">
      <img :src="topImg" loading="lazy" class="w-full cover-image" />

      <div class="px-4 md:px-8 py-2">
        <div class="mb-4">
          <h1 class="text-gray-800 text-xl font-normal" v-text="title" />
          <div class="text-gray-700 text-xs post-date">{{ date | formatTime }}</div>
        </div>

        <div class="markdown-body" v-html="html" />

        <div class="social-share"></div>
      </div>
    </div>

    <div class="px-4 md:px-0 navigator">
      <nuxt-link v-if="prevLink" tag="a" :to="prevLink" class="navigator-btn mr-auto btn-prev"
        ><span class="mdi mdi-chevron-left"></span> 上一篇
      </nuxt-link>
      <nuxt-link v-if="nextLink" tag="a" :to="nextLink" class="navigator-btn ml-auto btn-next"
        >下一篇<span class="mdi mdi-chevron-right"></span
      ></nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { orderBy } from 'lodash'

@Component({
  filters: {
    formatTime(val) {
      return dayjs(val).format('YYYY-MM-DD')
    },
  },

  async asyncData({ params }) {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    // 链接中拼音化的文件名
    const slugifiedFilename = params.slug

    const thePost: any = posts.find((item: any) => {
      return item.slugifiedFilename === slugifiedFilename
    })

    // 上一篇和下一篇
    const thePostIndex = posts.indexOf(thePost)

    const prevPost = thePostIndex === 0 ? null : posts[thePostIndex - 1]
    const nextPost = thePostIndex === posts.length - 1 ? null : posts[thePostIndex + 1]

    const prevLink = prevPost ? `/posts/${prevPost.slugifiedFilename}` : null
    const nextLink = nextPost ? `/posts/${nextPost.slugifiedFilename}` : null

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
      prevLink,
      nextLink,
    }
  },
})
export default class Slug extends Vue {
  topImg: string = ''

  head() {
    return {
      title: (this as any).title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: (this as any).tags.join(',') },
        { hid: 'description', name: 'description', content: '' },
      ],
    }
  }
}
</script>

<style scoped lang="scss">
.post {
  background-color: rgba(255, 255, 255, 0.65);
}

.cover-image {
  max-height: 420px;
  object-fit: cover;
}

.markdown-body {
  min-height: 40vh;
  font-size: 1rem;
  text-align: left;
}

.navigator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  &-btn {
    font-size: 0.85rem;
    background-color: rgba(255, 255, 255, 0.65);
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    text-decoration: none;

    &:hover {
      background-color: darken(rgba(255, 255, 255, 0.65), 20);
    }
  }
}
</style>
