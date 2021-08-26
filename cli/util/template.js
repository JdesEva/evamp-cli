/*
 * @Author: jdeseva
 * @Date: 2021-08-23 17:13:56
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-08-25 17:26:02
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
  }).filter(p => p.template)

  console.log(
    dirList.reduce((prev, cur) => {
      return prev += `
     ${cur.template} ---------------  ${cur.filename}\n
      `
    }, '')
  )
}

exports.saveTemplate = saveTemplate

exports.getTemplate = getTemplate
