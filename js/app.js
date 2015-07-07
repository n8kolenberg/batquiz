$(function() {

$('.description').hide().fadeIn(2500);
$('#answerForm, .question').hide();

/* ====== Function to validate whether an answer is checked ====== */
// function validateMoveOn () {
// 	if ($('input[type="radio"]').is(':checked')) {
// 		return true;
// 	} else return false;
// } //End validateMoveOn function


/* ====== Function to add questions to the page ====== */
function addQuestions () {
	if(counter < quiz.questions.length) {
		randomizeRadios();
		$('.question').html(quiz.questions[counter].question);
		$(radioArray[0]).val(quiz.questions[counter].correct).next().html($(radioArray[0]).val());
		$(radioArray[1]).val(quiz.questions[counter].wrong1).next().html($(radioArray[1]).val());
		$(radioArray[2]).val(quiz.questions[counter].wrong2).next().html($(radioArray[2]).val());
		$(radioArray[3]).val(quiz.questions[counter].wrong3).next().html($(radioArray[3]).val());

	}
}// End addQuestions		


//Create array of the radio inputs so we can Math.random() their index positions
var radioArray = [$('#a'), $('#b'), $('#c'), $('#d')];


//Function to randomize the location of the radiobutton values
function randomizeRadios () {
	radioArray.sort( function() {
	return 0.5 - Math.random();
	}); //End sort function
}//End randomizeRadios



var counter = 0;
var correctAnswers = 0;


//checkout forEach method
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
			$('.instructions').fadeOut(300, function(){
				$('#answerForm, .question').fadeIn(300);
			}); //End fadeOut
		} //End if statement

		$(this).fadeOut(300);
		$('h1.intro').fadeOut(100, function() {
			$(this).html('Remember to put a <span class="laugh">SMILE</span> on your face!')
				   .fadeIn(300);	 
		});	//End Change of h1 intro text			 			 
	});//End submit function
		


/* ====== When user clicks on one of the answers ======*/
	$('#answerForm').on('click', 'input[type="radio"]', function(){
		// setTimeout(function(){ $(this).removeAttr('checked')}, 1000);
		if(counter < quiz.questions.length) {
			if( $(this).val() === quiz.questions[counter].correct ) {
				correctAnswers++;
				console.log(correctAnswers);

			// } else {
			// 	$('')
			}//End nested if statement
			
			counter++;

			//We show user for a split second what the correct answer is
			$(radioArray[0]).next().addClass('correct')
			
			setTimeout(function(){
				$(radioArray[0]).next().removeClass('correct');
			}, 300);

			//Bring in the new questions
			setTimeout(function(){ 
				addQuestions();
			}, 500);

			//We remove the clicked answer styling after 200 ms
			setTimeout(function() { $('input[type="radio"').removeAttr('checked')}, 200);
			
			if(counter == quiz.questions.length) {
				$('#answerForm, .question').fadeOut();
				$('.instructions').html("You've finished the game and you've got " + correctAnswers + " answers right").fadeIn();
				} //End second nested if statement
				
			} //End big if statement 
		}); //End on click




}); //End Ready

