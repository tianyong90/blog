<template>
  <nav class="sticky inset-x-0 top-0 z-50 nav">
    <div class="container flex mx-auto z-50 justify-between items-center h-full">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>

      <div class="ml-auto mr-2 search-bar">
        <input v-model="keyword" type="text" class="search-input" placeholder="搜索文章" />

        <div v-show="searchResult.length > 0" class="search-result">
          <nuxt-link
            v-for="(post, index) in searchResult"
            :key="index"
            tag="a"
            class="search-result-item"
            :to="'/posts/' + post.slugifiedFilename"
            >{{ post.title }}</nuxt-link
          >
        </div>
      </div>

      <div class="hidden md:flex">
        <nuxt-link class="text-white ml-4 font-light no-underline" tag="a" to="/open-source">
          开源
        </nuxt-link>
        <a
          href="https://github.com/tianyong90"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
          >GitHub</a
        >
        <a
          href="https://weibo.com/1707227001"
          target="_blank"
          class="text-white ml-4 font-light no-underline"
          >微博</a
        >
      </div>

      <span
        class="md:hidden mdi text-white text-lg dropdown-menu-toggle"
        :class="menutoggleClass"
        @click="toggleDropdownMenu"
      />

      <div v-show="dropdownMenuVisible" class="container flex md:hidden dropdown-menu">
        <nuxt-link class="dropdown-menu-item" tag="a" to="/open-source">
          开源
        </nuxt-link>
        <a href="https://github.com/tianyong90" target="_blank" class="dropdown-menu-item"
          >GitHub</a
        >
        <a href="https://weibo.com/1707227001" target="_blank" class="dropdown-menu-item">微博</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { orderBy } from 'lodash'
import Fuse from 'fuse.js'
import { Component, Watch, Vue } from 'vue-property-decorator'

interface Post {
  filename: string
  // eslint-disable-next-line
  top_img: string

  [key: string]: any
}

@Component
export default class Header extends Vue {
  posts: Post[] = []
  keyword: string = ''
  searchResult: Post[] = []
  fuse: any = null

  get menutoggleClass() {
    return this.dropdownMenuVisible ? 'mdi-close' : 'mdi-menu'
  }

  get dropdownMenuVisible() {
    return (this as any).$store.state.dropdownMenuVisible
  }

  set dropdownMenuVisible(value) {
    ;(this as any).$store.commit('UPDATE_DROPDOWN_MENU_VISIBLE', value)
  }

  async mounted() {
    let { default: posts } = await import('~/posts/posts.json')

    // 按发布时间排序
    posts = orderBy(posts, 'date', 'desc')

    this.posts = posts

    // 第几页
    const options: Fuse.FuseOptions<Post> = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: ['title'],
    }
    this.fuse = new Fuse(this.posts, options)
  }

  @Watch('keyword')
  onKeywordChange(val: string) {
    this.searchResult = this.fuse.search(val)
  }

  @Watch('$route')
  onRouteChange() {
    this.keyword = ''
  }

  toggleDropdownMenu() {
    this.dropdownMenuVisible = !this.dropdownMenuVisible
  }
}
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
    font-size: 0.85rem;
    border-radius: 100vh;
    padding: 0.25em 0.5em;
    background-color: lighten($nav-bg, 5%);
    border: solid 1px lighten($nav-bg, 30%);
    outline: none;
    appearance: none;
    color: #fff;

    &::placeholder {
      color: #ababab;
    }
  }

  .search-result {
    display: block;
    margin: 0;
    padding: 1rem;
    width: 300px;
    position: absolute;
    top: 30px;
    background-color: #fff;
    border-radius: 5px;
    list-style: none;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);

    &-item {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0.5em 0;
      color: #333;
      text-decoration: none;

      &:hover {
        color: #f00;
        text-decoration: underline;
      }
    }
  }
}

.dropdown-menu {
  position: fixed;
  width: 100%;
  top: $nav-height;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  flex-direction: column;

  .dropdown-menu-item {
    color: #445566;
    text-decoration: none;
    font-size: 0.85rem;
    padding: 0.25rem 0;
  }
}
</style>
