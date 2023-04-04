// miniprogram/pages/user/myList/myList.js
Page({
  data: {
    sum: {},
    userinfo: {},
    openId: "",
  },

  async onShow() {
    if (wx.getStorageSync('openId') != "") {
      this.setData({
        openId: wx.getStorageSync('openId').result.openid
      });
    }
    //获取task数据库所有数据
    const db = wx.cloud.database({
      env: "xgj1-056iz"
    })
    var that = this;
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    });
    //1.获取数据的总个数
    let count = await db.collection('task').where({
      acceptUserOpenid:this.data.openId
    }).count()
    count = count.total
    this.setData({
      sum: count
    })
    if(count==0){
      wx.showToast({
        title: "地大社区：您暂无接单", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
    }
    
    //通过for循环多次请求，并且把多次请求的数据放进同一个数组
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('task').where({
        acceptUserOpenid:this.data.openId
      }).skip(i).get()
      all = all.concat(list.data);
    }
    this.setData({
      arr: all
    })
  },

  overTask(e){
   var that = this;
    wx.showModal({
      title: '是否放弃',
      content: '请选择是否放弃当前任务',
      success (res) {
        if (res.confirm) {//用户点击确认

          const db = wx.cloud.database({
            env: "xgj1-056iz"
          });
          db.collection('task').where({
            _id:that.data.arr[e.currentTarget.dataset.index]._id //条件
          }).update({
            // data 字段表示需新增的 JSON 数据
            data: {
              acceptUserOpenid:"",
            },
          }) 
          //关闭当前页面并且回到上页面
          wx.navigateBack({
            delta: 1
          })
          
        } else if (res.cancel) {//用户点击取消
          
        }
      }
    })
    
  }

  
})