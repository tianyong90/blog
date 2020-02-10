import path from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import summarize from 'summarize-markdown'
import { slugify } from 'transliteration'
import yargs from 'yargs'

const argv = yargs
  .command('new', 'create new post', {
    title: {
      description: 'post title',
      demand: true,
      alias: 't',
    },
  })
  .help('h').argv

const list = fs.readdirSync(path.resolve(__dirname, '../posts'))

const posts = list.filter(item => item.endsWith('.md')).map(item => item.replace('.md', ''))

// 读取 md 文章 frontmatter 数组并组合
const jsonData = posts.map(post => {
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
  }
})

// 写入 json
fs.writeJson('./posts/posts.json', jsonData, {
  spaces: 2,
})
