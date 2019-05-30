<template>
  <nav class="navbar sticky top-0 py-2">
    <div class="container">
      <nuxt-link tag="a" to="/" class="navbar-brand blog-title">田写</nuxt-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarText" class="collapse navbar-collapse">
        <!-- <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link tag="a" class="nav-link" to="/">首页</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link tag="a" class="nav-link" to="/posts">文章</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link tag="a" class="nav-link" to="/categories">分类</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link tag="a" class="nav-link" to="/tags">标签</nuxt-link>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // TODO:
    window.addEventListener(
      'scroll',
      e => {
        // console.log(window.scrollY)
      },
      false
    )
  },
})
</script>

<style scoped lang="scss">
.navbar {
  background-color: #263238;

  .blog-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;
    line-height: 100%;
    text-decoration: none;
  }
}

.nav-link.nuxt-link-exact-active {
  color: rgb(233, 170, 22);
}
</style>
