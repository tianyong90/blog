<template>
  <div class="flex w-screen main">
    <nuxt-content
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto my-10 p-10 container overflow-hidden md:border-2 article-content"
      :document="document"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ $content, params }) {
    const document = await $content('documents/' + params.title).fetch()

    return {
      document,
    }
  },
})
</script>

<style scoped lang="scss">
@import "~@/assets/scss/variables.scss";

.main {
  background: #f5efe1;
}

.article-content {
  border-color: #ab633f;

  ol {
    list-style: decimal;
    padding-left: 3em;

    li {
      padding-left: 0;
    }
  }

  ul {
    list-style: disc;
    padding-left: 3em;

    li {
      padding-left: 0;
    }
  }

  a {
    text-decoration: underline;
  }
}
</style>
