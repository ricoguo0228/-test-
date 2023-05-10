var t = getApp();

Page({
    data: {
        url: "",
        info: [ 1, 2, 3 ],
        index_swiperCurrent: 0,
        cateList: [],
        cate_index: 0,
        dataList: [],
        type: 1,
        is_loadmore: !0,
        page: 1
    },
    onLoad: function(t) {
        this.getLst();
    },
    toDetail: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "/gc_school/pages/lost/detail?id=" + t.currentTarget.dataset.id
        });
    },
    preview: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: t.currentTarget.dataset.list
        });
    },
    getLst: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/myLost",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                openid: wx.getStorageSync("openid"),
                page: a.data.page
            },
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 5 && a.setData({
                    is_loadmore: !1
                });
                for (var e = 0; e < t.data.data.length; e++) a.data.dataList.push(t.data.data[e]), 
                a.setData({
                    dataList: a.data.dataList
                });
            }
        });
    },
    del: function(a) {
        var e = this;
        console.log(a.currentTarget.dataset.id), wx.showModal({
            content: "确认删除该条信息吗？",
            success: function(o) {
                o.confirm ? t.util.request({
                    url: "entry/wxapp/delLost",
                    data: {
                        id: a.currentTarget.dataset.id,
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(a) {
                        0 == a.data.errno && (wx.showToast({
                            title: a.data.message
                        }), t.globalData.isload = !0, setTimeout(function() {
                            e.setData({
                                page: 1,
                                dataList: [],
                                is_loadmore: !0
                            }), e.getLst();
                        }, 2e3));
                    }
                }) : console.log("取消删除");
            }
        });
    },
    jump: function(t) {
        console.log(t), wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.is_loadmore ? (this.setData({
            page: this.data.page + 1
        }), this.getLst()) : wx.showToast({
            title: "没有更多数据了~",
            icon: "none"
        });
    }
});