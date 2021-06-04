/*
 * @Author: jdeseva
 * @Date: 2021-06-04 14:12:16
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-04 16:28:17
 * @Description: CLI
 */

const ora = require('ora')
const path = require('path')
const spinner = ora()
const { copyTmpl, copyFileByGuard } = require('./util')

function init(cmdPath, option) {
  const { pathname, name, pname, username, version } = option

  // 处理模板文件
  const tempList = [
    { from: './template/gitignore.tmpl', to: '.gitignore' },
    { from: './template/package.json.tmpl', to: 'package.json' },
    { from: './template/gulpfile.js.tmpl', to: 'gulpfile.js' },
    { from: './template/nodemon.json.tmpl', to: 'nodemon.json' },
    { from: './template/prettierrc.json.tmpl', to: '.prettierrc.json' },
    { from: './template/README.md.tmpl', to: 'README.md' },
  ]

  tempList.forEach(({ from, to }) => {
    copyTmpl(
      path.resolve(__dirname, from),
      path.resolve(cmdPath, name, to),
      option
    )
  })

  // 处理文件夹
  const dirList = ['build', 'src', 'tests']

  dirList.forEach((p) => {
    copyFileByGuard(
      path.resolve(__dirname, '..', p),
      path.resolve(cmdPath, name, p)
    )
  })

  spinner.succeed('evamp create project successfully')
}

exports.init = init
