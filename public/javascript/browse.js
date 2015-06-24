function getCurrentPosition(){
	(function(){
		navigator.geolocation.getCurrentPosition(function(position) {
	  	// console.log(position.coords.latitude, position.coords.longitude);
	  	var currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
	  	ajaxRequest(currentPosition);
		});
	}());

	function ajaxRequest(position) {
		$.ajax({
			url:"/browse",
			type:"POST",
			data: position
		}).done(function(response){
			console.log("success");
		}).fail(function(response){
			console.log("error");
		});
	};
};


