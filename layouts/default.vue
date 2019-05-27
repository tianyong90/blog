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
}
</script>

<style></style>
