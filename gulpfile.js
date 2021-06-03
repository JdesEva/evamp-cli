/*
 * @Author: jdeseva
 * @Date: 2021-06-02 11:30:07
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-03 09:59:22
 * @Description:
 */
const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const tap = require('gulp-tap')
const path = require('path')
const uglify = require('gulp-uglify')

const config = require('./build/config')

function mapSass() {
  return (
    src(['./src/**/*.{scss,wxss}', '!**/node_modules{,/**}', '!**/miniprogram_npm{,/**}'])
      .pipe(
        replace(/(@import.+;)/g, ($1, $2) => {
          console.log(111, $1, $2)
          const hasFilter = config.cssFilterFiles.some(
            (p) => $1.indexOf(p) > -1
          )
          if (hasFilter) return $2
          return `/** ${$2} **/`
        })
      )
      // compressed
      .pipe(sass.sync({ outputStyle: 'compact' }).on('error', sass.logError))
      .pipe(
        replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) =>
          $3.replace(/\.scss/g, '.wxss')
        )
      )
      .pipe(
        rename({
          extname: '.wxss',
        })
      )
      .pipe(dest(process.env.NODE_ENV === 'production' ? './dist' : './src'))
  )
}

// 复制文件
function copyFiles() {
  return src([
    './src/**/*.{png,jpg,json,wxs,wxml,gitignore}',
    '!**/miniprogram_npm{,/**}',
    '!**/node_modules{,/**}',
    '!./nodemon.json',
    '!**/scss{,/**}',
    '!./package.json',
    '!./package-lock.json',
  ]).pipe(dest('./dist'))
}

// 处理 js
function copyJsByUglify() {
  return src([
    './src/**/*.js',
    '!**/miniprogram_npm{,/**}',
    '!**/node_modules{,/**}',
    '!./gulpfile.js',
    '!**/build{,/**}',
  ])
    .pipe(uglify()) // 压缩js
    .pipe(dest('./dist'))
}

if (process.env.NODE_ENV === 'production') {
  exports.build = series(mapSass, copyFiles, copyJsByUglify)
} else {
  exports.build = series(mapSass)
}
