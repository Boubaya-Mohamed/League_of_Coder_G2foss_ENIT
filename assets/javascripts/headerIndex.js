$(document).click(function(e) {
  var target = e.target;

  if (($('.header_nav_list.hide-sm').hasClass('active')) && !$(target).is('#header_button') && !$(target).parents().is('header.header')) {
    $(".header_nav_list.hide-sm").removeClass("active");
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      if (!$('.header_nav_list.hide-sm').hasClass('active'))
      {
        $('header.header').removeClass('header_colored');
        $('header.header').removeClass('shaddow');
      }
    }
  }

  if (($('.header_nav_list_submenus').hasClass('active')) && (!$(target).is('.header_nav_list_item.header_nav_list_submenu')) && (!$(target).is('.header_nav_list_submenus_item')) && (!$(target).is('.header_nav_list_submenus')))
  {
    $(".header_nav_list_submenus").removeClass("active");
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      $('header.header').removeClass('header_colored');
      $('header.header').removeClass('shaddow');
    }
  }
});

$("#header_button").click(function(){
  //$(".header_nav_list.hide-sm").toggleClass("active");
  if ($('.header_nav_list.hide-sm').hasClass('active'))
  {
    $('.header_nav_list.hide-sm').removeClass('active');
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      $('header.header').removeClass('header_colored');
      $('header.header').removeClass('shaddow');
    }
  }else {
    $('.header_nav_list.hide-sm').addClass('active');
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      $('header.header').addClass('header_colored');
      $('header.header').addClass('shaddow');
    }
  }

});

$(document).ready(function() {
  $(".typed").typed({
    strings: ["League of <span class='coloredP'>CODERS</span>", "<span class='coloredP'>G2FOSS</span> Collegiate Programming Contest"],
    typeSpeed: 100,
    backDelay: 2000,
    contentType: 'html',
    loop: true
  });

});


function adaptNavbar() {
  var scroll = $(window).scrollTop();
  if (scroll >= 10) {
    $('header.header').addClass('header_colored');
    $('header.header').addClass('shaddow');
  }else {
    if ((!$('.header_nav_list.hide-sm').hasClass('active'))&&(!$('.header_nav_list_submenus').hasClass('active')))
    {
      $('header.header').removeClass('header_colored');
      $('header.header').removeClass('shaddow');
    }
  }
}

$(function() {
  $(document).ready(function() {
    adaptNavbar();
  });
  $(window).scroll(function() {
    adaptNavbar();
  });
});


function adaptCover() {
  var windowHeight = $(window).height();
  if (windowHeight>500) {
    $('.index_cover').height(windowHeight);
  }else {
    $('.index_cover').height(600);
  }
}
$(function() {
  $(document).ready(function() {
    adaptCover();
  });
  $(window).resize(function() {
    adaptCover();
  });
});


$(".header_nav_list_item.header_nav_list_submenu").click(function(){
  //  $(".header_nav_list_submenus").toggleClass("active");
  if ($('.header_nav_list_submenus').hasClass('active'))
  {
    $('.header_nav_list_submenus').removeClass('active');
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      $('header.header').removeClass('header_colored');
      $('header.header').removeClass('shaddow');
    }
  }else {
    $('.header_nav_list_submenus').addClass('active');
    var scroll = $(window).scrollTop();
    if (scroll<10) {
      $('header.header').addClass('header_colored');
      $('header.header').addClass('shaddow');
    }
  }


});
