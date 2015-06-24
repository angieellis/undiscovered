$(document).ready(function(){
	$('.signinbox').hide();
	$('.signupbox').hide();

	$('.signin').click(function(){
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

