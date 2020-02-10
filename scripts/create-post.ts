import path from 'path'
import fs from 'fs-extra'
import yargs from 'yargs'
import matter from 'gray-matter'

const argv = yargs
  .command('new', 'create new post', {
    title: {
      description: 'post title',
      demand: true,
      alias: 't',
    },
  })
  .help('h').argv

if (argv[0] === 'new') {
  // 标题
  const title = argv.title as string

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

  // 生成 markdown 文件
  fs.writeFile(`./posts/${slugTitle}.md`, mdContent)

  console.info('新建成功')
}
