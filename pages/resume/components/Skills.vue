<template>
  <section>
    <div class="my-2">
      <SectionTitle>语言/框架技能栈</SectionTitle>

      <ul class="flex flex-col space-y-2">
        <li
          v-for="skill in programSkills"
          :key="skill.name"
          class="flex flex-row space-x-4"
        >
          <span
            class="text-right w-32"
            v-text="skill.name"
          />
          <StarRanking
            class="flex-1"
            :level="skill.level"
          />
        </li>
      </ul>
    </div>

    <div class="my-2">
      <SectionTitle>
        开发工具技能栈
      </SectionTitle>

      <ul class="flex flex-col space-y-2">
        <li
          v-for="skill in toolSkills"
          :key="skill.name"
          class="flex flex-row space-x-4"
        >
          <span
            class="text-right w-32"
            v-text="skill.name"
          />
          <star-ranking
            class="flex-1"
            :level="skill.level"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import StarRanking from './StarRanking.vue'

// 编程语言技能栈
const programSkills = [
  {
    name: 'JavaScript',
    level: 4,
  },
  {
    name: 'TypeScript',
    level: 3,
  },
  {
    name: 'Node.js',
    level: 3,
  },
  {
    name: 'Vue',
    level: 4,
  },
  {
    name: 'React',
    level: 2,
  },
  {
    name: 'HTML',
    level: 5,
  },
  {
    name: 'CSS3',
    level: 4,
  },
  {
    name: 'PHP',
    level: 2,
  },
  {
    name: 'Laravel',
    level: 3,
  },
  {
    name: 'Tailwind CSS',
    level: 6,
  },
]

// 软件技能栈
const toolSkills = [
  {
    name: 'WebStorm',
    level: 4,
  },
  {
    name: 'PhpStorm',
    level: 4,
  },
  {
    name: 'Vscode',
    level: 2,
  },
  {
    name: 'Docker',
    level: 3,
  },
  {
    name: 'PhotoShop',
    level: 3,
  },
]

export default {
  components: {
    StarRanking,
  },

  data () {
    return {
      programSkills,
      toolSkills,
    }
  },
}
</script>

<style scoped lang="scss">
.contact {
  @apply space-y-3;

  .contact-item {
    @apply inline-flex flex-row items-center space-x-2;

    .social-icon {
      @apply inline-flex w-5 h-5 text-red-500;
    }
  }
}
</style>
