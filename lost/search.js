var t = getApp();

Page({
    data: {
        url: "",
        info: [ 1, 2, 3 ],
        index_swiperCurrent: 0,
        cateList: [ {
            name: "失物招领"
        }, {
            name: "寻物启事"
        } ],
        cate_index: 0,
        dataList: [],
        type: 1,
        is_loadmore: !0,
        page: 1,
        slideList: [],
        freshen: !0,
        kwd: ""
    },
    onLoad: function(t) {},
    toDetail: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "/gc_school/pages/lost/detail?id=" + t.currentTarget.dataset.id
        });
    },
    preview: function(t) {
        this.setData({
            freshen: !1
        }), wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: t.currentTarget.dataset.list
        });
    },
    searchInput: function(a) {
        var e = a.detail.value.replace(/\s+/g, "");
        e ? (this.setData({
            kwd: e,
            page: 1,
            dataList: [],
            is_loadmore: !0
        }), this.search(e)) : t.util.message("请输入物品", "", "error");
    },
    search: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/lostSearch",
            method: "POST",
            data: {
                s_id: wx.getStorageSync("schoolId"),
                kwd: a,
                page: e.data.page
            },
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 5 && e.setData({
                    is_loadmore: !1
                });
                for (var a = 0; a < t.data.data.length; a++) e.data.dataList.push(t.data.data[a]), 
                e.setData({
                    dataList: e.data.dataList
                });
            }
        });
    },
    upload: function() {
        var t = this;
        wx.chooseMedia({
            success: function(a) {
                console.log(a), console.log(a.type), console.log(a.tempFiles[0].tempFilePath), t.setData({
                    url: a.tempFiles[0].tempFilePath
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
        this.data.is_loadmore ? (this.setData({
            page: this.data.page + 1
        }), this.search(this.data.kwd)) : wx.showToast({
            title: "没有更多数据了~",
            icon: "none"
        });
    },
    onShareAppMessage: function() {}
});