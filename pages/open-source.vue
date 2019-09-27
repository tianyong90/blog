<template>
  <div class="container mx-auto">
    <transition-group name="list" tag="div" class="repo-list">
      <div
        v-for="repo in repos"
        :key="repo.name"
        class="shadow-md flex-col rounded-lg relative p-4 repo-list-item"
      >
        <a
          :href="repo.url"
          target="_blank"
          class="text-xl font-medium text-gray-800 no-underline"
          v-text="repo.name"
        ></a>
        <div class="text-sm font-light text-gray-700 py-3">{{ repo.description }}</div>

        <div class="absolute bottom-0 mb-4">
          <span
            v-if="repo.languages.nodes.length > 0"
            class="mr-3 text-white text-xs px-2 py-1 rounded-sm"
            :style="getLanguageTagStyle(repo.languages.nodes[0].color)"
            >{{ repo.languages.nodes[0].name }}</span
          >
          <span class="mr-3 text-gray-700 stars"
            ><span class="mdi mdi-star"></span> {{ repo.stargazers.totalCount }}</span
          >
          <span class="mr-3 text-gray-700 stforksars"
            ><span class="mdi mdi-directions-fork"></span> {{ repo.forks.totalCount }}</span
          >
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Color from 'color'

export default Vue.extend({
  head() {
    return {
      title: '开源',
    }
  },

  data() {
    return {
      repos: [],
    }
  },

  mounted() {
    ;(this as any).$axios.get('https://tianyong90.com/githubapi-data.json').then(res => {
      this.repos = res.data.data.user.repositories.nodes
    })
  },

  methods: {
    getLanguageTagStyle(color: string): object {
      return {
        backgroundColor: color,
        color: Color(color).isDark() ? '#fff' : '#000', // 背景深色则文字白色，反之同理
      }
    },
  },
})
</script>

<style scoped lang="scss">
.repo-list {
  display: grid;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(140px, auto);
  grid-gap: 1.5rem;

  &-item {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.65);
  }

  // 小于 1024px 两列
  @media screen and (max-width: 1024px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 640px) {
    & {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
