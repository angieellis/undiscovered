$(document).on('pageload', function() {
  var end = getUrlEnd(window.location.href);

  $.ajax({
    type: 'GET',
    url: '/tours/' + end
  }).done(function(result) {;
    if (window.sessionStorage.userID === result.tour_guide._id) {
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
