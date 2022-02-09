<template>
  <div class="container max-w-6xl mx-auto">
    <div class="grid grid-cols-3 gap-6 my-10">
      <div
        v-for="repo in repos"
        :key="repo.id"
        class="flex flex-col bg-white shadow-md rounded-md p-4 repo-list-item"
      >
        <a
          :href="repo.url"
          target="_blank"
          class="text-xl font-semibold text-gray-600 no-underline"
          v-text="repo.name"
        />
        <div class="text-gray-600 my-4">
          {{ repo.description }}
        </div>

        <div class="flex flex-row mt-auto">
          <span
            v-if="repo.primaryLanguage"
            class="mr-3 px-2 font-bold border rounded-sm"
            :style="getLanguageTagStyle(repo.primaryLanguage.color)"
          >{{ repo.primaryLanguage.name }}</span>
          <div
            class="mr-3 text-gray-700 stars"
          >
            <span class="mdi mdi-star" /> {{ repo.stargazerCount }}
          </div>
          <div class="mr-3 text-gray-700 stforksars">
            <span class="mdi mdi-directions-fork" /> {{ repo.forkCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import Color from 'color'

export default Vue.extend({
  data () {
    return {
      repos: [],
    }
  },

  head () {
    return {
      title: '开源',
    }
  },

  mounted () {
    // github token, 仅有 repo 读取权限
    // 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

    this.$axios.post('https://api.github.com/graphql', {
      query: `
        query {
          viewer {
            repositories(first: 100, isFork: false, privacy: PUBLIC) {
              edges {
                node {
                  id,
                  name,
                  nameWithOwner,
                  url,
                  description,
                  stargazerCount,
                  forkCount,
                  primaryLanguage {
                    id,
                    name,
                    color
                  }
                }
              }
            }
          }
        }
      `,
    }, {
      headers: {
        Authorization: 'bearer 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',
      },
    }).then(({ data }) => {
      this.repos = data.data.viewer.repositories.edges.map(i => i.node)

      console.log(this.repos)
    })
  },

  methods: {
    getLanguageTagStyle (color) {
      return {
        borderColor: color,
        // color: Color(color).isDark() ? '#fff' : '#000' // 背景深色则文字白色，反之同理
        color: color,
      }
    },
  },
})
</script>
