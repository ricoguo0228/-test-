function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        openid: "",
        usernick: "",
        img: "",
        longitude: "",
        latitude: "",
        address: "",
        tlist: [],
        images: [],
        count: 3,
        addedCount: 0,
        picList: [],
        school: [ {
            s_name: "2"
        } ],
        weight: [],
        sex: [ "限男生", "限女生", "不限性别" ],
        multiIndex: [ 0, 0 ],
        schoolInfo: {},
        weightindex: 0,
        sexindex: 2,
        cuponlist: [],
        buyaddress: {},
        checkbox: [ {
            value: 2,
            name: "2",
            checked: !1,
            hot: !1
        }, {
            value: 3,
            name: "3",
            checked: !1,
            hot: !0
        }, {
            value: 4,
            name: "4",
            checked: !1,
            hot: !1
        }, {
            value: 5,
            name: "5",
            checked: !1,
            hot: !1
        }, {
            value: 6,
            name: "6",
            checked: !1,
            hot: !1
        } ],
        form: {
            out_time_num: 1,
            minfee: 0,
            maxfee: 100,
            fee: 0,
            type: 1,
            showText: "",
            total: 0,
            a_id: -1
        },
        y_money: "",
        goods_det: [],
        good_details: 0,
        total_prices: "",
        userInfo: {},
        point_index: 0,
        point: {},
        unit_price: 0,
        qu_id: 0,
        custom: "",
        timeModal: !1,
        out_time: 1,
        sysparment: {},
        module_id: "",
        attach_file: "",
        is_click: !0,
        extra_price: 0,
        express_num: 1,
        service_num: 0,
        title: "",
        extra_jian_price: 0
    },
    foold: function(t) {
        wx.navigateTo({
            url: "../canteen/canteen"
        });
    },
    title: function(t) {
        this.setData({
            title: t.detail.value.replace(/\s+/g, "")
        });
    },
    numCut: function() {
        if (this.data.express_num > 1) {
            var t = (Number(this.data.form.total) - Number(this.data.form.unit_price)).toFixed(2), e = this.data.express_num, s = Number(Number(this.data.extra_jian_price) - Number(this.data.form.unit_price)).toFixed(2), i = this;
            this.setData({
                form: a({}, i.data.form, {
                    total: t
                }),
                express_num: e - 1,
                extra_jian_price: s
            });
        }
    },
    numAdd: function() {
        var t = (Number(this.data.form.total) + Number(this.data.form.unit_price)).toFixed(2), e = this.data.express_num, s = Number(Number(this.data.extra_jian_price) + Number(this.data.form.unit_price)).toFixed(2), i = this;
        this.setData({
            form: a({}, i.data.form, {
                total: t
            }),
            express_num: e + 1,
            extra_jian_price: s
        });
    },
    formSubmit: function(s) {
        if (console.log("33333", s), !this.data.form.showText || "" == this.data.form.showText.replace(/\s+/g, "")) return e.util.message("请输入订单内容", "", "error"), 
        !1;
        if (this.data.form.total < this.data.y_money) return e.util.message("优惠卷不可用", "", "error"), 
        !1;
        if (4 == this.data.form.type && !this.data.title) return e.util.message("请输入服务标题", "", "error"), 
        !1;
        if (4 == this.data.form.type && 1 == this.data.sysparment.is_servicenum_show && this.data.service_num <= 0) return e.util.message("请输入服务人数", "", "error"), 
        !1;
        if (4 !== this.data.form.type && !this.data.buyaddress) return e.util.message("请选择购买地址", "", "error"), 
        !1;
        if ((1 == this.data.sysparment.is_address_show && 1 == this.data.sysparment.is_address_must && 4 == this.data.form.type || 4 != this.data.form.type) && (!this.data.form.a_id || this.data.form.a_id < 0)) return e.util.message("请选择地址", "", "error"), 
        !1;
        if (1 == this.data.sysparment.is_attach_show && 1 == this.data.sysparment.is_attach_must && 4 == this.data.form.type && !this.data.attach_file) return e.util.message("请上传附件", "", "error"), 
        !1;
        if (console.log("989898980", this.data.t_pic), this.data.t_pic) this.data.t_pic[0]; else ;
        if (e.globalData.issub = !0, 3 == this.data.form.type) {
            if (!this.data.good_details) return e.util.message("请选择商品", "", "error"), !1;
            (o = this).data.is_click ? (o.setData({
                is_click: !1
            }), e.util.request({
                url: "entry/wxapp/OrderPost",
                data: a(t({
                    guess_prcie: this.data.form.guess_prcie,
                    express_num: this.data.express_num,
                    store_id: wx.getStorageSync("store_id"),
                    desc: this.data.form.showText,
                    qu_latitude: this.data.buyaddress.location_x ? this.data.buyaddress.location_x : wx.getStorageSync("city").location.lng,
                    qu_longitude: this.data.buyaddress.location_y ? this.data.buyaddress.location_y : wx.getStorageSync("city").location.lat,
                    qu_addres: this.data.buyaddress.address,
                    weight: this.data.weight[this.data.weightindex],
                    sex_limit: this.data.sexindex,
                    start_time: this.data.tlist[0][this.data.multiIndex[0]] + " " + this.data.tlist[1][this.data.multiIndex[1]]
                }, "guess_prcie", this.data.total_prices), this.data.form, {
                    sh_school: wx.getStorageSync("schoolId"),
                    openid: wx.getStorageSync("openid"),
                    out_time_num: this.data.form.out_time_num,
                    img: this.data.picList,
                    attach_file: "",
                    good_details: this.data.good_details
                }),
                success: function(t) {
                    console.log("1111111", t), "优惠券已支付" == t.data.message || "会员已抵扣" == t.data.message ? (wx.showToast({
                        title: t.data.message,
                        icon: "loading",
                        duration: 3e3
                    }), e.util.request({
                        url: "entry/wxapp/sendSubscribeMessage",
                        data: {
                            ordersn: t.data.data.ordersn
                        }
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "/gc_school/pages/order/index?type=1"
                        });
                    }, 2e3), wx.removeStorage({
                        key: "json"
                    })) : (console.log(t.data.data.ordersn), wx.requestPayment({
                        timeStamp: t.data.data.wdata.timeStamp.toString(),
                        nonceStr: t.data.data.wdata.nonceStr,
                        package: t.data.data.wdata.package,
                        signType: "MD5",
                        paySign: t.data.data.wdata.sign,
                        success: function(a) {
                            console.log("success"), console.log(t.data.data), e.util.request({
                                url: "entry/wxapp/sendSubscribeMessage",
                                data: {
                                    ordersn: t.data.data.ordersn
                                }
                            }), setTimeout(function() {
                                wx.switchTab({
                                    url: "/gc_school/pages/order/index?type=1"
                                });
                            }, 2e3);
                        },
                        fail: function(t) {
                            console.log("fail");
                        }
                    }));
                },
                complete: function() {
                    o.setData({
                        is_click: !0
                    });
                }
            })) : wx.showToast({
                title: "请勿重复点击",
                icon: "none"
            });
        } else {
            if (1 == this.data.form.type) {
                if (0 == (i = this.data.qu_id)) return e.util.message("请选择取件快递点", "", "error"), 
                !1;
            } else var i = this.data.buyaddress.address;
            var o = this;
            o.data.is_click ? (o.setData({
                is_click: !1
            }), e.util.request({
                url: "entry/wxapp/OrderPost",
                data: a({
                    service_time: this.data.sysparment.is_servicetime_show,
                    address_must: this.data.sysparment.is_address_must,
                    address_show: this.data.sysparment.is_address_show,
                    guess_prcie: this.data.form.guess_prcie,
                    express_num: this.data.express_num,
                    service_num: this.data.service_num,
                    desc: this.data.form.showText,
                    qu_latitude: this.data.buyaddress.location_x ? this.data.buyaddress.location_x : wx.getStorageSync("city").location.lng,
                    qu_longitude: this.data.buyaddress.location_y ? this.data.buyaddress.location_y : wx.getStorageSync("city").location.lat,
                    qu_addres: i,
                    weight: this.data.weight[this.data.weightindex],
                    sex_limit: this.data.sexindex,
                    attach_file: this.data.attach_file,
                    start_time: this.data.tlist[0][this.data.multiIndex[0]] + " " + this.data.tlist[1][this.data.multiIndex[1]]
                }, this.data.form, {
                    sh_school: wx.getStorageSync("schoolId"),
                    openid: wx.getStorageSync("openid"),
                    out_time_num: this.data.form.out_time_num,
                    img: this.data.picList,
                    good_details: this.data.good_details,
                    title: this.data.title
                }),
                success: function(t) {
                    console.log("1111111", t), "优惠券已支付" == t.data.message || "会员已抵扣" == t.data.message ? (wx.showToast({
                        title: t.data.message,
                        icon: "loading",
                        duration: 3e3
                    }), e.util.request({
                        url: "entry/wxapp/sendSubscribeMessage",
                        data: {
                            ordersn: t.data.data.ordersn
                        }
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "/gc_school/pages/order/index?type=1"
                        });
                    }, 2e3)) : (console.log(t.data.data.ordersn), wx.requestPayment({
                        timeStamp: t.data.data.wdata.timeStamp.toString(),
                        nonceStr: t.data.data.wdata.nonceStr,
                        package: t.data.data.wdata.package,
                        signType: "MD5",
                        paySign: t.data.data.wdata.sign,
                        success: function(a) {
                            console.log("success"), console.log(t.data.data.ordersn), e.util.request({
                                url: "entry/wxapp/sendSubscribeMessage",
                                data: {
                                    ordersn: t.data.data.ordersn
                                }
                            }), setTimeout(function() {
                                wx.switchTab({
                                    url: "/gc_school/pages/order/index?type=1"
                                });
                            }, 2e3);
                        },
                        fail: function(t) {
                            console.log("fail");
                        }
                    }));
                },
                complete: function() {
                    o.setData({
                        is_click: !0
                    });
                }
            })) : wx.showToast({
                title: "请勿重复点击",
                icon: "none"
            });
        }
    },
    sliderchange: function(t) {
        console.log("qqqqqqq", t), this.setData({
            out_time: t.detail.value
        }), console.log("时间", this.data.out_time);
    },
    uploadfile: function() {
        var t = this;
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success: function(a) {
                console.log(a.tempFiles[0].path), wx.uploadFile({
                    url: e.util.url() + "c=entry&a=wxapp&do=fileUpload&m=gc_school",
                    filePath: a.tempFiles[0].path,
                    name: "file",
                    success: function(a) {
                        var e = JSON.parse(a.data).data;
                        t.setData({
                            attach_file: e
                        }), console.log(e);
                    }
                });
            }
        });
    },
    handleshaddress: function() {
        wx.navigateTo({
            url: "/gc_school/pages/address/index"
        });
    },
    handlescupon: function() {
        if (1 == this.data.userInfo.is_vip) {
            var t = (this.data.form.total - this.data.form.MinRunPrice).toFixed(2);
            wx.navigateTo({
                url: "/gc_school/pages/cupon/index?fee=" + t
            });
        } else wx.navigateTo({
            url: "/gc_school/pages/cupon/index?fee=" + this.data.form.total
        });
    },
    pointChange: function(t) {
        console.log(t.detail.value);
        var a = this;
        console.log("id是", a.data.point[t.detail.value].id), this.setData({
            point_index: t.detail.value,
            qu_id: a.data.point[t.detail.value].id
        }), console.log("qu_id", a.data.point[t.detail.value].id);
    },
    textareaAInputbuyaddress: function(t) {
        this.setData({
            buyaddress: a({}, this.data.buyaddress, {
                address: t.detail.value
            })
        });
    },
    totalchange: function(t) {
        var a;
        t.detail.value;
        console.log("总价", this.data.form.total);
        var e = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
        e.test(t.detail.value) && (a = t.detail.value.replace(e, "$2$3$4")), console.log(a);
        for (var s = this.data.checkbox, i = 0; i < s.length; ++i) s[i].checked = !1;
        this.setData({
            custom: a
        });
    },
    ChooseCheckbox: function(t) {
        console.log("hhhhhhhh", t);
        for (var e = this.data.checkbox, s = t.currentTarget.dataset.value, i = t.currentTarget.dataset.index, o = 0; o < e.length; ++o) e[o].checked = !1, 
        o == i && (e[o].checked = !0);
        if (console.log("kkkkkkkkkkkkkkk", this.data.form), s < this.data.form.MinRunPrice) return wx.showToast({
            title: "最少费用是" + this.data.form.MinRunPrice,
            icon: "none"
        }), this.setData({
            form: a({}, this.data.form, {
                total: this.data.form.MinRunPrice
            })
        }), !1;
        this.setData({
            form: a({}, this.data.form, {
                total: s
            }),
            checkbox: e,
            modalName: ""
        });
    },
    PickerChange: function(e) {
        var s = this;
        console.log(e);
        var i = (Number(this.data.form.total) + Number(e.detail.value * this.data.form.unit_price) - Number(this.data.extra_price)).toFixed(2);
        console.log(i), console.log(this.data.extra_jian_price), this.setData({
            extra_price: Number(e.detail.value * this.data.form.unit_price)
        }), console.log(this.data.form.total), this.setData(t({}, e.currentTarget.dataset.index, e.detail.value)), 
        "weightindex" == e.currentTarget.dataset.index && this.setData({
            form: a({}, s.data.form, {
                total: i
            })
        });
    },
    MultiChange: function(t) {
        this.setData({
            multiIndex: t.detail.value
        });
    },
    MultiColumnChange: function(t) {
        0 == t.detail.column && this.setData({
            multiIndex: [ t.detail.value, 0 ],
            tlist: [ this.data.tlist[0], this.alltime[t.detail.value].times ]
        });
    },
    confinModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    showModal: function(t) {
        if ("cupon" == t.currentTarget.dataset.target && 0 == this.data.cuponlist.length) return !1;
        this.setData({
            modalName: t.currentTarget.dataset.target
        });
    },
    timeModal: function() {
        this.setData({
            timeModal: !0
        });
    },
    timeHide: function(t) {
        var e = this;
        console.log(t.currentTarget.dataset.type), this.setData({
            timeModal: !1
        }), 2 == t.currentTarget.dataset.type && this.setData({
            form: a({}, this.data.form, {
                out_time_num: e.data.out_time
            })
        });
    },
    hideModals: function() {
        this.setData({
            modalName: null
        });
    },
    hideModal: function(t) {
        if ("ChooseModal" == this.data.modalName && (console.log("执行这里"), Number(this.data.form.total) < Number(this.data.form.MinRunPrice))) wx.showToast({
            title: "最少费用是" + this.data.form.MinRunPrice,
            icon: "none"
        }); else if (console.log("custom", this.data.custom), console.log("最低金额", this.data.form.MinRunPrice), 
        console.log("优惠金额", this.data.y_money), this.data.y_money > this.data.custom) e.util.message("金额不可低于优惠券金额", "", "error"); else if (void 0 != this.data.custom) if (this.data.custom < 0) e.util.message("输入金额有误", "", "error"); else {
            var s = Number(Number(this.data.form.MinRunPrice) + Number(this.data.extra_price) + Number(this.data.extra_jian_price)).toFixed(2);
            console.log("不低于", s), Number(this.data.custom) < s ? e.util.message("金额不能低于" + s, "", "error") : (this.setData({
                form: a({}, this.data.form, {
                    total: this.data.custom
                })
            }), this.setData({
                modalName: null
            }));
        } else e.util.message("请输入正确的数字", "", "error");
    },
    service_num: function(t) {
        this.setData({
            service_num: t.detail.value
        });
    },
    guess_prcieAInput: function(t) {
        this.setData({
            form: a({}, this.data.form, {
                guess_prcie: t.detail.value
            })
        });
    },
    textareaAInput: function(t) {
        this.setData({
            form: a({}, this.data.form, {
                showText: t.detail.value
            })
        });
    },
    onChangeTips: function(t) {
        this.setData({
            form: a({}, this.data.form, {
                fee: t.detail.value
            })
        }), console.log(t);
    },
    onSelectBuyAddress: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                var e = {
                    address: a.name + "-" + a.address,
                    name: a.name,
                    location_x: a.latitude,
                    location_y: a.longitude
                };
                t.setData({
                    buyaddress: e
                });
            },
            fail: function(t) {},
            complet: function(t) {
                console.log(t);
            }
        });
    },
    upload: function(a, s) {
        var i = this;
        console.log("连接", e.util.url()), wx.showLoading(), wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
            filePath: a.tempFilePaths[0],
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            name: "file",
            success: function(a) {
                console.log("打印", a);
                var e = a.data;
                e = JSON.parse(e).data, wx.hideLoading(), i.setData(t({}, s, [ e ])), "t_pic" == s && i.setData({
                    showsfzupload: !1
                });
            }
        });
    },
    ChooseImage: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                console.log("path", e), a.upload(e, t.currentTarget.dataset.type);
            }
        });
    },
    DelImg: function(a) {
        var e = this;
        wx.showModal({
            title: "删除图片",
            content: "确定要删除？",
            cancelText: "取消",
            confirmText: "确定",
            success: function(s) {
                if (s.confirm) {
                    var i;
                    e.data[a.currentTarget.dataset.type].splice(a.currentTarget.dataset.index, 1), e.setData((i = {}, 
                    t(i, a.currentTarget.dataset.type, e.data.imgList), t(i, "showsfzupload", !0), i));
                }
            }
        });
    },
    onLoad: function(t) {
        console.log("传递的值", t), t.type && t.type, console.log("ghfghghfs", t), this.setData({
            module_id: t.id
        }), this.setData({
            form: a({}, this.data.form, {
                type: t.type
            })
        }), this.getDefaultPrice(), this.getuserInfo(), this.getTimeList(), this.getconfig();
    },
    getconfig: function() {
        wx.login({
            success: function(t) {
                console.log(t), wx.requestSubscribeMessage({
                    tmplIds: [ "Oj0nXf0BEyorPc4TKf3cdMsSUo-ZxncKKcPPbgMUggY" ],
                    success: function(t) {
                        console.log("已授权接收订阅消息");
                    },
                    fail: function(t) {
                        console.log("错误", t);
                    }
                });
            }
        });
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(a) {
                console.log("获取配置", a.data.data), t.setData({
                    sysparment: a.data.data.sys
                });
            }
        });
    },
    getuserInfo: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/UserInfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                t.setData({
                    userInfo: a.data.data.info
                });
            }
        });
    },
    getDefaultPrice: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/MinRunPrice",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId"),
                module_id: t.data.module_id
            },
            success: function(e) {
                t.setData({
                    form: a({}, t.data.form, {
                        total: e.data.data.info.min_runprice,
                        MinRunPrice: e.data.data.info.min_runprice,
                        unit_price: e.data.data.info.unit_price
                    }),
                    point: e.data.data.point,
                    weight: e.data.data.school.step
                }), e.data.data.point.length > 0 && t.setData({
                    qu_id: e.data.data.point[0].id
                }), console.log(e.data.data.point);
            }
        });
    },
    getTimeList: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/TimeList",
            data: {
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                for (var e = [ [], [] ], s = 0; s < a.data.data.time.length; s++) {
                    e[0].push(a.data.data.time[s].day);
                    var i = [];
                    for (var o in a.data.data.time[s].times) i.push(a.data.data.time[s].times[o]);
                    0 == s && (e[1] = i), a.data.data.time[s].times = i;
                }
                console.log(a.data.data.time), t.alltime = a.data.data.time, t.setData({
                    tlist: e
                });
            }
        });
    },
    getCupon: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/MyCouponList",
            data: {
                openid: wx.getStorageSync("openid"),
                s_id: wx.getStorageSync("schoolId")
            },
            success: function(a) {
                console.log("23233232", a), t.setData({
                    cuponlist: a.data.data.list
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.jise();
        var a = getCurrentPages(), e = a[a.length - 1];
        console.log("获取地址id", e.data);
        var s = Number(e.data.form.y_money);
        console.log("33333", s), t.setData({
            y_money: s
        });
    },
    jise: function() {
        var t = this, a = wx.getStorageSync("json");
        a && e.util.request({
            url: "entry/wxapp/SumMoney",
            data: {
                goods_det: a
            },
            success: function(a) {
                console.log("666666", a), t.setData({
                    goods_det: a.data.data.data,
                    total_prices: a.data.data.total_prices
                });
                for (var e = [], s = a.data.data.data, i = 0; i < s.length; i++) {
                    var o = s[i].restaurant_name + " - " + s[i].store_name + " - " + s[i].goods_name + " - " + s[i].nums + "份 - " + s[i].price + "元/份";
                    e.push(o);
                }
                e = e.join(",");
                console.log("jjjjj", e), t.setData({
                    good_details: e
                });
            }
        });
    },
    chooseImages: function() {
        console.log("执行几级");
        var t = this;
        wx.chooseImage({
            count: 3 - t.data.addedCount,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.uploadimg({
                    path: a.tempFilePaths
                });
            }
        });
    },
    uploadimg: function(t) {
        wx.showLoading({
            title: "上传中...",
            mask: !0
        });
        var a = this;
        console.log("打印", t.path), console.log("打印", t.path.length);
        for (var s = a.data.addedCount, i = 0; i < t.path.length; i++) console.log("走这里", t.path[i]), 
        wx.uploadFile({
            url: e.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
            filePath: t.path[i],
            name: "file",
            formData: null,
            success: function(t) {
                var e = JSON.parse(t.data);
                if (0 == e.errno) {
                    s++, console.log(e);
                    var i = a.data.picList;
                    i.push(e.data), console.log(i);
                    var o = a.data.images.concat(e.data);
                    a.setData({
                        images: o,
                        picList: i,
                        addedCount: s
                    }), s == a.data.picList.length && wx.hideLoading({});
                } else wx.showToast({
                    title: e.message,
                    icon: "none"
                });
            }
        });
    },
    deleteImage: function(t) {
        this.data.images.splice(t.detail, 1), this.data.picList.splice(t.detail, 1), this.setData({
            images: this.data.images,
            picList: this.data.picList,
            addedCount: this.data.addedCount - 1
        }), console.log(this.data.picList);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});