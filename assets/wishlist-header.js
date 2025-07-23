// js for header wishlist icon starts
$(document).ready(function () {
  $(".button-floating").click(function (e) {
    e.stopPropagation();
    $(".popup-wishlist").fadeIn();
    // $("body").css("overflow", "hidden");
    $("body").addClass("overflow");
  });
  $(".close-btn, .gradient").click(function () {
    $(".popup-wishlist").fadeOut();
    $("body").removeClass("overflow");
    // $("body").css("overflow", "visible");
  });
  $(".wishlist-content").click(function (e) {
    e.stopPropagation();
  });
});
// js for header wishlist icon ends
