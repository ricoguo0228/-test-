// miniprogram/pages/vx/vx.js
Page({
  data: {
    // userMoney: "", //暂存接单用户的金额
    sum: {},
    userinfo: {},
    state: {},
    recommend: {},
    openId: "",
    money: {},
    nowTime: "",
  },

  async onShow() {

    wx.showLoading({
      title: '数据加载中...',
    });

    var curDate = new Date();
    this.data.nowTime=curDate.getFullYear()
    if(curDate.getMonth()<"10"){
      this.data.nowTime+="0"+(curDate.getMonth()+1)
    }else{
      this.data.nowTime+=curDate.getMonth()
    }

    if(curDate.getDate()<"10"){
      this.data.nowTime+="0"+curDate.getDate()
    }else{
      this.data.nowTime+=curDate.getDate()
    }
    console.log(this.data.nowTime)

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
    db.collection('user').where({ //数据查询
      _openid: wx.getStorageSync('openId').result.openid //条件
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        that.setData({
          money: res.data[0].money
        })
      }
    })
    //1.获取数据的总个数
    let count = await db.collection('task').where({
      _openid:this.data.openId
    }).count()
    count = count.total
    if(count==0){
      wx.showToast({
        title: "地大社区：您暂无发布", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
    }
    this.setData({
      sum: count
    })
    
    //通过for循环多次请求，并且把多次请求的数据放进同一个数组
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('task').where({
        _openid:this.data.openId
      }).skip(i).get()
      all = all.concat(list.data);
    }
    this.setData({
      arr: all
    })
    wx.hideLoading(); //结束数据加载中
  },

  recommend(e) {
    wx.showLoading({
      title: '数据加载中...',
    });

    console.log(e);
    //数据库提交数据开始
    var that = this;
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    }); // 提取缓存用户信息数据
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });
    db.collection('user').where({ //数据查询
      _openid: wx.getStorageSync('openId').result.openid //条件
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        that.setData({
          money: res.data[0].money
        })
      }
    })
    //数据库提交数据结束
    if (this.data.money > 5) {
      wx.showModal({
        title: "扣费提示", // 提示的标题
        content: "任务上推荐需要5.00元，您当前余额:" + this.data.money + "，请您选择确认或者取消", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "购买", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        success(res) {
          if (res.confirm) {
            //修改钱包金额-----------------
            db.collection('user').where({
              _openid: wx.getStorageSync('openId').result.openid //条件
            }).update({
              // data 字段表示需新增的 JSON 数据
              data: {
                money: (that.data.money - 5).toFixed(2),
              },
            })
            //修改任务为推荐任务--------------
            db.collection('task').where({
              _id: that.data.arr[e.currentTarget.dataset.index]._id //条件
            }).update({
              // data 字段表示需新增的 JSON 数据
              data: {
                recommend: true,
              },
            })

            wx.showModal({
              title: "恭喜上推", // 提示的标题
              content: "成功消费5.00让任务上了推荐位啦！", // 提示的内容
              showCancel: true, // 是否显示取消按钮，默认true
              cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
              confirmText: "确定", // 确认按钮的文字，最多4个字符
              confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
              complete: function () {
                // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                wx.navigateBack({
                  delta: 1
                })
              }
            });

          } else if (res.cancel) {

          }
        },
        // complete: function () {
        //   // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
        //   this.onLoad();
        // }
      })
    } else {
      wx.showModal({
        title: "余额不足", // 提示的标题
        content: "抱歉，您的余额不足，上推荐位需要5.00RMB", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      });
    }

    wx.hideLoading(); //结束数据加载中
  },

  delete(e) { //删除按钮，进行删除任务
    console.log(e);
    var that = this;
    wx.cloud.database().collection('task').doc(that.data.arr[e.currentTarget.dataset.index]._id).remove().then(res => {
      wx.showModal({
        title: "删除成功", // 提示的标题
        content: "数据无价，删除慎重！请刷新页面，重新加载数据，删除数据无法再度恢复", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      })
    }).catch(err => {
      wx.showModal({
        title: "删除失败", // 提示的标题
        content: "删除失败，或许是因为数据不存在，请刷新页面后重新再试", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      })
    })
  },

  revise(e) { //修改任务,创建一个新的页面，用来修改点击的页面内容
    var option = this.data.arr[e.currentTarget.dataset.index]._id
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
      url: "reviseContent/reviseContent?id=" + option
    })
  },


  async onPullDownRefresh() {
    //获取task数据库所有数据
    const db = wx.cloud.database({
      env: "xgj1-056iz"
    })
    var that = this;
    //1.获取数据的总个数
    let count = await db.collection('task').count()
    count = count.total
    this.setData({
      sum: count
    })
    //通过for循环多次请求，并且把多次请求的数据放进同一个数组
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('task').skip(i).get()
      all = all.concat(list.data);
    }
    this.setData({
      arr: all
    })
  },

  concerning(e) {

    wx.showLoading({
      title: '数据加载中...',
    });

    var that = this;
    //修改任务是否完成
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });

    db.collection('task').where({
      _id: that.data.arr[e.currentTarget.dataset.index]._id
    }).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        state: true,
      },
    })
    //查找接单用户的余额数量，提取用于相加
    db.collection('user').where({ //数据查询
      _openid: that.data.arr[e.currentTarget.dataset.index].acceptUserOpenid //条件
    }).get({
      success: function (res) {

        // res.data 包含该记录的数据
        // that.setData({
        //   userMoney: res.data[0].money,
        // })
        //修改接单用户的金额
        db.collection('user').where({
          _openid: that.data.arr[e.currentTarget.dataset.index].acceptUserOpenid
        }).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            money: (parseFloat(res.data[0].money) + parseFloat(that.data.arr[e.currentTarget.dataset.index].taskMoney)).toFixed(2),
          },
          success(res) {
            wx.hideLoading(); //结束数据加载中
            wx.showModal({
              title: "任务完成", // 提示的标题
              content: "您已确认任务完成，平台已自动发放奖励，感谢您的信任！", // 提示的内容
              showCancel: true, // 是否显示取消按钮，默认true
              cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
              confirmText: "确定", // 确认按钮的文字，最多4个字符
              confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
              complete: function () {
                // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");

                //关闭当前页面并且回到上页面
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        })

      }
    })

  },

  backMoneyPublish(e) { //任务退款

    wx.showLoading({
      title: '烂漫是等待...',
    });

    var that = this;
    //修改任务是否完成
    const db = wx.cloud.database({ // 链接数据表
      env: "xgj1-056iz"
    });

    db.collection('user').where({ //数据查询
      _openid: that.data.arr[e.currentTarget.dataset.index]._openid //条件
    }).get({
      success: function (res) {
        //修改接单用户的金额
       if(!that.data.arr[e.currentTarget.dataset.index].recommend){
        db.collection('user').where({
          _openid: that.data.arr[e.currentTarget.dataset.index]._openid
        }).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            money: (parseFloat(res.data[0].money) + parseFloat(that.data.arr[e.currentTarget.dataset.index].taskMoney)).toFixed(2),
          },
        })
       }else{
        db.collection('user').where({
          _openid: that.data.arr[e.currentTarget.dataset.index]._openid
        }).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            money: (parseFloat(res.data[0].money) + parseFloat(that.data.arr[e.currentTarget.dataset.index].taskMoney) +5).toFixed(2),
          },
        })
       }

      }
    })

    wx.cloud.database().collection('task').doc(that.data.arr[e.currentTarget.dataset.index]._id).remove().then(res => {
      wx.hideLoading(); //结束数据加载中
      wx.showModal({
        title: "退款成功", // 提示的标题
        content: "退款金额：任务自身金额+推荐位金额，注：请勿多次退款，如若内容有错可以进行修改...", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        // 关闭当前页面并且回到上页面
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.navigateBack({
            delta: 1
          })
        }
      })

    }).catch(err => {
      wx.hideLoading(); //结束数据加载中
      wx.showModal({
        title: "退款失败", // 提示的标题
        content: "可能出现了某种预期之外的错误，如若未退款到账，请及时与客服联系", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        // 关闭当前页面并且回到上页面
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.navigateBack({
            delta: 1
          })
        }
      })
    })

  }
})