// const path = require('path')
const fs = require('fs-extra')
const argv = require('yargs').argv
const yaml = require('yaml')
// eslint-disable-next-line
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

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

const mdContent = `---
${yaml.stringify(frontmatterData)}---`

// TODO: 生成文件
fs.writeFile(`./posts/${slugTitle}.md`, mdContent)
