<template>
  <div class="flex flex-col mt-4 contact">
    <div class="contact-item">
      <svg-icon
        name="resume/github"
        class="social-icon"
      />
      <div class="content">
        <a href="https://github.com/tianyong90">https://github.com/tianyong90</a>
      </div>
    </div>
    <div class="contact-item">
      <svg-icon
        name="resume/mobile"
        class="social-icon"
      />
      <div class="content">
        <a href="https://tianyong90.com/">https://tianyong90.com/</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
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
