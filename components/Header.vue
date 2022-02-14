<template>
  <nav class="sticky inset-x-0 top-0 z-50 nav">
    <div class="container flex mx-auto z-50 justify-between items-center h-full">
      <nuxt-link
        tag="a"
        to="/"
        class="text-white text-xl font-normal no-underline"
      >
        田写
      </nuxt-link>

      <div class="ml-auto mr-2 search-bar">
        <input
          v-model="keyword"
          type="text"
          class="search-input"
          placeholder="搜索文章"
        >

        <div
          v-show="searchResult.length > 0"
          class="search-result"
        >
          <nuxt-link
            v-for="(post, index) in searchResult"
            :key="index"
            tag="a"
            class="search-result-item"
            :to="'/posts/' + post.slugifiedFilename"
          >
            {{ post.title }}
          </nuxt-link>
        </div>
      </div>

      <div class="hidden md:flex space-x-8">
        <!--        <nuxt-link
          class="text-white ml-4 font-light no-underline"
          tag="a"
          to="/open-source"
        >
          开源
        </nuxt-link>-->
        <nuxt-link
          class="text-white ml-4 font-light no-underline"
          tag="a"
          to="/resume"
        >
          个人简历
        </nuxt-link>
        <a
          href="https://github.com/tianyong90"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
        >GitHub</a>
        <a
          href="https://weibo.com/1707227001"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
        >微博</a>
      </div>

      <span
        class="md:hidden mdi text-white text-lg dropdown-menu-toggle"
        :class="menutoggleClass"
        @click="toggleDropdownMenu"
      />

      <div
        v-show="dropdownMenuVisible"
        class="container flex md:hidden dropdown-menu"
      >
        <!--        <nuxt-link
          class="dropdown-menu-item"
          tag="a"
          to="/open-source"
        >
          开源
        </nuxt-link>-->
        <nuxt-link
          class="dropdown-menu-item"
          to="/resume"
        >
          个人简历
        </nuxt-link>
        <a
          href="https://github.com/tianyong90"
          target="_blank"
          class="dropdown-menu-item"
        >GitHub</a>
        <a
          href="https://weibo.com/1707227001"
          target="_blank"
          class="dropdown-menu-item"
        >微博</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash'
import Fuse from 'fuse.js'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string

  [key: string]: any
}

export default Vue.extend({
  name: 'Header',

  data () {
    return {
      posts: [] as Array<Post>,
      keyword: '',
      searchResult: [],
      fuse: null,
    }
  },

  computed: {
    menutoggleClass () {
      return this.dropdownMenuVisible ? 'mdi-close' : 'mdi-menu'
    },

    dropdownMenuVisible: {
      get () {
        return (this as any).$store.state.dropdownMenuVisible
      },

      set (value) {
        (this as any).$store.commit('UPDATE_DROPDOWN_MENU_VISIBLE', value)
      },
    },
  },

  watch: {
    keyword (val) {
      this.searchResult = this.fuse.search(val)
    },

    '$route' () {
      this.keyword = ''
    },
  },

  async mounted () {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    this.posts = posts

    // 第几页
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: ['title'],
    }
    this.fuse = new Fuse(this.posts, options)
  },

  methods: {
    toggleDropdownMenu () {
      this.dropdownMenuVisible = !this.dropdownMenuVisible
    },
  },
})
</script>

<style scoped lang="scss">
$nav-bg: #242424;
$nav-height: 45px;

.nav {
  height: $nav-height;
  background-color: $nav-bg;
}

.search-bar {
  position: relative;

  .search-input {
    padding: 0.25em 0.5em;
    font-size: 0.85rem;
    color: #fff;
    background-color: lighten($nav-bg, 5%);
    border: solid 1px lighten($nav-bg, 30%);
    border-radius: 100vh;
    outline: none;
    appearance: none;

    &::placeholder {
      color: #ababab;
    }
  }

  .search-result {
    position: absolute;
    top: 30px;
    display: block;
    width: 300px;
    padding: 1rem;
    margin: 0;
    list-style: none;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 5px rgb(0 0 0 / 50%);

    &-item {
      display: box;
      margin: 0.5em 0;
      overflow: hidden;
      color: #333;
      text-decoration: none;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;

      &:hover {
        color: #f00;
        text-decoration: underline;
      }
    }
  }
}

.dropdown-menu {
  position: fixed;
  top: $nav-height;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #fff;
  flex-direction: column;

  .dropdown-menu-item {
    padding: 0.25rem 0;
    font-size: 0.85rem;
    color: #456;
    text-decoration: none;
  }
}
</style>
