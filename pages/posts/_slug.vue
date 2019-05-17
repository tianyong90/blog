<template>
  <div>
    <div class="post-head-wrapper">
      <div class="post-head" :style="{ backgroundImage: `url(${topImg})` }">
        <h1 class="post-title" v-text="title" />
        <div class="post-date">{{ date }}</div>
      </div>
    </div>

    <div class="container-fluid py-4">
      <!--TODO-->
      <h1 class="fa fa-home"></h1>

      <div class="row">
        <div class="col-xs-12 col-md-10 col-xl-6 mx-auto">
          <div class="markdown-body" v-html="html" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import analyze from 'rgbaster'
import Color from 'color'

export default Vue.extend({
  validate({ params }) {
    // TODO: 参数验证
    return true
  },

  data() {
    return {
      topImg: null,
    }
  },

  async asyncData({ params }) {
    const markdownFileName = params.slug

    const fileContent = await import(`~/posts/${markdownFileName}.md`)

    const attrs = fileContent.attributes

    // console.log(fileContent)

    // markdown 内容中图片地址引用替换
    const html = fileContent.html.replace(/src="\.\//g, `src="/_nuxt/posts/${markdownFileName}/`)

    let topImg
    // 顶部背景图
    if (attrs.top_img) {
      topImg = attrs.top_img.replace(/^\./, `/_nuxt/posts/${markdownFileName}`)
    }

    return {
      ...attrs,
      topImg,
      html,
    }
  },

  async mounted() {
    // 取出头部图片主色调
    const result = await analyze(this.topImg, {
      ignore: ['rgba(255, 255, 255)', 'rgba(0, 0, 0)'],
      scale: 0.6,
    })
    const mainColor = result[0].color

    // 主色调使用透明度后设置为半透明遮罩
    const coverColor = Color(mainColor)
      .alpha(0.65)
      .string()
    ;(document.styleSheets[0] as any).addRule('.post-head::before', `background: ${coverColor}`)
  },
})
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/bootstrap-grid';

@include media-breakpoint-down(md) {
  .post-head {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 5vw), 0 100%);
  }
}

@include media-breakpoint-down(sm) {
  .post-head {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 12vw));
  }
}

.post-head-wrapper {
  filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
}

.post-head {
  display: flex;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  position: relative;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .post-title {
    display: block;
    text-align: center;
    font-size: 2rem;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
  }

  .post-date {
    color: #fff;
    font-weight: 400;
    text-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
    z-index: 10;
  }
}
</style>
