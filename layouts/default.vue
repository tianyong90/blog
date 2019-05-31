<template>
  <div>
    <Header />
    <nuxt class="main" />
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

export default {
  components: {
    Header,
    Footer,
    BackToTop,
  },

  head() {
    return {
      // 酷暑模板
      titleTemplate: `%s - 田写`,
    }
  },
}
</script>

<style></style>
