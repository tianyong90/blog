"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const gray_matter_1 = tslib_1.__importDefault(require("gray-matter"));
const argv = yargs_1.default
    .command('new', 'create new post', {
    title: {
        description: 'post title',
        demand: true,
        alias: 't',
    },
})
    .help('h').argv;
if (argv._[0] === 'new') {
    // 标题
    const title = argv.title;
    if (!title) {
        throw new Error('标题不能为空');
    }
    // eslint-disable-next-line
    const rControl = /[\u0000-\u001f]/g;
    const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
    // 标题空格转 -
    const slugTitle = title.replace(rControl, '').replace(rSpecial, '-');
    // 生成目录
    fs_extra_1.default.mkdirp(`./posts/${slugTitle}`);
    const frontmatterData = {
        title,
        date: new Date()
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, ''),
        top_img: '',
        tags: [''],
        categories: [''],
    };
    // 生成 front-matter yml 格式内容
    const mdContent = gray_matter_1.default.stringify('', frontmatterData);
    // 生成 markdown 文件
    fs_extra_1.default.writeFile(`./posts/${slugTitle}.md`, mdContent);
    console.info('新建成功');
}
