<template>
  <nav class="sticky inset-x-0 top-0 bg-gray-800 z-50">
    <div class="container flex mx-auto py-2 z-50 justify-between">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>

      <div>
        <a
          href="https://github.com/tianyong90"
          target="_blank"
          class="text-white text-sm mx-1 font-light no-underline"
          >github</a
        >
        <nuxt-link
          tag="a"
          to="/github"
          class="text-white text-sm mx-1 font-light no-underline hidden"
          >开源</nuxt-link
        >
        <a
          href="https://weibo.com/1707227001"
          target="_blank"
          class="text-white text-sm mx-1 font-light no-underline"
          >微博</a
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {},
})
</script>

<style scoped lang="scss"></style>
