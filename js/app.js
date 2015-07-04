$(function() {

$('.description').hide().fadeIn(2500);

$('#answerForm, .question').hide();

$('#next').submit(function(event){
	event.preventDefault();
	$('.instructions').fadeOut(1000, function(){
		$('#answerForm, .question').fadeIn(300);
	}); //End fadeOut
	
	$(this).find('#btn').val('Next');
	$('h1.intro').html('Remember to put a <span class="laugh">SMILE</span> on your face!');
	
})//End submit function





}); //End Ready

