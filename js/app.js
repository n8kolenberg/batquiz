$(function() {

$('.description').hide().fadeIn(2500);
$('#answerForm, .question').hide();

/* ====== Function to validate whether an answer is checked ====== */
// function validateMoveOn () {
// 	if ($('input[type="radio"]').is(':checked')) {
// 		return true;
// 	} else return false;
// } //End validateMoveOn function


// /* ====== Function to clear all checked radios ======*/
// function clearAll () {
// 	$(':checked').removeAttr('checked');
// }


/* ====== Function to add questions to the page ====== */
function addQuestions () {
	$('.question').html(quiz.questions[counter].question);
	$('#a').val(quiz.questions[counter].correct).next().html($('#a').val());
	$('#b').val(quiz.questions[counter].wrong1).next().html($('#b').val());
	$('#c').val(quiz.questions[counter].wrong2).next().html($('#c').val());
	$('#d').val(quiz.questions[counter].wrong3).next().html($('#d').val());
}



/* ====== Function to check whether user picked right answer ======*/
// function checkRightAnswer () {
// 	if( $('input[type="radio"]:checked').val() == quiz.questions[counter].correct ) {
// 		correctAnswers++;
// 		console.log(correctAnswers);
// 	}
// } //End pickedRightAnswer function



var counter = 0;
var correctAnswers = 0;

var quiz = {
	questions : [

		{
			question : "Whose nipples caused controversy when they tried to play you in a movie?",
			correct : "George Clooney",
			wrong1 : "Michael Keaton",
			wrong2 : "Val Kilmer",
			wrong3 : "Christian Bale"
		},

		{
			question : "What's the color of CatWoman's eyes",
			correct : "Green",
			wrong1 : "Blue",
			wrong2 : "Brown",
			wrong3 : "Black"
		},

		{
			question : "What was the killing Joke?",
			correct : "A comic depicting the Joker's story",
			wrong1 : "The name of the final plan the Joker used in the Dark Knight",
			wrong2 : "A joke told by the Riddler",
			wrong3 : "A movie about the Joker killing Barbara Gordon"
		},

		{
			question : "Who does Mr. Freeze need those crystals for?",
			correct : "To revive his wife",
			wrong1 : "For his suit to work",
			wrong2 : "To wear on his suit",
			wrong3 : "To use as magnifying glasses for his freeze ray"
		}

	] //End question array within quiz object
}; //End quiz object



/* ====== Adding the first question to the page initially ======*/
	addQuestions();


/* ====== When user clicks on button to move to the next question ======*/
	$('#next').submit(function(event){
		event.preventDefault();
		//Fade out the initial instructions (if not hidden already) 
		//and then fade in the question form
		if($('.instructions').is(':visible')) {
			$('.instructions').fadeOut(1000, function(){
				$('#answerForm, .question').fadeIn(300);
			}); //End fadeOut
		} //End if statement

		$(this).fadeOut(1000);
		$('h1.intro').html('Remember to put a <span class="laugh">SMILE</span> on your face!');
	});//End submit function
		

/* ====== When user clicks on one of the answers ======*/
	$('#answerForm').on('click', 'input[type="radio"]', function(){
		if(counter < quiz.questions.length) {
			counter++;
		} else counter = quiz.questions.length - 1;
		
		addQuestions();
		$(this).removeAttr('checked');
		
		if( $(this).val() === quiz.questions[counter].correct ) {
			correctAnswers++;
			console.log(correctAnswers);
		}
	}); //End on click









}); //End Ready

