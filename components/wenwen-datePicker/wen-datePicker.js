Component({
  data: {
    startdate: '',
    enddate: '',
  },
  attached() {
  },
  methods: {
    bindStartDateChange: function (e) {
      this.setData({
        startdate: e.detail.value
      })
    },
    bindEndDateChange: function (e) {
      this.setData({
        enddate: e.detail.value
      })
    },
    cancleTime() {
      this.triggerEvent('myevent',{},{})
    },
    takeTime() {
      this.triggerEvent('myevent',{params: this.data},{})
    }
  }
})