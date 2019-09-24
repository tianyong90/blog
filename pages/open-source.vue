<template>
  <div class="flex flex-row flex-wrap justify-between max-w-4xl mx-auto my-4">
    <div
      v-for="(repo, index) in repos"
      :key="index"
      class="flex mb-4 shadow-md sm:flex-col rounded-sm repo-item"
    >
      <a
        :href="repo.url"
        target="_blank"
        class="text-2xl font-medium text-gray-800 no-underline"
        v-text="repo.name"
      ></a>
      <p class="text-sm font-light text-gray-700">{{ repo.description }}</p>

      <div>
        <span
          v-if="repo.languages.nodes.length > 0"
          class="mr-3 text-white text-xs px-2 py-1 rounded-sm"
          :style="{ backgroundColor: repo.languages.nodes[0].color }"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: '开源',
    }
  },

  async asyncData() {
    const githubApiData = await import('../assets/githubapi-data.json')

    return {
      repos: githubApiData.data.user.repositories.nodes,
    }
  },

  mounted() {},
})
</script>

<style scoped lang="scss">
.repo-item {
  flex-basis: calc(50% - 3rem);
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.65);
}
</style>
