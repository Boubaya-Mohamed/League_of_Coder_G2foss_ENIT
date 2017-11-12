$(document).ready(function(){
  $('.documentation_list_item').click(function() {
    var id = $(this).attr("href");
    var offset = $(id).offset().top - 86;
    $('html, body').animate({scrollTop: offset}, 'slow');
    return false;
  });
});