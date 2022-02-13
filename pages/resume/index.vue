<template>
  <div class="container flex flex-col max-w-4xl p-10 my-10 mx-auto bg-white shadow-md resume">
    <h1 class="font-medium text-2xl text-center">
      个人简历
    </h1>

    <BasicInfo />
    <Contact />
    <Education />
    <WorkExperience />
    <Skills />
    <OpenSource />
  </div>
</template>

<script lang="ts">
import BasicInfo from './components/BasicInfo.vue'
import Contact from './components/Contact.vue'
import WorkExperience from './components/WorkExperience.vue'
import Skills from './components/Skills.vue'
import Education from './components/Education.vue'
import OpenSource from './components/OpenSource.vue'

export default {
  components: {
    BasicInfo,
    Contact,
    WorkExperience,
    Skills,
    Education,
    OpenSource,
  },

  layout: 'basic',

  data () {
    return {
    }
  },
  head () {
    return {
      title: '田勇--个人简历',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '田写，田勇的博客，tianyong90,田较瘦' },
        {
          hid: 'description',
          name: 'description',
          content: '田勇的个人博客，技术、分享、生活及其它',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables';

.resume {
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
