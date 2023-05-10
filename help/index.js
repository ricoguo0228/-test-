var n = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("../../../wxParse/wxParse.js")), t = getApp();

Page({
    data: {
        data: {}
    },
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(t) {
                e.setData({
                    data: t.data.data.sys
                }), n.default.wxParse("guide", "html", e.data.data.guide, e, 0);
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