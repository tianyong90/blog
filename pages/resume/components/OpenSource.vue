<template>
  <section class="">
    <SectionTitle>
      开源经历
    </SectionTitle>

    <table
      v-if="repos.length"
      class="repo-table"
    >
      <tbody class="mt-4 overflow-scroll">
        <tr
          v-for="repo in repos"
          :key="repo.name"
          class="border-b border-gray-200"
        >
          <td class="px-2">
            <a
              :href="repo.url"
              target="_blank"
              v-text="repo.name"
            />
          </td>
          <td class="px-2 text-center">
            <span
              v-if="repo.languages.nodes.length > 0"
              class="lang-badge"
              :style="getLanguageTagStyle(repo.languages.nodes[0].color)"
            >{{ repo.languages.nodes[0].name }}</span>
          </td>
          <td class="px-2">
            <span class="flex justify-end items-center">
              {{ repo.stargazers.totalCount }}
              <i class="fas fa-star ml-1 text-xs text-gray-500" />
            </span>
          </td>
          <td class="px-2">
            <span class="flex justify-end items-center">
              {{ repo.forks.totalCount }}
              <i class="fas fa-code-branch ml-1 text-xs text-gray-500" />
            </span>
          </td>
          <td class="px-3 w-auto text-gray-700">
            {{ repo.description }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import repos from '@/assets/repos.json'
import Color from 'color'

export default {
  name: 'WorkExperience',

  data () {
    return {
      repos,
    }
  },

  mounted () {
    this.repos = repos.data.user.repositories.nodes
  },

  methods: {
    getLanguageTagStyle (color) {
      return {
        backgroundColor: color,
        color: Color(color.toString()).isDark() ? '#fff' : '#000', // 背景深色则文字白色，反之同理
      }
    },
  },
}
</script>

<style scoped lang="scss">
.repo-table {
  @apply w-full overflow-hidden;

  td {
    @apply px-2 py-1;
  }

  .lang-badge {
    @apply text-xs px-2 rounded-full;
  }
}
</style>
