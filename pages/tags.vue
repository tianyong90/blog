<template>
  <div class="container post-container">
    <div class="post-list">
      <div v-for="(post, index) in posts" :key="index" class="post-list-item shadow">
        <nuxt-link class="post-title" tag="a" :to="'/posts/' + post.slugifiedFilename">{{
          post.title
        }}</nuxt-link>

        <p class="post-description" v-html="post.description"></p>

        <div class="tags">
          <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex" class="tag">{{ tag }}</span>
        </div>

        <img class="cover" loading="lazy" :src="coverImgUrl(post)" />
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
