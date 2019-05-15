<template>
  <header class="navbar navbar-dark bg-dark text-light">
    <div class="row flex-nowrap justify-content-between align-items-center">
      <h1 class="blog-title text-center d-block">田写</h1>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    window.addEventListener(
      'scroll',
      e => {
        console.log(window.scrollY)
      },
      false
    )
  },
})
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
