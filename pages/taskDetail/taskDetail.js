// pages/taskDetail/taskDetail.js
import { taskdetail,configList } from '../../request/getIndexData'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskContent:{},
    API_HOST:'http://ocn.bearhunting.cn:9001/'
  },
   back(){
    wx.navigateBack({
      delta: 1
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    configList().then(res=>{
      this.setData({
        API_HOST:res.data.result.previewUrl
      })
    })
    let a = JSON.parse(options.params)
    taskdetail({id:a.id}).then(res=>{
      this.setData({
        taskContent:res.data.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})