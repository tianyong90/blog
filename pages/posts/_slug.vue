<template>
  <div>
    <h1>title</h1>
    <div v-html="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.slug}.md`)

    console.log(fileContent)

    return {
      content: fileContent,
    }
  },
})
</script>
