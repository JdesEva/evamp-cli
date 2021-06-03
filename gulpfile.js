/*
 * @Author: jdeseva
 * @Date: 2021-06-02 11:30:07
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-03 16:29:31
 * @Description:
 */
const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const stripDebug = require('gulp-strip-debug')
const babel = require('gulp-babel')
const gulpIf = require('gulp-if')

const config = require('./build/config')

function mapSass() {
  return (
    src([
      './src/**/*.scss',
      '!**/node_modules{,/**}',
      '!**/miniprogram_npm{,/**}',
    ])
      .pipe(
        replace(/(@import.+;)/g, ($1, $2) => {
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
      .pipe(dest('./src'))
  )
}

// 格式化 wxss
function mapWxssToFormatter() {
  return (
    src([
      './src/**/*.wxss',
      '!**/node_modules{,/**}',
      '!**/miniprogram_npm{,/**}',
    ])
      .pipe(
        replace(/(@import.+;)/g, ($1, $2) => {
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
        rename({
          extname: '.wxss',
        })
      )
      .pipe(dest('./dist'))
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
    .pipe(gulpIf(!config.isDebug, babel({ presets: ['@babel/env'] })))
    .pipe(gulpIf(!config.isDebug, stripDebug()))
    .pipe(gulpIf(config.isZip, uglify()))
    .pipe(dest('./dist'))
}

if (process.env.NODE_ENV === 'production') {
  exports.build = series(mapSass, mapWxssToFormatter, copyFiles, copyJsByUglify)
} else {
  exports.build = series(mapSass)
}
