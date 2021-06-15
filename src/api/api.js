/**
 * 接口配置
 */

const axios = require('./axios')

module.exports = {
  getList(data) {
    return axios.get('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3904159454,1847928655&fm=26&gp=0.jpg')
  }
}