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
        tabid: 0,
        dataList: [],
        page: 1,
        loadmore: !0,
        ifName: !1,
        id: "",
        reason: ""
    },
    onLoad: function(t) {
        this.getMylist();
    },
    cancel: function() {
        this.setData({
            ifName: !1,
            reason: ""
        });
    },
    refund: function(t) {
        console.log(t.currentTarget.dataset.id), this.setData({
            ifName: !0,
            id: t.currentTarget.dataset.id
        });
    },
    getMylist: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/mySecondOrderout",
            data: {
                openid: wx.getStorageSync("openid"),
                sid: wx.getStorageSync("schoolId"),
                page: e.data.page,
                type: 1
            },
            success: function(a) {
                if (a.data.data.length < 10 && e.setData({
                    loadmore: !1
                }), 1 == this.data.page) e.setData({
                    dataList: a.data.data
                }); else for (var n = 0; n < a.data.data.length; n++) e.setData({
                    dataList: [].concat(t(e.data.dataList), [ a.data.data[n] ])
                });
            }
        });
    },
    confirm: function(t) {
        var e = this;
        console.log(t.currentTarget.dataset.status), 1 == t.currentTarget.dataset.status && wx.showModal({
            title: "提示",
            content: "确认收货吗？",
            success: function(n) {
                n.confirm && a.util.request({
                    url: "entry/wxapp/confirmOrder",
                    data: {
                        id: t.currentTarget.dataset.id
                    },
                    success: function(t) {
                        e.setData({
                            page: 1,
                            loadmore: !0
                        }), e.getMylist();
                    }
                });
            }
        });
    },
    setValue: function(t) {
        this.setData({
            reason: t.detail.value.replace(/\s+/g, "")
        });
    },
    confirmRefund: function() {
        var t = this;
        "" != this.data.reason ? a.util.request({
            url: "entry/wxapp/secondRefund",
            data: {
                id: t.data.id,
                reason: t.data.reason
            },
            success: function(a) {
                t.setData({
                    page: 1,
                    loadmore: !0,
                    ifName: !1,
                    reason: ""
                }), t.getMylist();
            }
        }) : a.util.message("请填写理由", "", "error");
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/orderdetail?id=" + t.currentTarget.dataset.id
        });
    },
    changeTab: function(t) {
        this.setData({
            tabid: t.currentTarget.dataset.id
        }), this.getlist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getMylist();
    }
});