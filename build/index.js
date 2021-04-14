const chalk = require('chalk')
const rimraf = require('rimraf')
const { sh } = require('tasksfile')

const PAGES = require('./pages')

// vue-cli-service --mode 值
const mode = process.env.MODE || 'prod'

// 模块名，可能为多个
const moduleNames = process.argv[2]

// 全部页面列表
const pageList = Object.keys(PAGES)

// 有效模块列表 未指定则为全部页面列表
const validPageList = moduleNames ? moduleNames.split(',').filter((item) => pageList.includes(item)) : pageList
if (!validPageList.length) {
  console.log(chalk.red('**模块名不正确**'))
  return
}

console.log(chalk.blue(`有效模块:${validPageList.join(',')}`))

// 删除 dist 目录
rimraf.sync('dist')

console.time('总编译时间')
const count = validPageList.length
let current = 0
// 逐个执行模块编译
for (let i = 0; i < validPageList.length; i += 1) {
  const moduleName = validPageList[i]
  process.env.MODULE_NAME = moduleName

  console.log(chalk.blue(`${moduleName} 模块开始编译`))

  // 通过 vue-cli-service build 编译
  sh(`vue-cli-service build --mode ${mode}`, { async: true }).then(() => {
    console.log(chalk.blue(`${moduleName} 模块编译完成`))
    console.log()
    current += 1
    if (current === count) {
      console.log(chalk.blue('-----全部模块编译完成-----'))
      console.timeEnd('总编译时间')
    }
  })
}
