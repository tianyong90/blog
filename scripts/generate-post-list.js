const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')

const list = fs.readdirSync(path.resolve(__dirname, '../posts'))

const posts = list
  .filter(item => item.endsWith('.md'))
  .map(item => item.replace('.md', ''))

// 读取 md 文章 frontmatter 数组并组合
const jsonData = posts.map(post => {
  console.log(post)
  const frontMatterData = matter.read(`./posts/${post}.md`)

  return {
    file: post,
    ...frontMatterData.data,
  }
})

// 写入 json
fs.writeJson('./posts/posts.json', jsonData, {
  spaces: 2,
})
