<template>
  <div>
    <div class="post-head-wrapper min-h-full">
      <div class="post-head" :style="{ backgroundImage: `url(${topImg})` }">
        <div class="post-info-lg">
          <h1 class="post-title" v-text="title" />
          <div class="post-date">{{ date | formatTime }}</div>
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-lg py-4">
      <div class="row post-info-sm">
        <div class="col-12">
          <h1 class="post-title" v-text="title" />
          <div class="post-date">{{ date | formatTime }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-10 col-xl-6 mx-auto">
          <div class="markdown-body" v-html="html" />
        </div>

        <div class="social-share"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import analyze from 'rgbaster'
import Color from 'color'
import { format } from 'date-fns'
// TODO:
// import 'social-share.js/dist/css/share.min.css'
// import SocialShare from 'social-share.js'

// interface options extends Vue {
//   tags: any
// }

export default Vue.extend({
  head() {
    return {
      title: (this as any).title,
      meta: [
        // TODO: any
        { hid: 'keywords', name: 'keywords', content: (this as any).tags.join(',') },
        // TODO: 关键词等
        { hid: 'description', name: 'description', content: '' },
      ],
    }
  },

  filters: {
    formatTime(val) {
      return format(new Date(val), 'YYYY-MM-DD')
    },
  },

  // TODO: 参数验证
  // validate({ params }) {
  //   return true
  // },

  data() {
    return {
      topImg: null,
    }
  },

  async asyncData({ params }) {
    const { default: posts } = await import('~/posts/posts.json')

    // 链接中拼音化的文件名
    const slugifiedFilename = params.slug

    const thePost: any = posts.find((item: any) => {
      return item.slugifiedFilename === slugifiedFilename
    })

    // posts 目录中 markdown 实际文件名
    const filename = thePost.filename

    const { html, attributes } = await import(`~/posts/${filename}.md`)

    let topImg
    // 顶部背景图
    if (attributes.top_img) {
      topImg = attributes.top_img.replace(/^\./, `/_nuxt/posts/${filename}`)
    }

    return {
      ...attributes,
      topImg,
      html: html.replace(/src="\.\//g, `src="/_nuxt/posts/${filename}/`), // markdown 内容中图片地址引用替换
    }
  },

  async mounted() {
    if (this.topImg) {
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
    }

    // TODO:
    // SocialShare('.social-share', {
    //   title: 'abc'
    // })
  },
})
</script>

<style scoped lang="scss">
.post-head {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 5vw), 0 100%);
}

// /*小屏幕下的标题区*/
// @include media-breakpoint-down(sm) {
//   .post-head {
//     clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 12vw));
//   }

//   .post-info-sm {
//     display: block;
//     margin-bottom: 2rem;

//     .post-title {
//       color: #333;
//       font-size: 1.4rem;
//       font-weight: 500;
//     }

//     .post-date {
//       font-size: 0.9rem;
//     }
//   }

//   .post-info-lg {
//     display: none;
//   }
// }

// @include media-breakpoint-up(md) {
//   .post-info-sm {
//     display: none;
//   }

//   .post-info-lg {
//     z-index: 10;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     .post-title {
//       text-align: center;
//       font-size: 2rem;
//       color: #fff;
//       text-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
//       text-align: left;
//     }

//     .post-date {
//       color: #fff;
//       font-weight: 400;
//       text-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
//       text-align: left;
//     }
//   }
// }

// .post-head-wrapper {
//   filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
// }

// .post-head {
//   display: flex;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//   justify-content: center;
//   align-items: center;
//   min-height: 300px;
//   position: relative;
//   flex-direction: column;
//   perspective: 1px;
//   perspective-origin: 0 0;
//   background-color: #fff;
//   background-blend-mode: multiply;
// }
</style>
