
$(window).on("load", function () {
  $(".loading").fadeOut();
});

$(document).ready(function () {
  var whei = $(window).width();
  $("html").css({ fontSize: whei / 20 });
  $(window).resize(function () {
    var whei = $(window).width();
    $("html").css({ fontSize: whei / 20 });
  });

  console.log("页面初始化完成（无图表渲染）");
});
