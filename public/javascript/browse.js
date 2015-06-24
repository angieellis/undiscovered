function getCurrentPosition(){
	var currentPosition;
	(function(){
		navigator.geolocation.getCurrentPosition(function(position) {
	  	// console.log(position.coords.latitude, position.coords.longitude);
	  	currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
	  	debugger
	  	return currentPosition
		});
	}());
	$.ajax({
		url:"",
		type:"POST",
		data: currentPosition
	}).done(function(response){
		console.log("success");
	}).fail(function(response){
		console.log("error");
	});
};


