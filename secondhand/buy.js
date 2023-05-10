var a = getApp();

Page({
    data: {
        data: {}
    },
    onLoad: function(a) {
        console.log(a), this.setData({
            id: a.id
        }), this.getDetail();
    },
    getDetail: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/goodsDetail",
            data: {
                id: e.data.id,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a.data.data), e.setData({
                    data: a.data.data
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = e.detail.value.linkman.replace(/\s+/g, ""), n = e.detail.value.phone, o = e.detail.value.remark.replace(/\s+/g, "");
        if (/^1[3456789]\d{9}$/.test(n)) if (t) {
            console.log(e.detail.value.linkman.replace(/\s+/g, ""));
            var i = this;
            a.util.request({
                url: "entry/wxapp/secondOrderPost",
                data: {
                    id: i.data.id,
                    openid: wx.getStorageSync("openid"),
                    linkman: t,
                    phone: n,
                    remark: o
                },
                success: function(e) {
                    wx.requestPayment({
                        timeStamp: e.data.data.wdata.timeStamp.toString(),
                        nonceStr: e.data.data.wdata.nonceStr,
                        package: e.data.data.wdata.package,
                        signType: "MD5",
                        paySign: e.data.data.wdata.sign,
                        success: function(t) {
                            a.util.request({
                                url: "entry/wxapp/sendSubMessageSecond",
                                data: {
                                    ordersn: e.data.data.ordersn
                                }
                            }), setTimeout(function() {
                                wx.redirectTo({
                                    url: "/gc_school/pages/secondhand/user"
                                });
                            }, 2e3);
                        },
                        fail: function(e) {
                            console.log("fail"), a.util.request({
                                url: "entry/wxapp/secondCancel",
                                data: {
                                    id: i.data.id
                                },
                                success: function(a) {
                                    wx.redirectTo({
                                        url: "/gc_school/pages/secondhand/index"
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else a.util.message("请输入联系人姓名", "", "error"); else a.util.message("请输入正确的手机号", "", "error");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});