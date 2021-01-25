/*
* 此文件用于 webstorm 配置，以便 webstorm 能识别 webpack 设置的路径别名
*/

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
}
