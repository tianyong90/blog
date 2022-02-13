<template>
  <section>
    <SectionTitle>主要作品/案例</SectionTitle>

    <ul class="flex flex-col space-y-2 case-list">
      <li
        v-for="skill in cases"
        :key="skill.name"
        class="flex flex-row space-x-4"
      >
        <div
          class="text-right w-32"
          v-text="skill.name"
        />
      </li>
    </ul>
  </section>
</template>

<script>

// 编程语言技能栈
const cases = [
  {
    name: '云游敦煌',
    type: 'H5',
    description: 'asdf',
  },
]

export default {
  data () {
    return {
      cases,
    }
  },
}
</script>

<style scoped lang="scss">
.case-list {
  @apply space-y-3;

  .contact-item {
    @apply inline-flex flex-row items-center space-x-2;

    .social-icon {
      @apply inline-flex w-5 h-5 text-red-500;
    }
  }
}
</style>
