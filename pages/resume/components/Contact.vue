<template>
  <div class="flex flex-col mt-4 contact">
    <div class="contact-item">
      <svg-icon
        name="resume/github"
        class="social-icon"
      />
      <div class="content">
        <a
          title="github"
          href="https://github.com/tianyong90"
        >https://github.com/tianyong90</a>
      </div>
    </div>
    <div class="contact-item">
      <svg-icon
        name="resume/blog"
        class="social-icon"
      />
      <div class="content">
        <a
          href="https://tianyong90.com/"
          title="个人博客"
        >https://tianyong90.com/</a>
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
  @apply flex flex-row flex-wrap py-2;

  .contact-item {
    @apply w-1/2 inline-flex flex-row items-center;

    .social-icon {
      @apply inline-flex w-5 h-5 text-teal-500 mr-2;
    }
  }
}
</style>
