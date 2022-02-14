<template>
  <section class="">
    <SectionTitle>
      工作经历
    </SectionTitle>

    <ul class="experience">
      <li
        v-for="(item, index) in experiences"
        :key="index"
        class="experience-item"
      >
        <div class="duration">
          {{ item.duration }}
        </div>
        <div class="flex flex-1 flex-col">
          <span class="company-name">{{ item.company }}</span>
          <span class="mb-2 text-xs">{{ item.title }}</span>
          <p class="text-sm">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const experiences = [
  {
    duration: '2013.8-2014.10',
    title: 'web 研发',
    company: '湖北宜昌优石网络科技有限公司',
    description:
      '负责公司各项 web 网站项目开发，其中包括三峡大学经济与管理学院官网（http://jg.ctgu.edu.cn/）',
  },
  {
    duration: '2014.11-2016.3',
    title: 'PHP 研发，微信平台开发',
    company: '湖北纳新网络科技有限公司',
    description:
      '参与公司主力产品“纳客会员管理系统”开发（https://www.nakevip.com/），主要负责系统微信公众号平台（订阅号与服务号）开发及 API 对接。完成多次产品订制、升级任务。',
  },
  {
    duration: '2016.4-2020.3',
    title: 'web 前端，Laravel 研发',
    company: '深圳市一种新科技有限公司',
    description:
      '设计和开发微信服务号“随手编”各项功能，负责相关 API 和前端页面编写，期间完成三次重构改版。负责公司其它外包业务研发。',
  },
  {
    duration: '2020.7-2022.3',
    title: '前端工程师',
    company: '佛山（华南）新材料研究院',
    description:
      '负责研究院官网(https://fscinm.com)开发<br/>负责其它外包项目的研发，如牛大吉小程序',
  },
]

export default {
  name: 'WorkExperience',

  data () {
    return {
      experiences,
    }
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

      top: 0;
      left: 5px;
      width: 1px;
      height: 100%;
      content: '';
    }

    &::after {
      @apply absolute bg-teal-500 rounded-full;

      top: 5px;
      left: 0;
      width: 10px;
      height: 10px;
      content: '';
    }
  }
}
</style>
