function getCurrentPosition(){
	var currentPosition;
	navigator.geolocation.getCurrentPosition(function(position) {
  	// console.log(position.coords.latitude, position.coords.longitude);
  	currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
  	// return currentPosition
	});
	debugger
	$.ajax({
		url:"/tours/",
		type:"POST",
		data: currentPosition
	}).done(function(){
		console.log("success");
	}).fail(function(){
		console.log("error");
	});
};


