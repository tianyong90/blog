<template>
  <div class="max-w-4xl mx-auto lg:p-2 px-4 lg:px-0">
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="flex my-6 shadow-md p-4 sm:flex-col rounded-sm post-list-item"
    >
      <div class="">
        <nuxt-link
          class="text-gray-800 text-lg font-normal no-underline"
          :to="'/posts/' + post.slugifiedFilename"
          >{{ post.title }}
        </nuxt-link>

        <p class="text-xs text-gray-800" v-html="post.description" />

        <div class="">
          <span
            v-for="(tag, tagIndex) in post.tags"
            :key="tagIndex"
            class="bg-gray-600 mr-1 px-2 py-1 rounded-sm text-xs text-white font-light"
            >{{ tag }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy, drop } from 'lodash'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string

  [key: string]: any
}

function getPaginatedItems(items, page, pageSize) {
  const pg = page || 1
  const pgSize = pageSize || 100
  const offset = (pg - 1) * pgSize
  const pagedItems = drop(items, offset).slice(0, pgSize)

  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems,
  }
}

export default Vue.extend({
  head() {
    return {
      title: '首页',
      // TODO: keyword and description
    }
  },

  async asyncData() {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    // 分页
    const p = getPaginatedItems(posts, 1, 10)
    console.log(p)

    return { posts }
  },

  methods: {
    coverImgUrl(post: Post): string {
      return '/_nuxt/posts/' + post.filename + post.top_img.replace('./', '/')
    },
  },
})
</script>

<style scoped lang="scss">
.post-list-item {
  background-color: rgba(255, 255, 255, 0.65);
}
</style>
