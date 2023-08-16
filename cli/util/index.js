const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const template = require('template_js')

/**
 * 递归创建目录
 * @param {string} target path
 */
function mkdirSyncGuard(target) {
  try {
    fs.mkdirSync(target, { recursive: true })
  } catch (e) {
    mkdirp(target)
    function mkdirp(dir) {
      if (fs.existsSync(dir)) {
        return true
      }
      const dirname = path.dirname(dir)
      mkdirp(dirname)
      fs.mkdirSync(dir)
    }
  }
}

/**
 * 日志输出
 */
function log() {
  const red = chalk.red
  const green = chalk.greenBright
  const blue = chalk.blue

  const error = console.error
  const log = console.log
  const info = console.info

  console.error = function () {
    error(red.apply(console, arguments))
  }

  console.log = function () {
    log(green.apply(console, arguments))
  }

  console.info = function () {
    info(blue.apply(console, arguments))
  }
}

/**
 * 复制文件
 * @param {string} from 来源
 * @param {string} to 目标
 */
function copyFile(from, to) {
  const buffer = fs.readFileSync(from)
  const parentPath = path.dirname(to)

  if (!fs.existsSync(parentPath)) {
    mkdirSyncGuard(parentPath)
  }

  fs.writeFileSync(to, buffer)
}

/**
 * 读模板
 * @param {string} from 来源
 * @param {object} data 数据
 * @returns
 */
function readTmpl(from, data = {}) {
  const text = fs.readFileSync(from, { encoding: 'utf8' })
  return template(text, data)
}

/**
 * 复制模板
 * @param {string} from 来源
 * @param {string} to 目标
 * @param {object} data 数据
 * @returns
 */
function copyTmpl(from, to, data = {}) {
  if (!isTemplate(from)) {
    return copyFile(from, to)
  }

  const parentPath = path.dirname(to)

  mkdirSyncGuard(parentPath)

  fs.writeFileSync(to, readTmpl(from, data), { encoding: 'utf8' })
}

function isTemplate(pathname) {
  return path.extname(pathname) === '.tmpl'
}

/**
 * 递归复制整个文件夹
 * @param {string} from 来源
 * @param {string} to 目标
 */
function copyFileByGuard(from, to) {
  mkdirSyncGuard(to) // 检查一下目录是否存在 不存在则直接创建 存在则跳过

  const paths = fs.readdirSync(from)
  
  paths.forEach((p) => {
    const sourceDest = path.resolve(from, p)
    const toDest = path.resolve(to, p)
    fs.stat(sourceDest, (err, stats) => {
      if (err) throw err
      // 文件 则拷贝文件
      if (stats.isFile()) {
        const readStream = fs.createReadStream(sourceDest)
        const writeStream = fs.createWriteStream(toDest)
        readStream.pipe(writeStream)
      } else {
        // 目录 递归
        return copyFileByGuard(sourceDest, toDest)
      }
    })
  })
}

/**
 * 复制文件
 * @param {string} from 来源
 * @param {string} to 目标
 */
function copyFileByStream(from, to) {
  const readStream = fs.createReadStream(from)
  const writeStream = fs.createWriteStream(to)
  readStream.pipe(writeStream)
}

exports.mkdirSyncGuard = mkdirSyncGuard
exports.log = log
exports.copyFile = copyFile
exports.readTmpl = readTmpl
exports.copyTmpl = copyTmpl
exports.copyFileByGuard = copyFileByGuard
exports.copyFileByStream = copyFileByStream
