const path = require('path')
const glob = require('glob')
const fs = require('fs')

const isProduction = process.env.NODE_ENV === 'production'

// 自定义不同模块的页面 title
const titleMap = {
  index: '首页',
  login: '登录页'
}

function getPages (globPath) {
  const pages = {}
  glob.sync(globPath).forEach((item) => {
    const stats = fs.statSync(item)
    if (stats.isDirectory()) {
      const basename = path.basename(item, path.extname(item))

      // 如果模块目录下有 index.html 则使用该文件为 html 模板文件
      const template = fs.existsSync(`${item}/index.html`)
        ? `${item}/index.html`
        : path.join(__dirname, '../index.html')

      pages[basename] = {
        entry: `${item}/main.js`,
        title: titleMap[basename] || '默认页面',
        template,
        // 这行代码很重要
        // 兼容开发和生产时 html 页面层级一致
        filename: isProduction ? 'index.html' : `${basename}/index.html`
      }
    }
  })
  return pages
}

const pages = getPages(path.join(__dirname, '../src/pages/*'))

module.exports = pages
