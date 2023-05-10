var e = getApp();

Page({
    data: {
        type: "",
        video: "",
        addedCount: 0,
        picList: [],
        images: [],
        content: "",
        cateList: [ "请选择", "失物招领", "寻物启事" ],
        cate: 0,
        date: "请选择",
        is_click: !0,
        goods: ""
    },
    onLoad: function(e) {},
    onReady: function() {},
    bindPickerChange: function(e) {
        this.setData({
            cate: e.detail.value
        });
    },
    bindPickerDate: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    choose: function() {
        var e = this;
        wx.chooseMedia({
            count: 3 - e.data.addedCount,
            success: function(t) {
                console.log(t), console.log(t.type), e.setData({
                    type: t.type
                }), "image" == t.type ? e.uploadimg(t.tempFiles, "ImgPost") : e.uploadvideo(t.tempFiles);
            }
        });
    },
    uploadvideo: function(t) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        });
        var a = this;
        console.log(t[0]), wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=VideoPost&m=gc_school",
            filePath: t[0].tempFilePath,
            name: "file",
            formData: null,
            success: function(e) {
                console.log(JSON.parse(e.data)), a.setData({
                    video: JSON.parse(e.data).data
                }), wx.hideLoading({});
            }
        });
    },
    uploadimg: function(t, a, o) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        });
        for (var i = this, s = i.data.addedCount, d = 0; d < t.length; d++) wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=" + a + "&m=gc_school",
            filePath: t[d].tempFilePath,
            name: "file",
            formData: null,
            success: function(e) {
                var t = JSON.parse(e.data);
                if (0 == t.errno) {
                    s++;
                    var a = i.data.picList;
                    a.push(t.data);
                    var o = i.data.images.concat(t.data);
                    i.setData({
                        images: o,
                        addedCount: s,
                        picList: a
                    }), console.log(s), console.log("值", i.data.picList.length), s == i.data.picList.length && wx.hideLoading({});
                } else wx.showToast({
                    title: t.message,
                    icon: "none"
                });
            }
        });
    },
    delvideo: function() {
        this.setData({
            video: ""
        }), console.log(this.data.video);
    },
    delimg: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.addedCount - 1;
        this.data.picList.splice(t, 1), this.setData({
            picList: this.data.picList,
            addedCount: a
        });
    },
    goods: function(e) {
        this.setData({
            goods: e.detail.value.replace(/\s+/g, "")
        });
    },
    formSubmit: function(t) {
        console.log(t.detail.value);
        var a = t.detail.value.place.replace(/\s+/g, ""), o = t.detail.value.phone.replace(/\s+/g, ""), i = t.detail.value.remark.replace(/\s+/g, ""), s = t.detail.value.date.replace(/\s+/g, ""), d = t.detail.value.method.replace(/\s+/g, ""), l = /^1[3456789]\d{9}$/;
        if (0 != this.data.cate) if ("" != this.data.goods) if ("" != a) if (!o || l.test(o)) if (this.data.is_click) {
            this.setData({
                is_click: !1
            });
            var n = this;
            e.util.request({
                url: "entry/wxapp/submitLost",
                method: "POST",
                data: {
                    date: s,
                    place: a,
                    method: d,
                    goods: n.data.goods,
                    phone: o,
                    cate: n.data.cate,
                    remark: i,
                    type: n.data.type,
                    video: n.data.video,
                    img: JSON.stringify(n.data.picList),
                    openid: wx.getStorageSync("openid"),
                    s_id: wx.getStorageSync("schoolId")
                },
                success: function(t) {
                    console.log(t.data), n.setData({
                        goods: ""
                    }), 0 == t.data.errno && (wx.showToast({
                        title: "提交成功",
                        icon: "success"
                    }), setTimeout(function() {
                        e.globalData.isload = !0, wx.redirectTo({
                            url: "/gc_school/pages/lost/my"
                        });
                    }, 1e3));
                },
                complete: function() {
                    n.setData({
                        is_click: !0
                    });
                }
            });
        } else wx.showToast({
            title: "请勿重复点击",
            icon: "none"
        }); else e.util.message("请输入正确的手机号", "", "error"); else e.util.message("请输入地点", "", "error"); else e.util.message("请输入物品", "", "error"); else e.util.message("请选择分类", "", "error");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});