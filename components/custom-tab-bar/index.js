Component({
  data: {
    selected: 0,
    color: "#000000",
    selectedColor: "#2F9BFE",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "../../images/shouye.png",
      selectedIconPath: "../../images/shouye.png",
      text: "้ฆ้กต"
    }, {
      pagePath: "/pages/home/home",
      iconPath: "../../images/wode.png",
      selectedIconPath: "../../images/wode.png",
      text: "ๆ็"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})