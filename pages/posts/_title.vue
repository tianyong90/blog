<template>
  <div class="container mx-auto my-4">
    <img
      :src="coverUrl"
      class="w-full h-64 md:h-128 object-cover cover-image"
      alt=""
    >

    <nuxt-content
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto px-4 md:px-10 py-10 overflow-hidden bg-white article-content"
      :document="post"
    />

    <div class="px-4 md:px-0 navigator">
      <nuxt-link
        v-if="prev"
        tag="a"
        :to="prev.path"
        class="navigator-btn mr-auto btn-prev"
      >
        <span class="mdi mdi-chevron-left" /> 上一篇
      </nuxt-link>
      <nuxt-link
        v-if="next"
        tag="a"
        :to="next.path"
        class="navigator-btn ml-auto btn-next"
      >
        下一篇<span class="mdi mdi-chevron-right" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  filters: {
    formatTime (val) {
      return dayjs(val).format('YYYY-MM-DD')
    },
  },

  async asyncData ({ params, $content, error }) {
    // 链接中拼音化的文件名
    const slugifiedFilename = params.title

    let post

    try {
      post = await $content('posts', params.title).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      return error({ message: 'Article not found' })
    }

    // const post = await $content('posts', slugifiedFilename).fetch()
    // const post = await $content('documents/test').fetch()

    console.log(post)

    const [prev, next] = await $content('posts')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(slugifiedFilename)
      .fetch()

    console.log(prev, next)

    return {
      post,
      prev,
      next,
    }
  },

  data () {
    return {
      topImg: '',
    }
  },

  head () {
    return {
      title: this.post.title,
      meta: [{ hid: 'keywords', name: 'keywords', content: this.post.tags.join(',') }, { hid: 'description', name: 'description', content: '' }],
    }
  },

  computed: {
    coverUrl () {
      return '/images/post-images/' + this.post.slug + this.post.top_img
    },
  },
})
</script>

<style scoped lang="scss">
.cover-image {
  max-height: 420px;
  object-fit: cover;
}

.markdown-body {
  font-size: 1rem;
  text-align: left;
}

.navigator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  &-btn {
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
