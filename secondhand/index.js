function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = getApp();

Page({
    data: {
        indicatorDots: !0,
        common: "通用",
        currentIndex: 0,
        cateList: [],
        goodsList: [],
        islog: !1,
        page: 1,
        loadmore: !0,
        autoplay: !0,
        duration: 1e3,
        index_swiperCurrent: 0,
        slide: [ {} ]
    },
    onLoad: function(t) {
        console.log(t), console.log(wx.getStorageSync("schoolId")), wx.getStorageSync("schoolId") || t.s_id && wx.setStorageSync("schoolId", t.s_id), 
        this.getSysparment(), this.getCate(), this.setData({
            currentIndex: 0,
            goodsList: [],
            page: 1,
            loadmore: !0
        }), wx.getStorageSync("openid") && this.setData({
            islog: !0
        });
    },
    index_swiperChange: function(t) {
        this.setData({
            index_swiperCurrent: t.detail.current
        });
    },
    onShow: function() {},
    getCate: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/secondCate",
            data: {
                sid: wx.getStorageSync("schoolId")
            },
            success: function(e) {
                t.setData({
                    cateList: e.data.data.cate,
                    slide: e.data.data.slide
                }), e.data.data.cate.length > 0 && t.getGoods();
            }
        });
    },
    slideJump: function(t) {
        console.log(t), 1 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: t.currentTarget.dataset.url
        }) : 2 == t.currentTarget.dataset.type ? (console.log("appid是", t.currentTarget.dataset.url), 
        wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.url,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            }
        })) : wx.navigateTo({
            url: "/gc_school/pages/webview/index?url=" + t.currentTarget.dataset.url
        });
    },
    getSysparment: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                t.setData({
                    sys: e.data.data.sys
                });
            }
        });
    },
    getGoods: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/secondGoods",
            data: {
                page: a.data.page,
                sid: wx.getStorageSync("schoolId"),
                cid: a.data.cateList[a.data.currentIndex].id,
                type: 1
            },
            success: function(e) {
                if (e.data.data.length < 10 && a.setData({
                    loadmore: !1
                }), 1 == this.data.page) a.setData({
                    goodsList: e.data.data
                }); else for (var o = 0; o < e.data.data.length; o++) a.setData({
                    goodsList: [].concat(t(a.data.goodsList), [ e.data.data[o] ])
                });
            }
        });
    },
    toCate: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "/gc_school/pages/secondhand/cate?id=" + t.currentTarget.dataset.id + "&index=" + t.currentTarget.dataset.index
        });
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/detail?id=" + t.currentTarget.dataset.id
        });
    },
    showlist: function() {
        this.data.showList ? this.setData({
            showList: !1
        }) : this.setData({
            showList: !0
        });
    },
    publish: function() {
        if (!wx.getStorageSync("userinfo")) return wx.showToast({
            title: "请登录后发布",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        wx.navigateTo({
            url: "/gc_school/pages/addsecond/index"
        });
    },
    my: function() {
        if (!wx.getStorageSync("userinfo")) return wx.showToast({
            title: "请登录后查看",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/user"
        });
    },
    search: function() {
        wx.navigateTo({
            url: "/gc_school/pages/search/index"
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/gc_school/pages/secondhand/index?s_id=" + wx.getStorageSync("schoolId")
        };
    },
    onShareTimeline: function() {
        return {
            title: "二手市场",
            query: "s_id=" + wx.getStorageSync("schoolId")
        };
    }
});