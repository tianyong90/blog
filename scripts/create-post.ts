import path from 'path'
import fs from 'fs-extra'
import yargs from 'yargs'
import matter from 'gray-matter'
import dayjs from 'dayjs'

const args = yargs
  .option('title', {
    string: true,
    demand: true,
    description: '标题',
    alias: 't',
  })
  .option('draft', {
    boolean: true,
    default: true,
    description: '是否作为草稿',
    alias: 'd',
  }).argv

const { title, draft } = args

if (!title) {
  throw new Error('标题不能为空')
}

// eslint-disable-next-line
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

// 标题空格转 -
const slugTitle = title.replace(rControl, '').replace(rSpecial, '-')

// 生成目录
fs.mkdirp(`./posts/${slugTitle}`)

const frontmatterData = {
  title,
  date: dayjs().format('YYYY-MM-dd HH:mm:ss'),
  top_img: './top_img.png',
  tags: [''],
  categories: [''],
  draft,
}

// 生成 front-matter yml 格式内容
const mdContent = matter.stringify('', frontmatterData)

// 生成 markdown 文件
fs.writeFile(`./posts/${slugTitle}.md`, mdContent)

console.info('新建成功')
