const path = require('path')
const ora = require('ora')
const { exec } = require('child_process')

/**
 * 安装npm
 * @param {string} cmdPath cmd路径
 * @param {string} name 项目名称
 * @param {object} options 参数
 * @returns
 */
function Install(cmdPath, name, option) {
  const { manager } = option

  if (!manager) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const spinner = ora()
    spinner.start('Installing packages from npm, wait for a second...')
    exec(
      `${manager} install`,
      {
        cwd: path.resolve(cmdPath, name),
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(`安装依赖失败: ${error}`)
          return
        }
        spinner.succeed('Install packages successfully!')
        resolve()
      }
    )
  })
}

module.exports = { Install }
