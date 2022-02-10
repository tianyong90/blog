<template>
  <div class="container flex flex-wrap p-0 mx-auto bg-gray-300 shadow-lg">
    <div
      class="bg-white w-full lg:w-1/3 xl:w-1/4 flex-column justify-center items-center px-8 py-4"
    >
      <div class="flex flex-col justify-center items-center py-4">
        <img
          src="@/assets/image/avatar.jpg"
          class="rounded-full w-24 h-24 object-cover"
          alt=""
        >

        <div class="text-center font-medium text-2xl mt-4">
          田勇
        </div>
        <div class="text-center font-medium text-base mt-1">
          WEB 前端
        </div>
      </div>

      <div class="my-2">
        <div class="text-gray-600 font-light text-lg mt-4 mb-2">
          语言/框架技能栈
        </div>

        <div
          v-for="skill in programSkills"
          :key="skill.name"
          class="flex flex-row justify-between item-center my-1"
        >
          <span
            class="text-left w-1/2"
            v-text="skill.name"
          />
          <StarRanking
            class="flex w-1/2"
            :level="skill.level"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-gray-600 font-light text-lg mt-4 mb-2">
          开发工具技能栈
        </div>

        <div
          v-for="skill in toolSkills"
          :key="skill.name"
          class="flex flex-row justify-between items-center my-1"
        >
          <span
            class="text-left w-1/2"
            v-text="skill.name"
          />
          <star-ranking
            class="flex w-1/2"
            :level="skill.level"
          />
        </div>
      </div>

      <div class="flex flex-col mt-4 contact">
        <div class="flex flex-row my-1">
          <i class="fas fa-mobile contact-icon" />
          <div class="content">
            13227280978
          </div>
        </div>
        <div class="flex flex-row my-1">
          <i class="fas fa-envelope contact-icon" />
          <div class="content">
            <a href="mailto:412039588@qq.com">412039588@qq.com</a>
          </div>
        </div>
        <div class="flex flex-row my-1">
          <i class="fab fa-qq contact-icon" />
          <div class="content">
            412039588
          </div>
        </div>
        <div class="flex flex-row my-1">
          <i class="fab fa-github contact-icon" />
          <div class="content">
            <a href="https://github.com/tianyong90">https://github.com/tianyong90</a>
          </div>
        </div>
        <div class="flex flex-row my-1">
          <i class="fas fa-link contact-icon" />
          <div class="content">
            <a href="https://tianyong90.com/">https://tianyong90.com/</a>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-auto lg:w-auto flex-1 flex flex-col p-0 lg:p-6">
      <section class="bg-white p-4 mb-4">
        <div class="text-lg font-light text-gray-600">
          工作经历
        </div>
        <ul class="experience">
          <li
            v-for="(item, index) in experiences"
            :key="index"
            class="flex flex-row p-2"
          >
            <span class="w-1/3 md:w-1/6 duration">{{ item.duration }}</span>
            <div class="flex flex-1 flex-col">
              <span class="text-lg text-gray-600">{{ item.title }}</span>
              <span class="text-xs company-name">{{ item.company }}</span>
              <p class="text-sm">
                {{ item.description }}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section class="bg-white p-4 mb-4">
        <div class="text-lg font-light text-gray-600">
          教育经历
        </div>
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

      <section class="bg-white p-4 mb-4">
        <div class="text-lg font-light text-gray-600">
          开源经历
        </div>

        <table class="flex flex-col mt-4 max-w-full">
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
    </div>
  </div>
</template>

<script lang="ts">
import repos from '@/assets/repos.json'
import Color from 'color'

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
    name: 'PhotoShop',
    level: 3,
  },
]

// 教育经历
const educations = [
  {
    duration: '2009.9-2013.6',
    name: '湖北大学（物理学）',
  },
]

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
]

export default {
  data () {
    return {
      programSkills,
      toolSkills,
      educations,
      experiences,
      repos: [],
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

<style lang="scss">
@import '~@/assets/scss/variables';

.contact {
  .contact-icon {
    display: flex;
    width: 30px;
    height: 30px;
    color: #fff;
    background-color: $color-primary;
    border-radius: 50vw;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }
}

.experience {
  .duration {
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;

    &::after {
      content: '';
      display: flex;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: $color-primary;
      border: 2px solid $color-primary;
      border-spacing: 5px;
    }
  }

  .company-name {
    color: $color-primary;
  }
}
</style>
