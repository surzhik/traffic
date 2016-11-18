$(document).ready(function() {
    mobileSearchUtil();
    $("body").on("click", ".menu-button-bars", function() {
        var e = $("body");
        if (e.hasClass("sidebar-open")){
            e.removeClass("sidebar-open");
            $(".wrapper").removeAttr("style");
            e.find(".sidebar").removeAttr("style");
        } else{
            e.addClass("sidebar-open"); 
            $(".wrapper").css("margin-left", "212px");
            setTimeout(function(){
                e.find(".sidebar").css("z-index", 1);
            }, 400);
        }
    })
});
$(window).resize(function() { mobileSearchUtil() });

function mobileSearchUtil() {
    var e = function() {
            var e = $(".header-searchbox form input");
            0 === e.width() ? e.addClass(" mobileSearchUtil") : e.removeClass("mobileSearchUtil")
        },
        i = $(".header-searchbox form button");
    $(window).width() < 992 ? (i.attr("type", "button"), i.bind("click", e)) : (i.attr("type", "submit"), i.unbind("click", e))
}

