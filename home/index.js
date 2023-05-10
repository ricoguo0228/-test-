function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../wxParse/wxParse.js")), a = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        showText: !0,
        getUseInfo: !1,
        status: 0,
        page: 1,
        url: a.siteInfo.appimg,
        index: 0,
        address: {},
        schooindex: 0,
        s_id: "",
        rank: [],
        slide: [],
        top: wx.getStorageSync("CustomBar"),
        StatusBar: wx.getStorageSync("StatusBar"),
        list: [],
        location: {
            lng: "1",
            lat: "1"
        },
        current: 0,
        modules: [],
        schoolInfo: {
            modules: []
        },
        is_show_toast: !0,
        dataList: [],
        order_index: 0,
        history: [],
        modules_load: !1,
        color: "#FF6444"
    },
    openview: function(t) {
        console.log(t), wx.previewImage({
            current: t.currentTarget.dataset.url,
            urls: [ t.currentTarget.dataset.url ]
        });
    },
    url: function() {
        wx.navigateTo({
            url: "/gc_school/pages/url/index?url=https://www.baidu.com"
        });
    },
    downs: function() {
        console.log("店家");
        var t = this;
        wx.downloadFile({
            url: "https://gcwe7.link1024.com/attachment/files/2/2021/11/i33XNf6msm2l21ZxA49aaNAxvxXfyM.zip",
            success: function(e) {
                console.log(e);
                var a = e.tempFilePath, o = wx.getFileSystemManager();
                o.access({
                    path: wx.env.USER_DATA_PATH + "/download",
                    success: function(e) {
                        o.access({
                            path: wx.env.USER_DATA_PATH + "/download/wendang",
                            success: function(t) {
                                return !1;
                            },
                            fail: function(e) {
                                console.log("不存在此文件"), o.saveFile({
                                    tempFilePath: a,
                                    filePath: wx.env.USER_DATA_PATH + "/download/wendang",
                                    success: function(e) {
                                        t.getLocalFiles(o, t);
                                    },
                                    fail: function(t) {
                                        console.log(t);
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        o.mkdir({
                            dirPath: wx.env.USER_DATA_PATH + "/download",
                            recursive: !1,
                            success: function(e) {
                                o.saveFile({
                                    tempFilePath: a,
                                    filePath: wx.env.USER_DATA_PATH + "/download/wendang",
                                    success: function(e) {
                                        t.getLocalFiles(o, t);
                                    },
                                    fail: function(t) {
                                        console.log(t);
                                    }
                                });
                            },
                            fail: function(t) {
                                console.log(t);
                            }
                        });
                    }
                });
            },
            fail: function(t) {
                console.log(t, "下载失败");
            }
        });
    },
    getLocalFiles: function(t, e) {
        t.readdir({
            dirPath: wx.env.USER_DATA_PATH + "/download",
            success: function(t) {
                var a = [];
                t.files.forEach(function(t, e) {
                    a.push({
                        file: t,
                        path: wx.env.USER_DATA_PATH + "/download/" + t,
                        sel: !1
                    });
                }), e.setData({
                    downloadFile: a
                });
            },
            fail: function(t) {
                console.log("本地文件列表读取失败: ", t);
            }
        });
    },
    down: function() {
        wx.downloadFile({
            url: "https://gcwe7.link1024.com/attachment/files/2/2021/11/vznAv5Png5pV0jV5mmmWQGnr95F6A9.pdf",
            success: function(t) {
                console.log(t);
                var e = t.tempFilePath;
                wx.openDocument({
                    showMenu: !0,
                    filePath: e,
                    success: function(t) {
                        console.log(t);
                    }
                }), wx.saveFile({
                    tempFilePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t);
                    }
                }), t.statusCode;
            }
        });
    },
    order_change: function(t) {
        if (console.log(t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) e = this.data.list; else var e = this.data.history;
        console.log("列表", e), this.setData({
            order_index: t.currentTarget.dataset.index
        });
    },
    jie: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "允许接收订阅消息",
            success: function(e) {
                e.confirm && (wx.getSetting({
                    success: function(t) {
                        console.log(t.authSetting);
                    }
                }), wx.requestSubscribeMessage({
                    tmplIds: [ t.data.sysparment.template_id ],
                    success: function(t) {
                        console.log("已授权接收订阅消息"), a.util.request({
                            url: "entry/wxapp/sendSubscribeMessage",
                            data: {
                                ordersn: "3583202103171811593073"
                            }
                        }), wx.navigateTo({});
                    }
                }));
            }
        });
    },
    onChangeShowText: function() {
        this.setData({
            showText: !this.data.showText
        });
    },
    onGoodsInfo: function(t) {
        this.setData({
            note: t.detail.value
        });
    },
    onJsEvent: function(t) {
        console.log(t.currentTarget.dataset.url), console.log("是否加载完毕", this.data.modules_load), 
        this.data.modules_load && ("" != t.currentTarget.dataset.url ? 1 == t.currentTarget.dataset.urltype ? wx.navigateTo({
            url: t.currentTarget.dataset.url + "&id=" + t.currentTarget.dataset.id
        }) : wx.navigateTo({
            url: "/gc_school/pages/webview/index?url=" + t.currentTarget.dataset.url
        }) : wx.navigateTo({
            url: "/gc_school/pages/public/index?type=" + t.currentTarget.dataset.type + "&showText=" + this.data.note + "&id=" + t.currentTarget.dataset.id
        }));
    },
    PickerChange: function(t) {
        console.log(t), this.setData({
            index: t.detail.value,
            schoolInfo: this.data.school[parseInt(t.detail.value)],
            s_id: this.data.school[parseInt(t.detail.value)].s_id,
            current: 0
        }), wx.setStorageSync("schoolId", this.data.school[parseInt(t.detail.value)].s_id), 
        wx.setStorageSync("schoolIndex", parseInt(t.detail.value)), this.getSchoolInfo(this.data.school[parseInt(t.detail.value)].s_id), 
        this.getOrderData(), this.getHistoryList(), this.setData({
            dataList: []
        }), this.getSysparment(), a.globalData.isload = !0;
    },
    toOther: function(t) {
        console.log(t.currentTarget.dataset.appid), wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            }
        });
    },
    onLoad: function(t) {
        wx.setStorageSync("user_identity", 0), wx.getStorageSync("openid") && a.util.request({
            url: "entry/wxapp/judgeIdentity",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                wx.setStorageSync("user_identity", t.data.data.status), wx.setStorageSync("template_id", t.data.data.sys.template_id), 
                wx.setStorageSync("cancel_template_id", t.data.data.sys.cancel_template_id);
            }
        }), this.setData({
            city: {
                location: this.data.location
            }
        }), wx.setStorageSync("city", this.data.city), console.log(this.data.city), this.getSchool();
        var e = Date.parse(new Date()), o = 1e3 * (e /= 1e3);
        new Date(o);
        wx.getStorageSync("last_time") ? wx.getStorageSync("last_time") + 86400 < e ? (this.setData({
            is_show_toast: !0
        }), console.log("过时了"), wx.setStorageSync("last_time", e)) : (console.log("没过时"), 
        this.setData({
            is_show_toast: !1
        })) : (this.setData({
            is_show_toast: !0
        }), wx.setStorageSync("last_time", e)), console.log("当前时间戳为：" + e), console.log("当前时间戳为：" + (e - 604800)), 
        console.log(a.siteInfo.appimg), this.setData({
            address: wx.getStorageSync("city")
        });
    },
    onReady: function() {},
    onShareAppMessage: function() {},
    onShareTimeline: function() {},
    onShow: function() {
        this.getOrderData(), this.getHistoryList(), wx.removeStorage({
            key: "json"
        }), wx.removeStorage({
            key: "store_id"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    detail: function(t) {
        console.log(t.currentTarget.dataset.index);
        var e = this;
        "已完成" != t.currentTarget.dataset.status && (1 == wx.getStorageSync("user_identity") ? wx.requestSubscribeMessage({
            tmplIds: [ wx.getStorageSync("template_id"), wx.getStorageSync("cancel_template_id") ],
            success: function(t) {
                console.log("已授权接收订阅消息");
            },
            complete: function() {
                wx.navigateTo({
                    url: "/gc_school/pages/order/detail?id=" + e.data.list[t.currentTarget.dataset.index].o_id
                });
            }
        }) : wx.navigateTo({
            url: "/gc_school/pages/order/detail?id=" + e.data.list[t.currentTarget.dataset.index].o_id
        }));
    },
    getSchool: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/SchoolList",
            data: {
                openid: wx.getStorageSync("openid") ? wx.getStorageSync("openid") : "nologinuser"
            },
            success: function(e) {
                o = wx.getStorageSync("schoolIndex") ? wx.getStorageSync("schoolIndex") : 0;
                if (e.data.data.list.length > 0) for (var a = 0; a < e.data.data.list.length; a++) if (e.data.data.list[a].s_id == wx.getStorageSync("schoolId")) {
                    var o = a;
                    wx.setStorageSync("schoolIndex", a), console.log(a);
                }
                console.log(o), t.setData({
                    school: e.data.data.list,
                    index: wx.getStorageSync("schoolIndex") ? wx.getStorageSync("schoolIndex") : 0,
                    s_id: e.data.data.list[o].s_id,
                    sys: e.data.data.sys
                }), wx.setStorageSync("schoolId", e.data.data.list[o].s_id), t.getSchoolInfo(e.data.data.list[o].s_id), 
                t.getOrderData(), t.getHistoryList(), t.getSysparment();
            }
        });
    },
    getSchoolInfo: function(t) {
        var e = this, e = this;
        a.util.request({
            url: "entry/wxapp/SchoolIndex",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: t
            },
            success: function(t) {
                console.log(t.data.data), e.setData({
                    modules_load: !0,
                    schoolInfo: t.data.data
                });
            }
        });
    },
    jump: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.url;
        e && (1 == wx.getStorageSync("user_identity") ? wx.requestSubscribeMessage({
            tmplIds: [ wx.getStorageSync("template_id"), wx.getStorageSync("cancel_template_id") ],
            success: function(t) {
                console.log("已授权接收订阅消息");
            },
            complete: function() {
                wx.navigateTo({
                    url: e
                });
            }
        }) : wx.navigateTo({
            url: e
        }));
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
        a.util.request({
            url: "entry/wxapp/Sysparment",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(a) {
                var o = a.data.data.list;
                console.log(a.data);
                for (var s = t.data.dataList, n = 0; n < o.length; n += 2) s.push(o.slice(n, n + 2));
                t.setData({
                    dataList: s
                }), console.log("规格的", s), a.data.data.sys.toast_content && e.default.wxParse("toast_content", "html", a.data.data.sys.toast_content, t, 0), 
                t.setData({
                    sysparment: a.data.data.sys
                });
            }
        });
    },
    getList: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/IndexList",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                if (console.log("11111", a), 1 == this.data.page) e.setData({
                    list: a.data.data.list
                }); else for (var o = 0; o < a.data.data.list.length; o++) e.setData({
                    list: [].concat(t(e.data.list), [ a.data.data.list[o] ])
                });
            }
        });
    },
    close: function() {
        this.setData({
            is_show_toast: !1
        });
    },
    getLocation: function(t) {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                console.log("打印位置", a), e.setData({
                    tmps: {
                        location: {
                            lng: a.longitude,
                            lat: a.latitude
                        }
                    }
                }), setTimeout(function() {
                    console.log("location的值", e.data.tmps), wx.setStorageSync("city", e.data.tmps), 
                    e.setData({
                        city: e.data.location
                    }), t();
                }, 2e3);
            }
        });
    },
    getUsetInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? (this.setData({
            getUseInfo: !0
        }), wx.setStorage({
            key: "useInfo",
            data: "true"
        }), this.getGetUid(t.detail.userInfo)) : this.setData({
            getUseInfo: !0
        });
    },
    getRank: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/rank",
            data: {
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(e) {
                t.setData({
                    rank: e.data.data
                });
            }
        });
    },
    getPage: function() {
        var t = this;
        t.getLocation(function() {
            console.log("lplp"), a.util.request({
                url: "entry/wxapp/UserInfoUpdate",
                data: {
                    openid: wx.getStorageSync("openid"),
                    nickname: wx.getStorageSync("userinfo").nickName,
                    avatar: wx.getStorageSync("userinfo").avatarUrl
                },
                success: function(e) {
                    a.util.footer(t), t.setData({
                        userInfo: wx.getStorageSync("userinfo")
                    });
                }
            });
        });
    },
    getGetUid: function(t) {
        var e = this;
        wx.login({
            success: function(t) {
                t.code && a.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        console.log(t.data.data.openid), e.setData({
                            getUseInfo: !1
                        }), wx.setStorageSync("openid", t.data.data.openid), wx.getUserInfo({
                            success: function(t) {
                                var a = t.userInfo;
                                wx.setStorageSync("userinfo", a), e.getPage();
                            }
                        });
                    }
                });
            }
        });
    },
    getDateDiff: function(t, e) {
        var a = "", o = new Date().getTime() - t;
        if (!(o < 0)) {
            var s = o / 2592e6, n = o / 6048e5, i = o / 864e5, r = o / 36e5, c = o / 6e4;
            return "" == (a = s >= 1 ? parseInt(s) + "个月前" : n >= 1 ? parseInt(n) + "周前" : i >= 1 ? parseInt(i) + "天前" : r >= 1 ? parseInt(r) + "小时前" : c >= 1 ? parseInt(c) + "分钟前" : "刚刚") ? e : a;
        }
    },
    getDateTimeStamp: function(t) {
        t = t;
        var e = Date.parse(t.replace(/-/gi, "/"));
        return this.getDateDiff(e, t);
    },
    getOrderData: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/OrderWiteList",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                page: 1,
                status: this.data.type,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                for (var a = 0; a < e.data.data.order.length; a++) {
                    e.data.data.order[a].createtime = t.getDateTimeStamp(e.data.data.order[a].createtime);
                    var o = e.data.data.order[a].desc;
                    e.data.data.order[a].desc.replace(/[0-9]*(\.[0-9]*)?/g, function(t) {
                        var e = t;
                        if (Number(t)) {
                            if (t.toString().length > 3) a = t.substr(0, 2) + "****" + t.substr(6); else var a = t.substr(0, 1) + "**";
                            o = o.replace(e, a);
                        }
                    }), e.data.data.order[a].desc = o;
                }
                t.setData({
                    list: e.data.data.order
                });
            }
        });
    },
    getHistoryList: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/historyList",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                page: 1,
                status: this.data.type,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                for (var a = 0; a < e.data.data.order.length; a++) {
                    e.data.data.order[a].createtime = t.getDateTimeStamp(e.data.data.order[a].createtime);
                    var o = e.data.data.order[a].desc;
                    e.data.data.order[a].desc.replace(/[0-9]*(\.[0-9]*)?/g, function(t) {
                        var e = t;
                        if (Number(t)) {
                            if (t.toString().length > 3) a = t.substr(0, 2) + "****" + t.substr(6); else var a = t.substr(0, 1) + "**";
                            o = o.replace(e, a);
                        }
                    }), e.data.data.order[a].desc = o;
                }
                t.setData({
                    history: e.data.data.order
                });
            }
        });
    }
});