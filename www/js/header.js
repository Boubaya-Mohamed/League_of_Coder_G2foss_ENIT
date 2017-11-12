$(".header_nav_list_item.header_nav_list_submenu").click(function(){
        $(".header_nav_list_submenus").toggleClass("active");
      });


    $(document).click(function(e) {
    var target = e.target;

    if (($('.header_nav_list.hide-sm').hasClass('active')) && !$(target).is('#header_button') && !$(target).parents().is('header.header')) {
        $(".header_nav_list.hide-sm").removeClass("active");
    }

    if (($('.header_nav_list_submenus').hasClass('active')) && (!$(target).is('.header_nav_list_item.header_nav_list_submenu')) && (!$(target).is('.header_nav_list_submenus_item')) && (!$(target).is('.header_nav_list_submenus')))
    {
      $(".header_nav_list_submenus").removeClass("active");
    }
    });

    $("#header_button").click(function(){
        $(".header_nav_list.hide-sm").toggleClass("active");
      });


$(document).ready(function() {
        $(".typed").typed({
          strings: ["League of <span class='coloredP'>CODERS</span>", "<span class='coloredP'>G2FOSS</span> Collegiate Programming Contest"],
          typeSpeed: 100,
          backDelay: 4000,
          contentType: 'html',
          showCursor: false,
          loop: true
        });
      });
