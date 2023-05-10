function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        page: 1,
        showNodata: !1,
        erranderId: 2,
        address: {
            available: []
        },
        loadmore: !0
    },
    onLoad: function(t) {
        this.getData();
    },
    getData: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/TixianList",
            data: {
                page: this.data.page,
                s_id: wx.getStorageSync("schoolId"),
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                if (a.data.data.list.length < 18 && e.setData({
                    loadmore: !1
                }), 1 == this.data.page) e.setData({
                    list: a.data.data.list
                }); else for (var n = 0; n < a.data.data.list.length; n++) e.setData({
                    list: [].concat(t(e.data.list), [ a.data.data.list[n] ])
                });
            }
        });
    },
    handleGet: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/CouponGet",
            data: {
                co_id: t.currentTarget.dataset.id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                e.getData();
            }
        });
    },
    handleUser: function(t) {
        var a = getCurrentPages();
        "gc_school/pages/public/index" == a[a.length - 2].route ? wx.navigateBack({
            cupon: t.currentTarget.dataset.id
        }) : wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getData();
    },
    onShareAppMessage: function() {}
});