function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp();

Page({
    data: (e = {
        data: {},
        indicatorDots: !0,
        is_fav: !1,
        user_is_fav: !1,
        comment_list: [],
        comment_show: !1,
        is_hide: !0,
        placeholder: "想说点什么",
        input: "",
        pid: 0
    }, t(e, "data", 0), t(e, "is_click", !0), e),
    inputFocus: function(t) {
        this.setData({
            bottom: t.detail.height
        });
    },
    inputBlur: function() {
        this.setData({
            bottom: 0
        });
    },
    onLoad: function(t) {
        console.log(t), this.getDetail(t.id);
    },
    getDetail: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/goodsDetail",
            data: {
                id: t,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a.data.data), e.setData({
                    data: a.data.data,
                    is_fav: a.data.data.is_fav,
                    user_is_fav: a.data.data.user_is_fav,
                    comment_list: a.data.data.comment
                }), e.footprint(t);
            }
        });
    },
    comment: function(t) {
        var e = t.currentTarget.dataset.groupindex, a = t.currentTarget.dataset.index;
        this.setData({
            input: ""
        }), "-1" != e && "-1" != a ? this.setData({
            placeholder: "回复@" + this.data.comment_list[e].child[a].nickname,
            pid: this.data.comment_list[e].child[a].id
        }) : "-1" != e && "-1" == a && this.setData({
            placeholder: "回复@" + this.data.comment_list[e].nickname,
            pid: this.data.comment_list[e].id
        }), this.setData({
            is_hide: !this.data.is_hide
        });
    },
    del: function(t) {
        var e = this;
        console.log(t.currentTarget.dataset.id), wx.showModal({
            content: "确认删除该评论吗？",
            success: function(i) {
                i.confirm ? a.util.request({
                    url: "entry/wxapp/delComment",
                    data: {
                        id: t.currentTarget.dataset.id,
                        openid: wx.getStorageSync("openid"),
                        type: 1
                    },
                    success: function(t) {
                        0 == t.data.errno && (wx.showToast({
                            title: t.data.message
                        }), setTimeout(function() {
                            e.getDetail(e.data.data.id);
                        }, 2e3));
                    }
                }) : console.log("取消删除");
            }
        });
    },
    input: function(t) {
        this.setData({
            input: t.detail.value.replace(/\s*/g, "")
        });
    },
    submit: function() {
        if (!wx.getStorageSync("userinfo")) return wx.showToast({
            title: "请登录后发布",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        if ("" != this.data.input) if (this.data.is_click) {
            var t = this;
            t.setData({
                is_click: !1
            }), a.util.request({
                url: "entry/wxapp/submitComment",
                data: {
                    goods_id: t.data.data.id,
                    openid: wx.getStorageSync("openid"),
                    s_id: wx.getStorageSync("schoolId"),
                    content: t.data.input,
                    pid: t.data.pid
                },
                success: function(e) {
                    t.getDetail(t.data.data.id), console.log(e.data.data), t.setData({
                        input: ""
                    });
                },
                complete: function() {
                    t.setData({
                        is_click: !0
                    });
                }
            });
        } else wx.showToast({
            title: "请勿重复点击",
            icon: "none"
        }); else wx.showToast({
            title: "发布内容不能为空",
            icon: "none"
        });
    },
    onPageScroll: function() {
        0 == this.data.is_hide && (console.log("楚平路"), this.setData({
            is_hide: !0
        }));
    },
    toBuy: function() {
        if (console.log("立即购买"), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/buy?id=" + this.data.data.id
        });
    },
    showmore: function(t) {
        console.log(t.currentTarget.dataset.index);
        var e = this.data.comment_list;
        e[t.currentTarget.dataset.index].block = !e[t.currentTarget.dataset.index].block, 
        this.setData({
            comment_list: e
        });
    },
    footprint: function(t) {
        "" != wx.getStorageSync("openid") && a.util.request({
            url: "entry/wxapp/footprint",
            data: {
                id: t,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data);
            }
        });
    },
    previewImage: function(t) {
        var e = this.data.data.img, a = t.target.dataset.index;
        wx.previewImage({
            urls: e,
            current: e[a],
            fail: function(t) {
                wx.showToast({
                    title: "出错啦，请重试！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    fav: function(t) {
        if (console.log(t), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        var e = this;
        a.util.request({
            url: "entry/wxapp/goodsFav",
            data: {
                id: t.currentTarget.dataset.id,
                openid: wx.getStorageSync("openid"),
                type: t.currentTarget.dataset.type
            },
            success: function(a) {
                0 == a.data.errno && (1 == t.currentTarget.dataset.type ? e.setData({
                    is_fav: !e.data.is_fav
                }) : e.setData({
                    user_is_fav: !e.data.user_is_fav
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    makecall: function(t) {
        if (console.log(t), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone,
            success: function() {
                console.log("成功拨打电话");
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.data.name,
            query: "/gc_school/pages/secondhand/detail?id=" + this.data.data.id,
            imageUrl: this.data.data.img[0]
        };
    },
    onShareTimeline: function() {
        return console.log(this.data.data), {
            title: this.data.data.name,
            query: "id=" + this.data.data.id,
            imageUrl: this.data.data.img[0]
        };
    }
});