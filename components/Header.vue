<template>
  <nav class="sticky inset-x-0 top-0 bg-gray-800 z-50">
    <div class="container flex mx-auto py-2 z-50 justify-between">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>

      <div class="hidden">
        <a href="/github" class="text-white text-xl font-normal no-underline">github</a>
        <nuxt-link tag="a" to="/github" class="text-white text-xl font-normal no-underline"
          >开源</nuxt-link
        >
        <nuxt-link tag="a" to="/github" class="text-white text-xl font-normal no-underline"
          >简历</nuxt-link
        >
        <nuxt-link tag="a" to="/github" class="text-white text-xl font-normal no-underline"
          >微博</nuxt-link
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
