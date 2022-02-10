<template>
  <div class="ranking">
    <span
      v-for="i of 5"
      :key="i"
      class="ranking-star"
      :class="getClass(i)"
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
    getClass (i) {
      if (i <= this.level) {
        return 'fas fa-star'
      } else {
        return 'far fa-star'
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/assets/scss/variables';

.ranking {
  display: flex;
  justify-content: center;
  align-items: center;

  .ranking-star {
    font-size: 12px;
    color: $color-primary;
    margin: 0 1px;
  }
}
</style>
