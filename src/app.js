/*
 * @Author: jdeseva
 * @Date: 2021-06-03 08:59:20
 * @LastEditors: jdeseva
 * @LastEditTime: 2021-06-15 17:27:00
 * @Description: app.js
 */
const Api = require('./api/api')

//app.js
App({
  onLaunch: function () {
    wx.api = Api
    wx.Toast = function (message, callback = null) {
      wx.showToast({
        title: message,
        icon: 'none',
        mask: true,
        duration: 2000,
        success: () => {
          if (callback) callback()
        },
      })
    }

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
})
