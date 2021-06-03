/*
 * @Author: jdeseva
 * @Date: 2021-06-02 11:36:51
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-03 16:30:39
 * @Description: 配置文件
 */
module.exports = {
  cssFilterFiles: ["./scss/var.scss"], // scss变量过滤
  isDebug: process.env.NODE_ENV !== 'production', // 调试模式 | false 会删除所有 console.log
  isZip: false // 是否压缩js代码
};
