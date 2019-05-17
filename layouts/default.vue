<template>
  <div>
    <Header />
    <nuxt class="main" />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'bootstrap/scss/bootstrap.scss'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style></style>
