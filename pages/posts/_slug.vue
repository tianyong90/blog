<template>
  <div>
    <h1>title</h1>
    <div v-html="content" />
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.slug}.md`)

    return {
      content: fileContent,
    }
  },
}
</script>
