<template>
  <div class="flex space-x-3">
    <div class="info-panel">
      <div
        v-for="item in informations"
        :key="item.label"
        class="info-item"
      >
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>

    <img
      src="@/assets/image/avatar.jpg"
      class="rounded-md w-24 object-cover"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',

  data () {
    return {
      informations: [
        {
          label: '姓名',
          value: '田勇',
        },
        {
          label: '出生年月',
          value: '1990年3月16日',
        },
        {
          label: '民族',
          value: '土家',
        },
        {
          label: '学历',
          value: '本科',
        },
        {
          label: '求职意向',
          value: 'web 前端',
        },
        {
          label: '手机',
          value: '13227280978',
        },
        {
          label: '邮箱',
          value: '412039588@qq.com',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.info-panel {
  @apply flex flex-wrap flex-1;

  .info-item {
    @apply w-1/2;
  }

  .label {
    @apply inline-block mr-3;

    width: 4em !important;
    text-align-last: justify;

    /*&::after {
      content: ':';
    }*/
  }
}
</style>
