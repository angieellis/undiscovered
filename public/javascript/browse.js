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
			console.log("success");
		}).fail(function(response){
			console.log("error");
		});
	};
};


