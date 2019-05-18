<template>
  <div class="container post-container">
    <div class="post-list">
      <div v-for="(post, index) in posts" :key="index" class="post-list-item shadow">
        <nuxt-link class="post-title" tag="a" :to="'/posts/' + post.file">{{
          post.title
        }}</nuxt-link>

        <!--todo: DESCRIPTION-->
        <!--<p class="post-description" v-html="post.description"></p>-->

        <div class="tags">
          <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData() {
    const posts = await import('~/posts/posts.json')

    return { posts: posts.default }
  },
})
</script>

<style lang="scss">
.post-container {
  margin-top: 65px;
}

.post-list {
  display: block;

  .post-list-item {
    display: block;
    margin: 1rem 0;
    padding: 1rem 1.5rem;

    .post-title {
      display: block;
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .post-description {
      color: #555;
      font-size: 0.9rem;
    }
  }

  .tags {
    display: flex;
    margin-top: 1rem;

    .tag {
      display: flex;
      background-color: #455a64;
      margin-right: 0.5rem;
      padding: 0.2rem 0.5rem;
      color: #fff;
      font-size: 0.725rem;
      border-radius: 3px;
    }
  }
}
</style>
