function getCurrentPosition(){
	(function(){
		navigator.geolocation.getCurrentPosition(function(position) {
	  	// console.log(position.coords.latitude, position.coords.longitude);
	  	var currentPosition = {"lng": position.coords.longitude, "lat": position.coords.latitude}
	  	ajaxRequest(currentPosition);
		});
	}());

	function ajaxRequest(position) {
		console.log("ajax position: ", position);
		$.ajax({
			url: "/browse",
			type: "POST",
			data: position
		}).done(function(response){
			console.log(response);
			var template = $("#selected-tour-template").html();
      var compiled = Handlebars.compile(template);

      $(".browse-container").html("")
      $(".browse-container").append("<h2 class='browse-title'>Tours Near You</h2>")
      $(".not-index").empty()

      for (var i=0; i < response.length; i++) {
        var html = compiled(response[i]);
			console.log(html);
        $(".browse-container").append(html);
      }
		}).fail(function(response){
			console.log("error");
		});
	};
};


