// const path = require('path')
const fs = require('fs-extra')
const argv = require('yargs').argv
// eslint-disable-next-line
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g
const matter = require('gray-matter')

// 标题
const title = argv._[0]

if (!title) {
  throw new Error('标题不能为空')
}

// 标题空格转 -
const slugTitle = title.replace(rControl, '').replace(rSpecial, '-')

// 生成目录
fs.mkdirp(`./posts/${slugTitle}`)

const frontmatterData = {
  title: title,
  date: new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, ''),
  top_img: '',
  tags: [''],
  categories: [''],
}

// 生成 front-matter yml 格式内容
const mdContent = matter.stringify('', frontmatterData)

console.log(mdContent)

// 生成 markdown 文件
fs.writeFile(`./posts/${slugTitle}.md`, mdContent)
