var t = getApp();

Page({
    data: {
        detail: {},
        input: "",
        id: "",
        pid: 0,
        comment_list: [],
        placeholder: "请输入内容",
        bottom: 0,
        is_click: !0
    },
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
        this.setData({
            id: t.id
        }), this.getDetail(t.id);
    },
    getDetail: function(e) {
        var a = this;
        t.util.request({
            url: "entry/wxapp/lostDetail",
            method: "POST",
            data: {
                openid: wx.getStorageSync("openid"),
                id: e
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    detail: t.data.data,
                    comment_list: t.data.data.comment
                });
            }
        });
    },
    makecall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.detail.phone
        });
    },
    input: function(t) {
        this.setData({
            input: t.detail.value.replace(/\s*/g, "")
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
            var e = this;
            e.setData({
                is_click: !1
            }), t.util.request({
                url: "entry/wxapp/lostComment",
                data: {
                    article_id: e.data.id,
                    openid: wx.getStorageSync("openid"),
                    s_id: wx.getStorageSync("schoolId"),
                    content: e.data.input,
                    pid: e.data.pid
                },
                success: function(t) {
                    e.getDetail(e.data.id), console.log(t.data.data), e.setData({
                        input: ""
                    });
                },
                complete: function() {
                    e.setData({
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
    del: function(e) {
        var a = this;
        console.log(e.currentTarget.dataset.id), wx.showModal({
            content: "确认删除该评论吗？",
            success: function(i) {
                i.confirm ? t.util.request({
                    url: "entry/wxapp/delComment",
                    data: {
                        type: 2,
                        id: e.currentTarget.dataset.id,
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(t) {
                        0 == t.data.errno && (wx.showToast({
                            title: t.data.message
                        }), setTimeout(function() {
                            a.getDetail(a.data.id);
                        }, 2e3));
                    }
                }) : console.log("取消删除");
            }
        });
    },
    fav: function(e) {
        if (console.log(e), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        var a = this;
        t.util.request({
            url: "entry/wxapp/goodsFav",
            data: {
                id: e.currentTarget.dataset.id,
                openid: wx.getStorageSync("openid"),
                type: 3
            },
            success: function(t) {
                0 == t.data.errno && a.getDetail(a.data.id);
            }
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
    preview: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: t.currentTarget.dataset.list
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        if (console.log(111), "" == wx.getStorageSync("openid")) return wx.showToast({
            title: "请先登录",
            icon: "none"
        }), void setTimeout(function() {
            wx.switchTab({
                url: "/gc_school/pages/user/index"
            });
        }, 1e3);
        var e = this;
        t.util.request({
            url: "entry/wxapp/articleShare",
            data: {
                id: e.data.id,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                return {
                    title: "失物招领",
                    query: "/gc_school/pages/secondhand/detail?id=" + e.data.id
                };
            }
        });
    },
    onShareTimeline: function() {
        return console.log(this.data), {
            title: "失物招领",
            query: "id=" + this.data.id
        };
    }
});