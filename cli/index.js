/*
 * @Author: jdeseva
 * @Date: 2021-06-04 14:12:16
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-08-25 17:25:41
 * @Description: CLI
 */

const ora = require('ora')
const path = require('path')
const spinner = ora()
const { mkdirSyncGuard, copyFileByGuard, copyTmpl } = require('./util')
const { Install } = require('./bin/install')
const { tgz } = require('compressing')

function init(cmdPath, option) {

  const { name, pathname, manager, template } = option

  mkdirSyncGuard(path.resolve(cmdPath, pathname))

  if (template === 'default') {
    // 处理模板文件
    const tempList = [
      { from: './template/default/gitignore.tmpl', to: '.gitignore' },
      { from: './template/default/package.json.tmpl', to: 'package.json' },
      { from: './template/default/gulpfile.js', to: 'gulpfile.js' },
      { from: './template/default/nodemon.json.tmpl', to: 'nodemon.json' },
      { from: './template/default/prettierrc.json.tmpl', to: '.prettierrc.json' },
      { from: './template/default/README.md.tmpl', to: 'README.md' },
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
        path.resolve(__dirname, './template/default', p),
        path.resolve(cmdPath, name, p)
      )
    })
  } else {
    tgz
      .uncompress(
        path.resolve(__dirname, `./template/${template}.tgz`),
        path.resolve(cmdPath, pathname)
      )
      .then(() => {
        spinner.succeed('evamp create project successfully')
      })
      .catch((err) => {
        console.error(err)
      })
  }
  Install(cmdPath, name, option).then(() => {
    spinner.succeed('evamp Install node_modules successfully')
  })

}

exports.init = init
