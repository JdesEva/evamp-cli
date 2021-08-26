#!/usr/bin/env node

const yargs = require('yargs')

const { log } = require('../util')
const { runInitPrompts } = require('../util/run-prompts')
const { init } = require('./init')
const { getTemplate, saveTemplate } = require('../util/template')

log()

yargs
  .usage('usage: evamp [options]')
  .usage('usage: evamp <command> [options]')
  .example('evamp new project', '新建一个项目')
  .alias('h', 'help')
  .alias('v', 'version')
  .command(
    ['new', 'n'],
    '新建一个项目',
    function (Yargs) {
      return Yargs.option('force', { alias: 'f', describe: '强制新建' })
        .option('pname', { alias: 'n', describe: '项目名称' })
        .option('username', { alias: 'n', describe: '作者' })
        .option('manager', { alias: 'm', describe: '选择仓库包管理方式' })
    },
    function (argv) {
      runInitPrompts(argv._[1], yargs.argv).then(function (answers) {
        init(argv, answers)
      })
    }
  )
  .command(['add'], '新增一个模板', Function.prototype, function (argv) {
    saveTemplate({ registry: argv._[1], url: argv._[2] })
  })
  .command(['list'], '查看所有模板',Function.prototype, function (argv) {
    getTemplate()
  })
  .demandCommand()
  .help('info')
  .epilog('copyright 2021-2022').argv
