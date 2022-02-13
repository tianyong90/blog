<template>
  <section class="">
    <SectionTitle>
      开源经历
    </SectionTitle>

    <table
      v-if="repos.length"
      class="flex flex-col mt-4 max-w-full"
    >
      <tbody class="mt-4 overflow-scroll">
        <tr
          v-for="repo in repos"
          :key="repo.name"
          class="border-b-2 border-gray-200"
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
              class="text-xs px-1 rounded-lg"
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
.experience {
  @apply flex flex-col py-4;

  .experience-item {
    @apply inline-flex flex-row items-start relative pl-5 pb-5;

    .duration {
      @apply w-40;
    }

    .company-name {
      @apply text-lg text-gray-600 leading-none
      mb-2;
    }

    &::before {
      @apply absolute bg-teal-200;

      content: '';
      width: 1px;
      height: 100%;
      left: 5px;
      top: 0;
    }

    &::after {
      @apply absolute bg-teal-500 rounded-full;

      content: '';
      width: 10px;
      height: 10px;
      left: 0;
      top: 5px;
    }
  }
}
</style>
