/*
 * @Author: jdeseva
 * @Date: 2021-08-23 17:13:56
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-08-24 20:09:19
 * @Description: 设置模板
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const ora = require('ora')


function saveTemplate({ registry, url }) {
  const spinner = ora()
  const extRegx = /[^\.]\w*$/

  const stream = fs.createWriteStream(path.resolve(__dirname, `../template/${registry}.${url.match(extRegx)[0]}`))

  request(url).pipe(stream).on('close', () => {
    spinner.succeed('The Template has downloaded successfully!')
  })
}

function getTemplate() {
  const dirList = (fs.readdirSync(path.resolve(__dirname, '../template')) || []).map(p => {
    return { template: p.substring(0, p.lastIndexOf('.')), filename: p}
  })
  console.log(
    dirList.reduce((prev, cur) => {
      return prev += `
     %c ${cur.template} %c ---------------  ${cur.filename}\n
      `
    }, '')
  )
}

exports.saveTemplate = saveTemplate

exports.getTemplate = getTemplate
