$(document).on('click', '#tour-submit', function(e){
	e.preventDefault();
	console.log("toursnew");
	$.ajax({
		url:"/tours/new",
		type:"POST",
		data: {
			title:$('#title').val(),
			description:$('#description').val(),
			video_id:$('#video-id').val(),
			coordinates:[$('#latitude').val(), $('#longitude').val()],
			state:$('#state').val(),
			city:$('#city').val()
		}
	}).done(function(response){
		console.log(response);
	}).fail(function(response){
		console.log(response);
	});
});