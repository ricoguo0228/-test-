var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        showNodata: !1,
        erranderId: 2,
        address: {
            available: []
        },
        islogin: !1,
        color: wx.getStorageSync("color")
    },
    onLoad: function() {
        wx.getStorageSync("userinfo") && (console.log("用户信息", wx.getStorageSync("userinfo")), 
        this.setData({
            loginuserinfo: wx.getStorageSync("userinfo"),
            islogin: !0
        }));
    },
    handleUser: function(e) {
        var a = getCurrentPages(), n = a[a.length - 2];
        "gc_school/pages/public/index" == n.route ? (n.setData({
            form: t({}, n.data.form, {
                a_id: e.currentTarget.dataset.id,
                a_name: e.currentTarget.dataset.name,
                a_addres: e.currentTarget.dataset.addres
            })
        }), wx.navigateBack({
            address: e.currentTarget.dataset.id
        })) : wx.navigateBack();
    },
    onJsEvent: function(t) {
        console.log(t), wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    del: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "确定要删除该条地址吗？",
            success: function(n) {
                n.confirm && e.util.request({
                    url: "entry/wxapp/MyAddresDel",
                    data: {
                        a_id: t.currentTarget.dataset.id,
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(t) {
                        a.getData();
                    }
                });
            }
        });
    },
    onShow: function(t) {
        this.getData();
    },
    getData: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/MyAddresList",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                0 == e.data.data.list.length && t.setData({
                    showNodata: !0
                }), t.setData({
                    address: {
                        available: e.data.data.list
                    }
                });
            }
        });
    },
    wxAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(a) {
                console.log("返回的地址", a), e.util.request({
                    url: "entry/wxapp/MyAddresAdd",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        name: a.userName,
                        addres: a.detailInfo,
                        province: a.provinceName,
                        city: a.cityName,
                        district: a.countyName,
                        phone: a.telNumber
                    },
                    success: function(e) {
                        t.getData();
                    }
                });
            }
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});