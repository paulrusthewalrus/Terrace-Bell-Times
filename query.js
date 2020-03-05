//customisable variables
let GUIFadeOut = 200;
let GUIFadeIn = 700;

//when the document is fully loaded
$(document).ready(() => {

	//when it enters, change the width and left
	$('#heading').on('mouseenter',() => {
		$('#headhr').css('width','120px');
		$('#headhr').css('left','155px');
	});

	//when it leaves, bring it back to normal
	$('#heading').on('mouseleave',() => {
		$('#headhr').css('width','90px');
		$('#headhr').css('left','170px');
	})

	//user interaction with the help button
	$('#help').on('mouseenter',() => {

		//fade out all GUI panels
		$('.options').fadeOut(GUIFadeOut);
		$('.colours').fadeOut(GUIFadeOut);
		$('.adjust').fadeOut(GUIFadeOut);

		//fade in the help panel
		$('.helpbox').fadeIn(700);

	});

	//when the user leaves the help button
	$('#help').on('mouseleave',() => {
		//fade out the help panel
		$('.helpbox').fadeOut(300);

		//fade in all GUI panels
		$('.options').fadeIn(700);
		$('.colours').fadeIn(700);
		$('.adjust').fadeIn(700);

	});




});