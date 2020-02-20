<template>
  <div>
    <Header />
    <nuxt />
    <Footer :post-count="postCount" :updated-at="updatedAt" />
    <BackToTop />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

export default {
  components: {
    Header,
    Footer,
    BackToTop,
  },

  computed: {
    ...mapState({
      postCount: state => state.postCount,
      updatedAt: state => state.updatedAt,
    }),
  },
}
</script>
