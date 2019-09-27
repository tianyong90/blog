<template>
  <nav class="sticky inset-x-0 top-0 z-50 nav">
    <div class="container flex mx-auto z-50 justify-between items-center h-full">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>

      <div>
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
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {},
})
</script>

<style scoped lang="scss">
.nav {
  height: 45px;
  background-color: rgba(40, 40, 40, 0.75);
}
</style>
