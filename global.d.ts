declare module 'vue/types/vue' {
  export interface Vue {
    $hello: string
  }
}

declare module 'blog/types' {
  export type Post = {
    filename: string
    slugifiedFilename: string
    title: string
    date: string
    /* eslint-disable-next-line */
    top_img: string
    tags: Array<string>
    categories: Array<string>
    description: string
    draft?: boolean
  }
}
