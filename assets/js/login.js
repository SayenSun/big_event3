$(function() {
    var form = layui.form;
    var layer = layui.layer;

    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 登录表单提交事件
    $("#form-login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取登录信息失败!");
                }
                layer.msg("获取登录信息成功!");
                location.href = "../../index.html";
            },
        });
    });
    form.verify({
        username: function(value, item) {
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return "用户名不能有特殊字符";
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return "用户名首尾不能出现下划线'_'";
            }
            if (/^\d+\d+\d$/.test(value)) {
                return "用户名不能全为数字";
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repass: function(value) {
            if (value !== $(".reg-box [name=password]").val()) {
                return "两次密码输入不一致!";
            }
        },
    });

    // 注册表单提交事件
    $("#form-reg").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://api-breakingnews-web.itheima.net/api/reguser",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取注册信息失败!");
                }
                layer.msg("获取注册信息成功!");
                $("#link_login").click();
            },
        });
    });
});