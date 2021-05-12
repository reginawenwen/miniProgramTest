import { baseUrl } from './publicData'
export default function reqeust(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + params.url,
      method: params.method || 'get',
      data: params.data || {},
      success: resolve,
      fail: reject
    })
  })
}