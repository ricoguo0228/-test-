var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        is_pay: 0,
        system: {},
        sys: {}
    },
    moneyinput: function(t) {
        var e, a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
        a.test(t.detail.value) && (e = t.detail.value.replace(a, "$2$3$4")), this.setData({
            money: e
        });
    },
    formSubmit: function(a) {
        var n = this;
        return a.detail.value.money ? Number(a.detail.value.money) > n.data.userInfo.money ? (e.util.message("余额不足", "", "error"), 
        !1) : Number(a.detail.value.money) < n.data.system.min_price ? (e.util.message("提现金额不能低于" + n.data.system.min_price, "", "error"), 
        !1) : void e.util.request({
            url: "entry/wxapp/TixianPost",
            data: t({}, a.detail.value, {
                openid: wx.getStorageSync("openid"),
                type: n.data.is_pay
            }),
            success: function(t) {
                wx.showToast({
                    title: t.data.message
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 2e3);
            }
        }) : (e.util.message("请输入提现金额", "", "error"), !1);
    },
    getUser: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/balance",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                a.setData({
                    userInfo: t({}, a.data.userInfo, {
                        money: e.data.data.money
                    })
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t), this.getUser(), this.getSystem(), this.getConfig();
    },
    getConfig: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            data: {},
            success: function(e) {
                t.setData({
                    sys: e.data.data.sys,
                    is_pay: e.data.data.sys.is_pay_open
                });
            }
        });
    },
    getSystem: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/system",
            data: {},
            success: function(e) {
                t.setData({
                    system: e.data.data
                }), console.log("打印", e.data.data);
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