<template>
  <div class="section-title">
    <div class="text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.section-title {
  @apply text-gray-800 text-lg mt-4 mb-2 border-b;

  .text {
    @apply w-auto inline-block bg-teal-500 pl-4 pr-7 py-1 text-white;

    clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 100%, 0 100%);
  }
}
</style>
