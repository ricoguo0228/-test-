var n = getApp();

Page({
    data: {
        data: {}
    },
    onLoad: function(n) {
        wx.getStorageSync("userinfo") ? (console.log("用户信息", wx.getStorageSync("userinfo")), 
        this.setData({
            loginuserinfo: wx.getStorageSync("userinfo"),
            islogin: !0
        }), this.getCount()) : (wx.showToast({
            title: "请先登录",
            icon: "none"
        }), setTimeout(function() {
            wx.navigateBack({
                delta: 1,
                success: function() {
                    wx.removeStorage({
                        key: "json"
                    });
                },
                fail: function() {
                    wx.switchTab({
                        url: "/gc_school/pages/home/index"
                    });
                }
            });
        }, 2e3));
    },
    getCount: function() {
        var o = this;
        n.util.request({
            url: "entry/wxapp/goodsCount",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(n) {
                console.log(n), o.setData({
                    data: n.data.data
                });
            }
        });
    },
    onReady: function() {},
    jump: function(n) {
        wx.navigateTo({
            url: n.currentTarget.dataset.url
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});