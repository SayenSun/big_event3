$(function() {
    getUserInfo();

    // 实现退出功能
    $("#quit").on("click", function() {
        layer.confirm("确定要退出吗?", { icon: 3, title: "提示" }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html";
            layer.close(index);
        });
    });
});
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: { Authorization: localStorage.getItem("token") || "" },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败!");
            }
            layer.msg("获取用户信息成功!");
            // 渲染头像
            // console.log(res);
            // console.log(res.data);
            renderAvatar(res.data);
        },
    });
}
// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").prop("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}