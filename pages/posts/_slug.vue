<template>
  <div>
    <h1 v-text="title" />
    <div v-html="html" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.slug}.md`)

    // console.log(fileContent)

    const attrs = fileContent.attributes

    return {
      title: attrs.title,
      renderFunc: fileContent.vue.render,
      html: fileContent.html,
    }
  },
})
</script>
