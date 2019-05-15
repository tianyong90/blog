<template>
  <section class="container">
    <div class="grids">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
    </div>

    <div class="flexes">
      <div class="flex-item special">1</div>
      <div class="flex-item">2</div>
      <div class="flex-item">3</div>
      <div class="flex-item">4</div>
      <div class="flex-item">5</div>
      <div class="flex-item">6</div>
      <div class="flex-item">7</div>
      <div class="flex-item">8</div>
      <div class="flex-item">9</div>
      <div class="flex-item">10</div>
    </div>

    <div>
      <nuxt-link to="posts">post list</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},

  data() {
    return {
      msg: 'hello',
    }
  },

  async asyncData(app) {},
})
</script>

<style scoped lang="scss">
.grids {
  display: grid;
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-color: #f00;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  .grid-item {
    background-color: #ff0;
    font-size: 2rem;
    color: #000;
    text-align: center;

    &:nth-child(1) {
      grid-row: 1 / 3;
      grid-column: 1;
    }

    &:nth-child(4) {
      grid-row: 2 / 4;
      grid-column: 2 / 4;
    }
  }
}

.flexes {
  display: flex;
  background-color: #00f;
  margin-top: 100px;
  flex-wrap: wrap;
  margin: -10px;
  justify-content: space-between;

  .flex-item {
    min-height: 100px;
    background-color: #0f0;
    flex: 0 0 calc(33.33% - 10px);
    text-align: center;
    font-size: 2rem;
    color: #000;
    margin-bottom: 10px;

    &.special {
      height: 300px;
    }
  }
}
</style>
