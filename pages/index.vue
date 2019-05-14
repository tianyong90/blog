<template>
  <section class="container">
    <div>
      <nuxt-link to="posts">post list</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},

  data() {
    return {
      msg: 'hello',
    }
  },

  async asyncData(app) {},
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
