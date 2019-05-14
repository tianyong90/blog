<template>
  <section class="container">
    <div>
      <a class="btn btn-danger" href="/about">to about</a>
    </div>
  </section>
</template>

<script>
import test from '../posts/test.md'

export default {
  components: {},

  data() {
    return {
      msg: 'hello',
      test: test,
    }
  },

  async asyncData(app) {
    // console.log(app)

    const posts = await import('../posts')

    return {
      posts: posts,
      blogs: [
        {
          title: 'so what is this',
        },
      ],
    }
  },
}
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
