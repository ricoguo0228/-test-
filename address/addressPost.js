var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = getApp();

Page({
    data: {
        options: {},
        school: [],
        form: {
            id: "",
            sex: 0,
            addres: "",
            name: "",
            phone: ""
        },
        index: "",
        address: {
            location_y: "",
            location_x: "",
            address: ""
        }
    },
    PickerChange: function(t) {
        console.log(t), this.setData({
            index: t.detail.value
        });
    },
    change: function(a) {
        console.log(a);
        var e = a.currentTarget.dataset.type, o = this.data.form;
        o[e] = a.detail.value, this.setData({
            form: t({}, o)
        });
    },
    formSubmit: function(e) {
        var o = this;
        return console.log("表单值", o.data.form), console.log("联系人", o.data.form.name), console.log("联系人", o.data.form.name.replace(/\s+/g, "")), 
        this.data.index ? e.detail.value.addres && "" != o.data.form.addres.replace(/\s+/g, "") ? e.detail.value.name && "" != o.data.form.name.replace(/\s+/g, "") ? /^1[3456789]\d{9}$/.test(e.detail.value.phone) ? void a.util.request({
            url: o.data.form.a_id ? "entry/wxapp/MyAddresPost" : "entry/wxapp/MyAddresAdd",
            data: t({}, o.data.form, e.detail.value, {
                s_id: o.data.school[o.data.index].s_id,
                openid: wx.getStorageSync("openid"),
                longitude: wx.getStorageSync("city").location.lng,
                latitude: wx.getStorageSync("city").location.lat
            }),
            success: function(t) {
                wx.navigateBack({});
            }
        }) : (a.util.message("手机号有误", "", "error"), !1) : (a.util.message("请输入联系人", "", "error"), 
        !1) : (a.util.message("请输入具体地址", "", "error"), !1) : (a.util.message("请选择学校", "", "error"), 
        !1);
    },
    SexChange: function(a) {
        this.setData({
            form: t({}, this.data.form, {
                sex: a.detail.value ? 0 : 1
            })
        });
    },
    ycf: function(a) {
        console.log(a.detail.value), this.setData({
            form: t({}, this.data.form, {
                sex: a.detail.value
            })
        }), console.log("form值", this.data.form);
    },
    getSchool: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/SchoolList",
            data: {
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                t.setData({
                    school: a.data.data.list
                }), t.school = a.data.data.list;
            }
        });
    },
    getMyAddresInfo: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/MyAddresInfo",
            data: {
                a_id: this.data.options.id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                console.log(a);
                for (var e = 0; e < t.data.school.length; e++) t.data.school[e].s_id == a.data.data.s_id && t.setData({
                    index: String(e)
                });
                t.setData({
                    form: a.data.data
                });
            }
        });
    },
    onLoad: function(t) {
        this.getSchool(), this.setData({
            options: t
        }), t.id && this.getMyAddresInfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});