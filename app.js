// app.js
import { wenwenlogin } from 'request/getIndexData'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          wenwenlogin({code: res.code}).then(res => {
            console.log(res)
          })
          // wx.request({
          //   url: 'https://example.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
