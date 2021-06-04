#!/usr/bin/env node

const yargs = require('yargs')

const { log } = require('../util')
const { runInitPrompts } = require('../util/run-prompts')
const { init } = require('./init')

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
    },
    function (argv) {
      runInitPrompts(argv._[1], yargs.argv).then(function (answers) {
        init(argv, answers)
      })
    }
  )
  .demandCommand()
  .help('info')
  .epilog('copyright 2021-2022').argv
