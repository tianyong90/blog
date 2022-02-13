<template>
  <section class="">
    <SectionTitle>
      教育经历
    </SectionTitle>
    <ul>
      <li
        v-for="(item, index) in educations"
        :key="index"
        class="p-2"
      >
        {{ item.duration }}
        {{ item.name }}
      </li>
    </ul>
  </section>
</template>

<script>
// 教育经历
const educations = [
  {
    duration: '2009.9-2013.6',
    name: '湖北大学（物理学）',
  },
]

export default {
  name: 'WorkExperience',

  data () {
    return {
      educations,
    }
  },
}
</script>

<style scoped lang="scss">
</style>
