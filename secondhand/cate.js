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
        currentIndex: 0,
        goodsList: [],
        loadmore: !0,
        page: 1,
        current_cate: 9999,
        name: ""
    },
    onLoad: function(t) {
        t.id && this.setData({
            current_cate: t.id
        }), console.log(t), this.getCate();
    },
    changeTab: function(t) {
        this.setData({
            current_cate: t.currentTarget.dataset.id,
            page: 1,
            loadmore: !0
        }), this.getGoods();
    },
    inputVal: function(t) {
        console.log(t.detail.value), this.setData({
            name: t.detail.value
        });
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/detail?id=" + t.currentTarget.dataset.id
        });
    },
    search: function() {
        this.setData({
            current_cate: -1,
            loadmore: !0,
            page: 1
        }), this.getGoods();
    },
    getCate: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/secondCate",
            data: {
                sid: wx.getStorageSync("schoolId")
            },
            success: function(a) {
                console.log(a.data.data), t.setData({
                    cateList: a.data.data.cate
                }), t.getGoods();
            }
        });
    },
    getGoods: function() {
        var e = this;
        if (9999 == e.data.current_cate) o = {
            page: e.data.page,
            sid: wx.getStorageSync("schoolId"),
            type: 1
        }; else if (-1 == e.data.current_cate) o = {
            page: e.data.page,
            sid: wx.getStorageSync("schoolId"),
            keywords: e.data.name,
            type: 3
        }; else var o = {
            page: e.data.page,
            sid: wx.getStorageSync("schoolId"),
            cid: e.data.current_cate,
            type: 2
        };
        a.util.request({
            url: "entry/wxapp/secondGoods",
            data: o,
            success: function(a) {
                if (a.data.data.length < 10 && e.setData({
                    loadmore: !1
                }), 1 == this.data.page) e.setData({
                    goodsList: a.data.data
                }); else for (var o = 0; o < a.data.data.length; o++) e.setData({
                    goodsList: [].concat(t(e.data.goodsList), [ a.data.data[o] ])
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getGoods();
    }
});