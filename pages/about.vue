<template>
  <section class="container">
    <div>
      <nuxt-link to="/">to homepage</nuxt-link>
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

<style></style>
