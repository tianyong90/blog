<template>
  <div class="container py-4">
    <nuxt-link
      v-for="(post, index) in posts"
      :key="index"
      tag="a"
      :to="'/posts/' + post"
      >{{ post }}</nuxt-link
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData() {
    const posts = await import('~/posts/posts.json')

    console.log(posts.default)

    return { posts: posts.default }
  },
})
</script>

<style lang="scss" scoped>
a {
  display: block;
}
</style>
