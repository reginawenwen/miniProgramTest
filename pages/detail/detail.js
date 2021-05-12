// pages/detail/detail.js
import {
  handleTask
} from '../../request/getIndexData'
Page({

  uploadError(e) {
    console.log('upload error', e.detail)
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    // this.chooseImage()
    console.log(files)
    // 文件上传的函数，返回一个promise
    // return new Promise((resolve, reject) => {
    //   // setTimeout(() => {
    //   //   reject('some error')
    //   // }, 1000)
    //   resolve()
    // })
  },
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if (that.data.files.length >= 3) {
          wx.showModal({
            title: '警告',
            content: "最多只能上传三张图片",
            showCancel: false
          })
        } else {
          console.log(res)
          let tempFilePaths = res.tempFilePaths
          let temp = that.data.files
          temp.push(tempFilePaths[0])
          that.setData({
            files: [...temp]
          })
          wx.uploadFile({
            filePath: tempFilePaths[0],
            name: 'file',
            url: `https://ocn.bearhunting.cn/public/api/seaweed/v1/attachment/upload`,
            header: {
              "Content-Type": "multipart/form-data",
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                let d = JSON.parse(res.data).result
                let temp = that.data.userReceivedImgList
                temp.push(d[0])
                that.setData({
                  userReceivedImgList: temp
                })
              } else {
                wx.showModal({
                  title: '警告',
                  content: "上传失败，请重试",
                  showCancel: false
                })
                let temp = that.data.files
                temp.pop()
                that.setData({
                  files: [...temp]
                })
              }
            }
          })
        }

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });
      }
    })
  },
  handleDeleteImg: function (params) {
    let d = params.currentTarget.dataset.index
    let list = this.data.files
    let receiveList = this.data.userReceivedImgList
    list.splice(d, 1)
    receiveList.splice(d, 1)
    this.setData({
      files: list
    })
    this.setData({
      userReceivedImgList: receiveList
    })
  },
  laternext(e) {
    let val = e.detail.value
    this.setData({
      checked: val
    })
  },
  bindTextAreaBlur(e) {
    console.log(e)
    this.setData({
      concent: e.detail.value,
    })
  },
  submit() {
    if (this.data.userReceivedImgList.length == 0) {
      wx.showModal({
        title: '警告',
        content: "请上传图片",
        showCancel: false
      })
      return false
    }
    if (this.data.checked == '') {
      wx.showModal({
        title: '警告',
        content: "请选择处置情况",
        showCancel: false
      })
      return false
    }
    let params = {
      id: this.data.taskId,
      images: this.data.userReceivedImgList,
      remark: this.data.concent,
      status: this.data.checked,
    }
    console.log(params)
    handleTask(params).then(res => {
      if (res.error) {
        wx.showToast({
          title: '提交失败请重试'
        })
      } else {
        wx.showToast({
          title: '处置成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        },1000)

      }
    })
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    userReceivedImgList: [],
    checked: '',
    concent: '',
    taskId: '',
    taskContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.params)
    console.log(data)
    this.setData({
      taskId: data.id
    })
    this.setData({
      taskContent: data
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