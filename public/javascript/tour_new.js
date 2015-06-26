String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalizeString = function() {
	return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

$(document).on('click', '#tour-submit', function(e){
	e.preventDefault();
	var tourParams = {
		title: $('#title').val().capitalizeString(),
		description: $('#description').val().capitalizeFirstLetter(),
		video_id: "4429jwyj0BQ",
		coordinates: { "lng": $('#longitude').val(), "lat": $('#latitude').val()},
		state: $('#state').val().toUpperCase(),
		city: $('#city').val().capitalizeString()
	};

	$.ajax({
		url:"/tours/new",
		type:"POST",
		data: tourParams
	}).done(function(response){
		console.log(response);
		window.location.href = '/tours/display/' + response;
	}).fail(function(response){
		console.log(response);
	});
});

