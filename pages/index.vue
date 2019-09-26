<template>
  <div class="container mx-auto">
    <transition-group name="list" tag="div" class="post-list">
      <nuxt-link
        v-for="post in paginatedPosts.data"
        :key="post.title"
        class="shadow-md rounded-lg overflow-hidden no-underline post-list-item"
        :to="'/posts/' + post.slugifiedFilename"
      >
        <img :src="coverImgUrl(post)" class="post-cover" />

        <div class="flex flex-col h-full justify-between p-4">
          <div class="text-gray-800 text-lg font-normal no-underline" v-html="post.title" />

          <p class="text-xs text-gray-700" v-html="post.description" />

          <div>
            <span
              v-for="(tag, tagIndex) in post.tags"
              :key="tagIndex"
              class="bg-gray-600 mr-1 px-2 py-1 rounded-sm text-xs text-white font-light tag"
              >{{ tag }}</span
            >
          </div>
        </div>
      </nuxt-link>
    </transition-group>

    <div class="paginator">
      <nuxt-link
        v-if="paginatedPosts.total_pages > 1 && paginatedPosts.page !== 1"
        tag="a"
        :to="paginatedPosts.prev_url"
        class="paginator-btn mr-auto btn-prev"
        ><span class="mdi mdi-chevron-left"></span> 上一页
      </nuxt-link>
      <nuxt-link
        v-if="paginatedPosts.total_pages > 1 && paginatedPosts.page !== paginatedPosts.total_pages"
        tag="a"
        :to="paginatedPosts.next_url"
        class="paginator-btn ml-auto btn-next"
        >下一页<span class="mdi mdi-chevron-right"></span
      ></nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy, drop, get } from 'lodash'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string

  [key: string]: any
}

// 分页
function getPaginatedItems(items, page, pageSize) {
  const pg = parseInt(page || 1)
  const pgSize = parseInt(pageSize || 100)
  const offset = (pg - 1) * pgSize
  const pagedItems = drop(items, offset).slice(0, pgSize)

  return {
    page: pg,
    pageSize: pgSize,
    total: parseInt(items.length),
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems,
    prev_url: `/?p=${pg - 1}`,
    next_url: `/?p=${pg + 1}`,
  }
}

export default Vue.extend({
  head() {
    return {
      title: '首页',
      // TODO: keyword and description
    }
  },

  data() {
    return {
      paginatedPosts: {},
    }
  },

  async asyncData() {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    return { posts }
  },

  mounted() {
    // 第几页
    const page = get((this as any).$route, 'query.p', 1)

    this.paginatedPosts = getPaginatedItems((this as any).posts, page, 9)
  },

  beforeRouteUpdate(to, from, next) {
    // 第几页
    const page = get(to, 'query.p', 1)

    this.paginatedPosts = getPaginatedItems((this as any).posts, page, 10)

    next()
  },

  methods: {
    coverImgUrl(post: Post): string {
      return '/_nuxt/posts/' + post.filename + post.top_img.replace('./', '/')
    },
  },
})
</script>

<style scoped lang="scss">
.post-list {
  display: grid;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;

  &-item {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.65);
    padding: 0;
  }

  .post-cover {
    display: flex;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  // 小于 768px 两列
  @media screen and (max-width: 768px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 640px) {
    & {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

.paginator {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .paginator-btn {
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
