<template>
  <footer class="pt-6 pb-4 footer">
    <div class="container mx-auto">
      <p class="text-gray-100 text-center">
        @2019-2020 &hearts; tianyong90
      </p>
      <p class="text-gray-100 text-center text-sm">
        共 {{ postCount }} 篇文章 最后更新于 {{ updatedAt }}
      </p>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Footer',

  props: {
    postCount: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: String,
      default: '',
    },
  },
})
</script>
