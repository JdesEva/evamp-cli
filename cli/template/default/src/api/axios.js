/*
 * @Author: jdeseva
 * @Date: 2021-06-15 17:26:13
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-15 17:28:37
 * @Description: Axios配置信息
 */

const { axios } = require('axios-for-mpweixin')

// 具体配置项请参看文档 https://github.com/JdesEva/Axios-For-WeixinApp

const Axios = axios()

Axios.interceptors.request.use(config => {
  return config
})

Axios.interceptors.response.use(response => {
  return response
}, err => Promise.reject(err))



module.exports = Axios
