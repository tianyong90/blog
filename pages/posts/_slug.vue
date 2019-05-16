<template>
  <div class="container py-4">
    <h1 class="post-title" v-text="title" />
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
    const markdownFileName = params.slug

    const fileContent = await import(`~/posts/${markdownFileName}.md`)

    const attrs = fileContent.attributes

    // markdown 内容中图片地址引用替换
    const html = fileContent.html.replace('src="./', `src="/_nuxt/posts/${markdownFileName}/`)

    return {
      title: attrs.title,
      html,
    }
  },
})
</script>

<style scoped lang="scss">
.post-title {
  display: block;
  text-align: center;
  margin-bottom: 2em;
  font-size: 2rem;
  color: #555;
}
</style>
