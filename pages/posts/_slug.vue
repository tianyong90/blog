<template>
  <div class="container py-4">
    <h1 v-text="title" />
    <div class="markdown-body" v-html="html" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'github-markdown-css/github-markdown.css'

export default Vue.extend({
  validate({ params }) {
    // TODO: 参数验证
    return true
  },

  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.slug}.md`)

    const attrs = fileContent.attributes

    return {
      title: attrs.title,
      renderFunc: fileContent.vue.render,
      html: fileContent.html,
    }
  },
})
</script>

<style lang="scss"></style>
