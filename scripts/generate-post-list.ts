import path from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import summarize from 'summarize-markdown'
import { slugify } from 'transliteration'
import yargs from 'yargs'
import dayjs from 'dayjs'
// import { Post } from 'blog/types'

const args = yargs.option('production', {
  boolean: true,
  default: false,
  alias: 'p',
}).argv

// 读取 posts 目录下文件及文件夹列表
const list = fs.readdirSync(path.resolve(__dirname, '../posts'))

// 过滤取出 md 文件列表
const posts = list.filter(item => item.endsWith('.md')).map(item => item.replace('.md', ''))

// 读取 md 文章 frontmatter 数组并组合
const jsonData: Array<any> = posts
  .map(post => {
    const { data, content } = matter.read(`./posts/${post}.md`)

    const slugifiedFilename = slugify(data.title, {
      trim: true,
      replace: {
        '——': '-',
      },
    })

    return {
      filename: post,
      slugifiedFilename,
      ...data,
      description: summarize(content).substr(0, 60),
    } as any
  })
  .filter(item => {
    if (args.production) {
      // 过滤博客草稿草稿
      return !item!.draft
    }

    return true
  })

// 写入 json
fs.writeJson('./posts/posts.json', jsonData, {
  spaces: 2,
})

// metaData
const metaData = {
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

fs.writeJson('./posts/meta.json', metaData, {
  spaces: 2,
})
