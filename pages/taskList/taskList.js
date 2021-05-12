// pages/taskList/taskList.js
import {
  getTaskStataus,
  getTaskList
} from '../../request/getIndexData'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodata: false,
    list: [{
        "text": "对话",
        "iconPath": "../../images/tabbar_icon_chat_default.png",
        "selectedIconPath": "../../images/tabbar_icon_chat_active.png",
        dot: true
      },
      {
        "text": "设置",
        "iconPath": "../../images/tabbar_icon_setting_default.png",
        "selectedIconPath": "../../images/tabbar_icon_setting_active.png",
        badge: 'New'
      }
    ],
    statusList: [],
    taskList: [],
    index: 0,
    status: 0,
    startTime: '',
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    total: 0,
    page: 1,
    pickerVisible: false,
    isMore: true,
    modelType: '',
    dateText: '请选择开始日期'
  },
  myevent(e) {
    if (e.detail.params) {
      this.setData({
        startTime: e.detail.params.startdate,
        endTime: e.detail.params.enddate,
        page: 1,
        taskList: []
      })    
      this.getTaskLists()  
    }
    this.setData({
      pickerVisible: false
    })
  },
  tabChange(e) {
    console.log('tab change', e)
  },
  openPicker() {
    this.setData({
      pickerVisible: true
    })
  },
  bindPickerChange: function (e) {
    let int = Number.parseInt(e.detail.value) + 1
    this.setData({
      index: e.detail.value,
      status: int,
      page: 1,
      taskList: []
    })
    this.getTaskLists()
  },
  bindDateChange: function (e) {
    this.setData({
      startTime: e.detail.value,
      dateText: '请选择结束日期'
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
      page: 1,
      taskList: []
    })
    this.getTaskLists()
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?params='+JSON.stringify(e.currentTarget.dataset.content)
    })
  },
  getTaskLists: function() {
    let params = {
      "current": this.data.page || 1,
      "size": 10,
      "modelType": this.data.modelType,
      "status": this.data.status || 1
    }
    if (this.data.inputValue) {
      params.warningName = this.data.inputValue
    }
    // if (this.data.status) {
    //   params.status = this.data.status
    // }
    if (this.data.startTime) {
      params.startTime = this.data.startTime
    }
    if (this.data.endTime) {
      params.endTime = this.data.endTime
    }
    getTaskList(params).then(res => {
      this.setData({
        taskList: [...this.data.taskList, ...res.data.results],
        total: res.data.pagination.total
      })
      if(this.data.page*10 < this.data.total) {
        this.setData({
          isMore: true,
          page: this.data.page+1
        })
      } else {
        this.setData({
          isMore: false
        })
      }
    }).catch(err => console.log(err))
  },
  toDetail: function (e) {
    let obj = {
      id:e.currentTarget.dataset.content.id,
      modelType:e.currentTarget.dataset.content.modelType,
      warningAddress:e.currentTarget.dataset.content.warningAddress,
      warningDateFmt:e.currentTarget.dataset.content.warningDateFmt,
      warningName:e.currentTarget.dataset.content.warningName,
      remark:e.currentTarget.dataset.content.remark,
    }
    if (e.currentTarget.dataset.content.status == 1) {
      wx.navigateTo({
        url: '/pages/detail/detail?params=' + JSON.stringify(obj)
      })
    } else {
      wx.navigateTo({
        url: '/pages/taskDetail/taskDetail?params=' + JSON.stringify(obj)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let modelType = ''
    wx.getStorage({
      key: 'modelType',
      success (res) {
        modelType = res.data
      }
    })
    this.setData({
      modelType: options.index || modelType
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.setStorage({
      key:"modelType",
      data:options.index
    })

    getTaskStataus().then(res => {
      this.setData({
        statusList: res.data.result
      })
    }).catch(err => console.log(err))
    this.getTaskLists()
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
    if (this.data.isMore) {
      this.getTaskLists()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})