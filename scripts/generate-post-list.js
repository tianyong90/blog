const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')
const summarize = require('summarize-markdown')

const { slugify } = require('transliteration')

const list = fs.readdirSync(path.resolve(__dirname, '../posts'))

const posts = list.filter(item => item.endsWith('.md')).map(item => item.replace('.md', ''))

// 读取 md 文章 frontmatter 数组并组合
const jsonData = posts.map(post => {
  const { data, content } = matter.read(`./posts/${post}.md`)

  // console.log(frontMatterData)

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
