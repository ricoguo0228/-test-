function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page({
    data: (t = {
        img_url: [],
        count: 4,
        canphoto: 4,
        imgurl: [],
        name: "",
        newprice: "",
        oldprice: "",
        desc: "",
        phone: "",
        array: [ "全新", "9成新", "8成新", "7成新", "6成新", "5成新以下" ],
        index: 0,
        cateList: [],
        indexs: 0,
        images: []
    }, a(t, "count", 3), a(t, "addedCount", 0), a(t, "picList", []), a(t, "stock", ""), 
    a(t, "sys", {}), t),
    onLoad: function(a) {
        console.log(a), this.getCate(), this.getDetail(a.id), this.setData({
            id: a.id
        }), wx.getStorageSync("phone") && this.setData({
            phone: wx.getStorageSync("phone")
        });
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(a) {
                console.log("获取配置", a.data.data), t.setData({
                    sys: a.data.data.sys
                });
            }
        });
    },
    getCate: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/secondCate",
            data: {
                sid: wx.getStorageSync("schoolId")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    cateList: t.data.data.cate
                });
            }
        });
    },
    getDetail: function(a) {
        var t = this;
        e.util.request({
            url: "entry/wxapp/goodsDetail",
            data: {
                id: a
            },
            success: function(a) {
                console.log(a.data.data), console.log(a.data.data.degree);
                for (e = 0; e < t.data.array.length; e++) t.data.array[e] == a.data.data.degree && t.setData({
                    index: e
                });
                for (var e = 0; e < t.data.cateList.length; e++) t.data.cateList[e].id == a.data.data.cate_id && t.setData({
                    indexs: e
                });
                t.setData({
                    data: a.data.data,
                    images: a.data.data.img,
                    picList: a.data.data.img,
                    addedCount: a.data.data.img.length
                });
            }
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        });
    },
    bindPickerChanges: function(a) {
        this.setData({
            indexs: a.detail.value
        });
    },
    chooseImages: function() {
        console.log("执行几级");
        var a = this;
        wx.chooseImage({
            count: 3 - a.data.addedCount,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                a.setData({}), a.uploadimg({
                    path: t.tempFilePaths
                });
            }
        });
    },
    uploadimg: function(a) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        }), console.log("上传中");
        var t = this, i = t.data.addedCount + a.path.length;
        console.log(t.data.images);
        for (var s = 0; s < a.path.length; s++) wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_market",
            filePath: a.path[s],
            name: "file",
            formData: null,
            success: function(a) {
                var e = JSON.parse(a.data);
                console.log(e);
                var s = t.data.picList;
                s.push(e.data), console.log(s);
                var o = t.data.images;
                console.log(t.data.images), console.log(o), t.setData({
                    images: o,
                    addedCount: i,
                    picList: s
                }), console.log(t.data.addedCount), i == t.data.picList.length && wx.hideLoading({});
            }
        });
    },
    deleteImage: function(a) {
        this.data.images.splice(a.detail, 1), this.data.picList.splice(a.detail, 1), this.setData({
            images: this.data.images,
            picList: this.data.picList,
            addedCount: this.data.addedCount - 1
        }), console.log("删除后的", this.data.picList);
    },
    upload: function() {
        var a = this, t = this.data.img_url;
        console.log(t), wx.showLoading();
        for (var i = 0; i < t.length; i++) wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_market",
            filePath: t[i],
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            name: "file",
            success: function(t) {
                var e = t.data;
                e = JSON.parse(e).data, a.data.imgurl.push(e), console.log(a.data.imgurl), wx.hideLoading();
            }
        });
    },
    formSubmit: function(a) {
        console.log(a);
        var t = this;
        console.log("长度", t.data.picList.length);
        var i = a.detail.value.name.replace(/\s+/g, ""), s = a.detail.value.oldprice.replace(/\s+/g, ""), o = a.detail.value.price.replace(/\s+/g, ""), n = a.detail.value.phone.replace(/\s+/g, ""), d = a.detail.value.content.replace(/\s+/g, ""), c = a.detail.value.stock.replace(/\s+/g, "");
        return o <= 0 ? (e.util.message("现价必须大于0", "", "error"), !1) : c <= 0 ? (e.util.message("请填写库存", "", "error"), 
        !1) : t.data.cateList.length <= 0 ? (e.util.message("请选择分类", "", "error"), !1) : "" == i || "" == s || "" == o || "" == d || "" == n ? (e.util.message("不能有空值", "", "error"), 
        !1) : 0 == t.data.picList.length ? (e.util.message("请上传图片", "", "error"), !1) : /^1[3456789]\d{9}$/.test(n) ? void wx.showModal({
            title: "提示",
            content: "允许接收订阅消息",
            success: function(a) {
                a.confirm && wx.requestSubscribeMessage({
                    tmplIds: [ t.data.sys.second_template_id ],
                    success: function(a) {
                        console.log("已授权接收订阅消息");
                    },
                    complete: function(a) {
                        e.util.request({
                            url: "entry/wxapp/submitSecond",
                            method: "POST",
                            data: {
                                id: t.data.id,
                                name: i,
                                phone: n,
                                oldprice: s,
                                newprice: o,
                                stock: c,
                                content: d,
                                degree: t.data.array[t.data.index],
                                cate_id: t.data.cateList[t.data.indexs].id,
                                img: JSON.stringify(t.data.picList),
                                openid: wx.getStorageSync("openid"),
                                s_id: wx.getStorageSync("schoolId")
                            },
                            success: function(a) {
                                console.log(a.data.data), wx.redirectTo({
                                    url: "/gc_school/pages/secondhand/user"
                                });
                            }
                        });
                    }
                });
            }
        }) : (e.util.message("手机号码格式有误", "", "error"), !1);
    },
    bookNameInput: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    oldpriceInput: function(a) {
        this.setData({
            oldprice: a.detail.value
        });
    },
    newpriceInput: function(a) {
        this.setData({
            newprice: a.detail.value
        });
    },
    phone: function(a) {
        this.setData({
            phone: a.detail.value
        });
    },
    stock: function(a) {
        this.setData({
            stock: a.detail.value
        });
    },
    descInput: function(a) {
        this.setData({
            desc: a.detail.value
        });
    },
    onReady: function() {},
    chooseimage: function() {
        var a = this;
        this.setData({
            imgurl: []
        }), wx.chooseImage({
            count: a.data.canphoto,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                if (t.tempFilePaths, t.tempFilePaths.length > 0) {
                    var e = a.data.img_url;
                    e = e.concat(t.tempFilePaths), a.setData({
                        img_url: e,
                        canphoto: a.data.canphoto - t.tempFilePaths.length
                    }), a.data.img_url.length >= a.data.count ? (a.setData({
                        hideAdd: 1
                    }), wx.showToast({
                        title: "最多上传4张照片",
                        icon: "none"
                    })) : a.setData({
                        hideAdd: 0
                    }), a.upload(a.data.img_url);
                }
            }
        });
    },
    deleteImg: function(a) {
        var t = this.data.img_url, e = a.target.dataset.index;
        t.splice(e, 1), this.setData({
            img_url: t,
            hideAdd: !(this.data.img_url.length < this.data.count)
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});