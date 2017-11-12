$(document).ready(function() {
  $(".container").append($("<div class='toast_container'></div>"));
});

$(document).on("click",".toast_close", function (e) {
  e.preventdefault;
  $(this).parent().remove();
});




var toasts = 0;
function toast(message, type, delay=3000)
{
  /*
    type: 0 -> success
    type: 1 -> alert
    type: 2 -> info
  */
  var iconType="";
  var icon="";
  switch (type) {
    case 1:
        iconType="toast_icon_alert";
        icon="<i class='fa fa-exclamation-triangle'></i>";
        break;
    case 2:
        iconType="toast_icon_info";
        icon="<i class='fa fa-info-circle'></i>";
        break;
    default:
      iconType="";
      icon="<i class='fa fa-check-circle'></i>";
  }
  toasts++;
  var myToast = "<div class='toast animated fadeInUp' id='ctfoss_toast"+toasts+"'><div class='toast_icon_container "+iconType+"'>"+icon+"</div><p class='toast_message'>"+message+"</p><a class='toast_close'><i class='fa fa-times'></i></a></div>";
  $(".toast_container").append($(myToast));
  $("#ctfoss_toast"+toasts).delay(delay).fadeOut("slow");
}
