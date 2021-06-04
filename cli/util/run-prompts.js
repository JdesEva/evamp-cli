/*
 * @Author: jdeseva
 * @Date: 2021-06-04 14:01:57
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-04 14:24:11
 * @Description:
 */
const inquirer = require('inquirer')

function prompts(promptList) {
  return new Promise(function (resolve) {
    return inquirer.prompt(promptList).then((answers) => {
      resolve(answers)
    })
  })
}

let promptList = []

function runInitPrompts(pathname, argv) {
  const { pname, username } = argv

  promptList.push({
    type: 'input',
    message: 'project name:',
    name: 'name',
    default: pathname,
    validate: function (val) {
      if (!val) {
        return 'Please enter name'
      }
      return true
    },
  })

  if (!pname) {
    promptList.push({
      type: 'input',
      message: 'publish to npm name:',
      name: 'pname',
      default: pathname,
      validate: function (val) {
        return true
      },
    })
  }
  if (!username) {
    promptList.push({
      type: 'input',
      message: 'github user name:',
      name: 'username',
      validate: function (val) {
        if (!val) {
          return 'Please enter name'
        }
        return true
      },
    })
  }

  return prompts(promptList)
}

exports.runInitPrompts = runInitPrompts
