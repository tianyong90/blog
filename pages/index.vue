<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10 post-list">
      <nuxt-link
        v-for="post in posts"
        :key="post.title"
        class="shadow-md rounded-md overflow-hidden post-list-item"
        :to="post.path"
      >
        <div class="cover-wrapper">
          <img
            :src="coverImgUrl(post)"
            loading="lazy"
            class="post-cover"
          >
        </div>

        <div class="flex flex-col h-full justify-between p-4">
          <h1
            class="text-gray-800 text-lg font-normal no-underline post-title"
          >
            {{ post.title }}
          </h1>

          <ul class="flex mt-4">
            <li
              v-for="(tag, tagIndex) in post.tags"
              :key="tagIndex"
              class="bg-gray-600 mr-1 px-2 py-1 rounded-sm text-sm text-white font-light tag"
              v-text="tag"
            />
          </ul>
        </div>
      </nuxt-link>
    </div>

    <div class="paginator">
      <nuxt-link
        v-if="!paginatedPosts.is_first_page"
        :to="paginatedPosts.prev_link"
        class="paginator-btn mr-auto btn-prev"
      >
        <span class="mdi mdi-chevron-left" /> 上一页
      </nuxt-link>
      <nuxt-link
        v-if="!paginatedPosts.is_last_page"
        :to="paginatedPosts.next_link"
        class="paginator-btn ml-auto btn-next"
      >
        下一页<span class="mdi mdi-chevron-right" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

const PAGE_SIZE = 12

export default Vue.extend({
  async asyncData ({ $content, query }) {
    const page = parseInt(query.page || 1)

    const posts = await $content('posts')
      .where({ draft: false })
      .sortBy('createdAt', 'desc')
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (page - 1))
      .fetch()

    const totalPostCount = (await $content('posts')
      .only(['title'])
      .where({ draft: false })
      .fetch()).length

    return { posts, page, totalPostCount }
  },

  head () {
    return {
      title: '首页',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '田写，田勇的博客，tianyong90,田较瘦' },
        {
          hid: 'description',
          name: 'description',
          content: '田勇的个人博客，技术、分享、生活及其它',
        },
      ],
    }
  },

  computed: {
    paginatedPosts () {
      const totalPages = Math.ceil(this.totalPostCount / PAGE_SIZE)

      const page = parseInt(this.page)

      const isFirstPage = page === 1
      const isLastPage = page === totalPages

      return {
        is_first_page: isFirstPage,
        is_last_page: isLastPage,
        prev_link: isFirstPage ? '' : '/?page=' + (page - 1),
        next_link: isLastPage ? '' : '/?page=' + (page + 1),
      }
    },
  },

  watch: {
    '$route' (to, from) {
      const page = parseInt(to.query.page || 1)

      this.$content('posts')
        .where({ draft: false })
        .sortBy('createdAt', 'desc')
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
        .fetch()
        .then(res => {
          this.posts = res
        })

      this.page = page
    },
  },

  methods: {
    coverImgUrl (post) {
      return '/images/post-images/' + post.slug + post.top_img
    },
  },
})
</script>

<style scoped lang="scss">
.post-list {
  &-item {
    display: flex;
    padding: 0;
    background-color: #fff;
    flex-direction: column;
  }

  .cover-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; // 使用 padding-bottom 实现固定比例 16:9
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-color: #000;
      content: '';
      opacity: 0;
      transition: all 200ms ease-in-out;
    }

    &:hover::after {
      opacity: 0.25;
    }
  }

  .post-cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-title {
    display: box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}

.paginator {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .paginator-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: #fff;
    text-decoration: none;
    background-color: rgba(0 0 0 / 65%);
    border-radius: 0.2rem;

    &:hover {
      background-color: lighten(rgba(0 0 0 / 65%), 20);
    }
  }
}
</style>
