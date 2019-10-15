<template>
  <nav class="sticky inset-x-0 top-0 z-50 nav">
    <div class="container flex mx-auto z-50 justify-between items-center h-full">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>

      <div>
        <nuxt-link class="text-white ml-4 font-light no-underline" tag="a" to="/open-source">
          开源
        </nuxt-link>
        <a
          href="https://github.com/tianyong90"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
          >GitHub</a
        >
        <a
          href="https://weibo.com/1707227001"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
          >微博</a
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { orderBy } from 'lodash'
import Fuse from 'fuse.js'
import { Component, Vue } from 'vue-property-decorator'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string

  [key: string]: any
}

@Component({
  async asyncData() {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    return { posts }
  },
})
export default class Header extends Vue {
  posts: Post[] = []

  mounted() {
    console.log(this.posts)

    // 第几页
    const options: Fuse.FuseOptions<Post> = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'tags'],
    }
    const fuse = new Fuse(this.posts, options) // "list" is the item array
    const result = fuse.search('前端')

    console.table('搜索结果', result)
  }

  coverImgUrl(post: Post): string {
    return '/_nuxt/posts/' + post.filename + post.top_img.replace('./', '/')
  }
}
</script>

<style scoped lang="scss">
.nav {
  height: 45px;
  background-color: #242424;
}
</style>
