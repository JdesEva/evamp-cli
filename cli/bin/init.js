/*
 * @Author: jdeseva
 * @Date: 2021-06-04 14:07:17
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-07 09:16:58
 * @Description: Init
 */

const fs = require('fs')
const path = require('path')

const pkg = require('../../package.json')
const cli = require('../index')

function init(argv, answers) {
  const cmdPath = process.cwd()
  const { name, pname, username, manager } = Object.assign({}, argv, answers)
  const pathname = String(typeof argv._[1] !== 'undefined' ? argv._[1] : name)
  const options = {
    pathname,
    manager,
    name: String(name), //项目名称
    pname: String(pname), // npm package name
    username: String(username), // author
    version: String(pkg.version),
  }

  // 运行命令
  if (!pathname) {
    console.error('error: evamp create need name')
    return
  }
  // 覆写 文件夹已经存在操作
  if(fs.existsSync(path.join(cmdPath, name)) && !argv.force) {
    console.error('error: The project is already existed! If you really want to override it, use --force argv to bootstrap!');
    return
  }

  cli.init(cmdPath, options)
}

exports.init = init
