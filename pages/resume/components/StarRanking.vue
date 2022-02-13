<template>
  <div class="ranking">
    <svg-icon
      v-for="i of 5"
      :key="i"
      class="ranking-star"
      :name="getSvgName(i)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'StarRanking',
  props: {
    level: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    getSvgName (i) {
      if (i <= this.level) {
        return 'resume/star-fill'
      } else {
        return 'resume/star'
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/assets/scss/variables';

.ranking {
  @apply inline-flex items-center space-x-1;

  .ranking-star {
    @apply w-4 h-4 text-teal-500;
  }
}
</style>
