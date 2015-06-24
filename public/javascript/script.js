$(document).ready(function(){
	$('.signin').click(function(){
		console.log("a");
		$('.signupbox').hide();
		$('.signinbox').fadeIn();
	});
	$('.signup').click(function(){
		$('.signinbox').hide();
		$('.signupbox').fadeIn();
	});
	$('.close').click(function(){
		$('.signinbox').hide();
		$('.signupbox').hide();
	});
});

