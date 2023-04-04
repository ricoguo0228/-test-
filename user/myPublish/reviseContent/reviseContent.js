// miniprogram/pages/user/myPublish/reviseContent/reviseContent.js
Page({


  data: {
    taskTitle: "",
    taskVx: "",
    taskContent: "",
    options: ""
  },


  onLoad(options) {
    var that = this;
    console.log(options)
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });
    db.collection('task').where({ //数据查询
      _id: options.id //条件
    }).get({
      success: function (res) {
        console.log(res)
        // res.data 包含该记录的数据
        that.setData({
          options: options.id,
          taskTitle: res.data[0].taskTitle,
          taskVx: res.data[0].taskVx,
          taskContent: res.data[0].taskContent
        })
      }
    })

  },

  taskTitle(e) {
    this.setData({
      taskTitle: e.detail.value
    })
  },
  taskContent(e) {
    this.setData({
      taskContent: e.detail.value
    })
  },
  taskVx(e) {
    this.setData({
      taskVx: e.detail.value
    })
  },

  update() {
    if (this.data.taskTitle == "" || this.data.taskContent == "" || this.data.taskVx == "") {
      wx.showModal({
        title: "请勿留空", // 提示的标题
        content: "您可能修改了数据，但是却又删除了，导致当前数据为空，不可修改！请重新填写", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      })
    } else {
      const db = wx.cloud.database({
        env: "xgj1-056iz"
      });
      db.collection('task').where({
        _id: this.data.options //条件
      }).update({
        // data 字段表示需新增的 JSON 数据
        data: {
          taskTitle: this.data.taskTitle,
          taskContent: this.data.taskContent,
          taskVx: this.data.taskVx,
        },
      })
      //关闭当前页面并且回到上页面
      wx.navigateBack({
        delta: 1
      })
    }
  },





  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})