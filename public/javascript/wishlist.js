$(document).on('click', '.wishlist', function() {
  var end = getUrlEnd(window.location.href);
  console.log("a");
  $.ajax({
    type: 'POST',
    url: '/tours/favorite/' + end
  }).done(function(result) {
    if (window.sessionStorage.userID === result._id) {
      $('.wishlist').css('display', 'none');
    }
  }).fail(function(result) {
    console.log(result);
  })
})

function getUrlEnd(url){
    url = url.split('/');
    url = url.pop();
    return url;
}
