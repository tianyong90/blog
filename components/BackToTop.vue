<template>
  <div
    v-show="shouldShow"
    class="btn-back-to-top"
    @click.stop="onClick"
  >
    <i class="mdi mdi-arrow-collapse-up" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackToTop',

  data () {
    return {
      shouldShow: false,
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.shouldShow = window.scrollY > 500

      window.addEventListener(
        'scroll',
        (e) => {
          this.shouldShow = window.scrollY > 500
        },
        false,
      )
    })
  },

  methods: {
    onClick () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
})
</script>

<style scoped lang="scss">
$size: 42px;

.btn-back-to-top {
  position: fixed;
  right: 35px;
  bottom: 35px;
  z-index: 65535;
  display: flex;
  width: $size;
  height: $size;
  color: #fff;
  cursor: pointer;
  background: #1565c0;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  .iconfont {
    font-size: 23px;
  }
}
</style>
