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

        <img class="cover" loading="lazy" :src="coverImgUrl(post)" alt="" />
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

<style lang="scss">
// .post-container {
//   margin-top: 65px;
// }

// .post-list {
//   .post-list-item {
//     display: block;
//     margin: 1rem 0;
//     padding: 1rem 1.5rem;

//     .post-title {
//       display: block;
//       color: #2b2b2b;
//       font-size: 1.1rem;
//       font-weight: 500;
//       margin-bottom: 1rem;
//     }

//     .post-description {
//       color: #444;
//       font-size: 0.85rem;
//       display: -webkit-box;
//       -webkit-line-clamp: 2;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }

//     .tags {
//       display: flex;
//       margin-top: 1rem;

//       .tag {
//         display: flex;
//         background-color: #455a64;
//         margin-right: 0.5rem;
//         padding: 0.2rem 0.5rem;
//         color: #fff;
//         font-size: 0.725rem;
//         border-radius: 3px;
//       }
//     }

//     .cover {
//       display: none;
//     }

//     @include media-breakpoint-down(sm) {
//       display: flex;
//       overflow: hidden;
//       justify-content: space-between;
//       padding: 0;
//       border-radius: 3px;

//       .post-title {
//         padding: 0.85rem 1rem;
//       }

//       .post-description,
//       .tags {
//         display: none;
//       }

//       .cover {
//         display: block;
//         width: 85px;
//         height: 85px;
//         object-fit: cover;
//       }
//     }
//   }
// }
</style>
