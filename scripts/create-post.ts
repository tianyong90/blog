// import path from 'path'
// import fs from 'fs-extra'
import yargs from 'yargs'
// import matter from 'gray-matter'

// eslint-disable-next-line
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

const titleOptions: yargs.Options = {
  description: 'title',
  demand: true,
  alias: 't',
}

const argv = yargs
  .command('add', 'add TODO to database', {
    title: titleOptions,
  })
  .help('h').argv

// 标题
const title = yargs.argv

console.log(title)

// if (!title) {
//   throw new Error('标题不能为空')
// }

// // 标题空格转 -
// const slugTitle = title.replace(rControl, '').replace(rSpecial, '-')

// // 生成目录
// fs.mkdirp(`./posts/${slugTitle}`)

// const frontmatterData = {
//   title: title,
//   date: new Date()
//     .toISOString()
//     .replace(/T/, ' ')
//     .replace(/\..+/, ''),
//   top_img: '',
//   tags: [''],
//   categories: [''],
// }

// // 生成 front-matter yml 格式内容
// const mdContent = matter.stringify('', frontmatterData)

// console.log(mdContent)

// // 生成 markdown 文件
// fs.writeFile(`./posts/${slugTitle}.md`, mdContent)
