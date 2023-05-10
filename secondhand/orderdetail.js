var t = getApp();

Page({
    data: {
        id: "",
        data: {}
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getDetail();
    },
    getDetail: function() {
        var n = this;
        t.util.request({
            url: "entry/wxapp/secondOrderDetail",
            data: {
                id: n.data.id,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), n.setData({
                    data: t.data.data
                });
            }
        });
    },
    makecall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.data.phone,
            success: function() {},
            fail: function() {
                console.log("取消拨打");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});