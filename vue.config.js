const chalk = require('chalk')

const devModuleList = require('./build/dev-modules')

const isProduction = process.env.NODE_ENV === 'production'

// 总的页面
const PAGES = require('./build/pages')

for (const basename in PAGES) {
  if (Object.prototype.hasOwnProperty.call(PAGES, basename)) {
    PAGES[basename].chunks = [
      'chunk-vue',
      'chunk-vendors',
      'chunk-common',
      `${basename}`
    ]
  }
}

let pages = {}
const moduleName = process.env.MODULE_NAME

if (isProduction) {
  // 构建模块的名称
  if (!PAGES[moduleName]) {
    console.log(chalk.red('**模块名不正确**'))
    return
  }
  pages[moduleName] = PAGES[moduleName]
} else {
  // 本地开发编译的模块
  // 编译全部
  if (process.env.DEV_MODULE === 'all') {
    pages = PAGES
  } else {
    // 编译部分模块
    const moduleList = [
      // 固定编译的模块
      'index',
      'login',
      // 自定义编译的模块
      ...devModuleList
    ]
    moduleList.forEach(item => {
      pages[item] = PAGES[item]
    })
  }
}

module.exports = {
  // 这行代码很重要
  publicPath: isProduction ? './' : '/',
  pages,
  // 这行代码很重要
  outputDir: isProduction ? `dist/${moduleName}` : 'dist',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {
        vue: {
          name: 'chunk-vue',
          test: /[\\/]node_modules[\\/]_?(vue|vue-router|vuex|element-ui)(@.*)?[\\/]/,
          priority: -1,
          chunks: 'initial'
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  }
}
