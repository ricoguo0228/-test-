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
        loadmore: !0
    },
    onLoad: function(t) {
        this.getMylist();
    },
    agree: function(t) {
        console.log(t.currentTarget.dataset.id), console.log(t.currentTarget);
        var e = this;
        a.util.request({
            url: "entry/wxapp/secondRefundOper",
            data: {
                openid: wx.getStorageSync("openid"),
                id: t.currentTarget.dataset.id,
                type: t.currentTarget.dataset.type
            },
            success: function(t) {
                e.setData({
                    page: 1,
                    loadmore: !0
                }), e.getMylist();
            }
        });
    },
    getMylist: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/mySecondOrderout",
            data: {
                openid: wx.getStorageSync("openid"),
                page: e.data.page,
                type: 2,
                sid: wx.getStorageSync("schoolId")
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
    delorder: function(t) {
        var e = this;
        console.log(t.currentTarget.dataset.id), wx.showModal({
            title: "提示",
            content: "确认执行此操作吗？",
            success: function(n) {
                n.confirm && a.util.request({
                    url: "entry/wxapp/delMyGoods",
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