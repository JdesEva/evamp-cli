/*
 * @Author: jdeseva
 * @Date: 2021-06-04 14:12:16
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-08-24 19:03:10
 * @Description: CLI
 */

const ora = require('ora')
const path = require('path')
const spinner = ora()
const { mkdirSyncGuard } = require('./util')
const { Install } = require('./bin/install')
const { tgz } = require('compressing')

function init(cmdPath, option) {
  console.log(111, cmdPath, JSON.stringify(option))

  const { name, pathname, manager, template } = option

  mkdirSyncGuard(path.resolve(cmdPath, pathname))

  tgz
    .uncompress(
      path.resolve(__dirname, `./template/${template}.tgz`),
      path.resolve(cmdPath, pathname)
    )
    .then(() => {
      console.log('success')
      Install(cmdPath, name, option).then(() => {
        spinner.succeed('evamp create project successfully')
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

exports.init = init
