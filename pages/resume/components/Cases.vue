<template>
  <section>
    <SectionTitle>主要作品/案例</SectionTitle>

    <ul class="case-list">
      <li
        v-for="item in cases"
        :key="item.name"
        class="case-item"
      >
        <div class="inline-flex flex-col flex-1">
          <div
            class="name"
          >
            <span class="type-badge">{{ item.type }}</span>

            {{ item.name }}
          </div>
          <a
            target="_blank"
            :href="item.url"
          >{{ item.url }}</a>
        </div>

        <img
          v-if="item.qrcode"
          :src="item.qrcode"
          class="qrcode"
        >
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
interface Case {
  name: string
  type: string
  url?: string
  qrcode?: any
}

// 编程语言技能栈
const cases: Array<Case> = [
  {
    name: '云游敦煌',
    type: '微信小程序 H5',
    qrcode: require('@/assets/image/resume/dunhuang.jpg'),
  },
  {
    name: '佛山新材料研究院官网',
    type: '网站',
    url: 'https://fscinm.com',
    qrcode: require('@/assets/image/resume/qrcode-fscinm.png'),
  },
  {
    name: '佛山新材料研究院官网后台',
    type: '网站后台',
  },
  {
    name: '昆山全民阅读',
    type: '微信公众号 H5',
    url: 'https://qmyd.byoobyoo.com/',
    qrcode: require('@/assets/image/resume/qrcode-qmyd.png'),
  },
  {
    name: '夜享昆山-手绘地图',
    type: 'H5',
    url: 'https://kunshan.byoobyoo.com/',
    qrcode: require('@/assets/image/resume/qrcode-kunshan.png'),
  },
  {
    name: 'improvecn.com',
    type: '网站',
    url: 'https://www.improvecn.com',
    qrcode: require('@/assets/image/resume/qrcode-improvecn.png'),
  },
  {
    name: '追梦筹',
    type: 'H5',
    url: 'https://crowd.dreamore.com/h5/',
    qrcode: require('@/assets/image/resume/qrcode-dreamore.png'),
  },
  {
    name: '牛大吉小程序',
    type: '小程序',
    qrcode: require('@/assets/image/resume/niudaji.jpg'),
  },
  {
    name: '牛大吉合作伙伴中心',
    type: '网站 后台',
    url: 'https://partner.niudaji.com',
  },
  {
    name: '牛大吉小程序管理后台',
    type: '网站 后台',
    url: 'https://partner.niudaji.com',
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
  @apply flex flex-col space-y-2 divide-y divide-gray-200 mt-4;

  .case-item {
    @apply inline-flex flex-row items-center py-4 ;

    .name {
      @apply font-medium text-lg mb-2;
    }

    .type-badge {
      @apply self-start rounded-full text-xs font-bold text-white text-center bg-teal-400 w-auto inline px-3 py-1;
    }

    .qrcode {
      @apply w-20 h-20;
    }
  }
}
</style>
