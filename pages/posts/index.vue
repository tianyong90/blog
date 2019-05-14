<template>
  <div>
    <h1>posts</h1>

    <ul>
      <nuxt-link
        v-for="(post, index) in posts"
        :key="index"
        tag="li"
        :to="'/posts/' + post"
        >{{ post }}</nuxt-link
      >
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData() {
    const posts = await import('~/posts/posts.json')
    return { posts }
  },
})
</script>
