<template>
  <div class="max-w-4xl mx-auto">
    <div class="">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="my-6 shadow-md p-4 sm:flex-col bg-white rounded-sm"
      >
        <div class="">
          <nuxt-link
            class="text-gray-800 text-base no-underline"
            :to="'/posts/' + post.slugifiedFilename"
            >{{ post.title }}</nuxt-link
          >

          <p class="text-sm font-thin" v-html="post.description" />

          <div class="">
            <span
              v-for="(tag, tagIndex) in post.tags"
              :key="tagIndex"
              class="bg-gray-600 mx-1 px-2 py-1 rounded-sm text-xs text-white font-thin"
              >{{ tag }}</span
            >
          </div>
        </div>

        <!--        <img class="sm:flex lg:hidden w-24 h-24 rounded" :src="coverImgUrl(post)" alt="" />-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string
  [key: string]: any
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

    return { posts }
  },

  methods: {
    coverImgUrl(post: Post): string {
      return '/_nuxt/posts/' + post.filename + post.top_img.replace('./', '/')
    },
  },
})
</script>

<style lang="scss"></style>
