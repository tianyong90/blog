<template>
  <nav class="sticky inset-x-0 top-0 bg-gray-800 z-50">
    <div class="container mx-auto py-2 z-50 text-center">
      <nuxt-link tag="a" to="/" class="text-white text-xl font-normal no-underline">田写</nuxt-link>
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

<style scoped lang="scss"></style>
