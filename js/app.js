$(function() {

/*Let the intro, instructions fade in together with the button to start game=======*/
$('.description, .intro, form#next').fadeIn(200);


/*Define questions and answers=======*/
var QuizQuestion = function (question, correct, b, c, d) {
	this.question = question;
	this.correct = correct;
	this.b = b;
	this.c = c;
	this.d = d;
}

var quiz0 = new QuizQuestion("Which of your enemies was trained by the same person as yourself, Bats?",
	"Bane",
	"Deadshot", 
	"Clayface", 
	"Killer Croc");

var quiz1 = new QuizQuestion("Who put a bullet in Barbara Gordon's spine, leaving her unable to walk?",
	"the Joker", "Two Face", "Catwoman", "Penguin");

var quiz2 = new QuizQuestion("What was the killing Joke?",
	"A comic depicting the Joker's story", 
	"The name of the final plan the Joker used in the Dark Knight", 
	"A joke told by the Riddler", 
	"A cartoon about the Joker killing Barbara Gordon");

var quiz3 = new QuizQuestion("What does Mr. Freeze need those crystals for?",
	"To recover his wife from a rare disease", 
	"As fuel for his suit to work", 
	"To use as magnifiers for his freeze ray", 
	"To sell on the market for cold cash");

var quiz4 = new QuizQuestion("Who's the inadvertent monstrous antonym of yours, Batman?",
	"Manbat", "the Joker", "Catwoman", "Clayface");

var quiz5 = new QuizQuestion("Which of your arch enemies was caught in a blaze, that he himself set to a chemical plant, and suffered burns to 90% of his body?",
	"Firefly", "the Joker", "Two Face", "Killer Croc");

var quiz6 = new QuizQuestion("Penguin got sent to a particular city as a child. After his family hit hard times, he immersed himself in a criminal education on the streets of said city. What city was this?",
	"London", "Kiev", "Bangkok", "Metropolis");

var quiz7 = new QuizQuestion("What does Poison Ivy have flowing through her veins instead of blood?",
	"Chlorophyll", "Acid", "Microscopic seeds", "Tree bark");

var quiz8 = new QuizQuestion("Which enemy of yours has a psychotic fixation with duality and the number 2?",
	"Two Face", "Penguin", "Clayface", "the Joker");

var quiz9 = new QuizQuestion("Who got too much taste of his own medicine and now can't get what he wants most, except when he's confronted by you, Batman?",
	"Scarecrow", "the Joker", "the Riddler", "Raj Al Ghul");

var quizArray = [quiz0, quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8, quiz9];

//Function to randomize the location of the questions
function randomizeQuizes () {
	quizArray.sort( function() {
	return 0.5 - Math.random();
	}); //End sort function
}//End randomizeQuizes


/* We need a counter to check which question we're at 
   and another one for the amount of questions correct=======*/
var counter = 0;
var correctAnswers = 0;


/* We need a function for adding the quizquestion and answers 
   to the radios and labels =======*/
function addQuiz () {
	if (counter < quizArray.length) {
		randomizeRadios();
		$('.question').html(quizArray[counter].question);
		$(radioArray[0]).val(quizArray[counter].correct);
		$(radioArray[1]).val(quizArray[counter].b);
		$(radioArray[2]).val(quizArray[counter].c);
		$(radioArray[3]).val(quizArray[counter].d);
	} //End if
	$('input[type="radio"]').each(function(){
		$(this).next().html($(this).val());
	});
}//End addQuiz


/* We need an array of the radio inputs 
   so we can Math.random() their index positions=======*/
var radioArray = [$('#a'), $('#b'), $('#c'), $('#d')];

//Function to randomize the location of the radiobutton values
function randomizeRadios () {
	radioArray.sort( function() {
	return 0.5 - Math.random();
	}); //End sort function
}//End randomizeRadios


/*Allow user to click on button and have quiz appear=======*/
$('form#next').submit(function(){
	event.preventDefault();
	randomizeQuizes();
	$('input[type="radio"]').removeAttr('checked');
	
	if($('.middle').find('p').is(':visible')) {
		$('.instructions, .intro, form#next').fadeOut(function(){
			$('.videoHolder').html(''); //to remove video upon restarting
			counter = 0;//To be able to add the first question in the array next time
			correctAnswers = 0;
			addQuiz();
			$('#answerForm, .question').fadeIn(300);
			$('.intro').html('Remember to put a <span class="laugh">SMILE</span> on your face!').fadeIn(200);
		});//End fadeOut
	} //End nested if
	console.log("Counter upon submit: " + counter);
	console.log("correctAnswers upon submit: " + correctAnswers);
}); //End submit


/*Allow user to choose answer and then move on to next question=======*/
$('#answerForm').on('click', 'input[type="radio"]', function(){
	if($(this).val() === quizArray[counter].correct) {
			correctAnswers++;
		}//End nested if
		counter++;
	
	if(counter < quizArray.length) {	
		nextQuestion();
	} else {
			nextQuestion();
			showResults();
	}//End if statement
}); //End on click


/* Function to Show user correct answer in split second=======*/
function nextQuestion() {			
	$(radioArray[0]).next().addClass('correct');	
	setTimeout( function(){
		$(radioArray[0]).next().removeClass('correct');
		$('input[type="radio"]').removeAttr('checked');
		addQuiz();
	}, 300)
}

/*Show user correct amount of answers and try again button=======*/
function showResults() {	
		if(correctAnswers >= 8) {
			$('#answerForm, .question').fadeOut(400, function() {
							$('.question').html("<p><span class='laugh'> HA HA HA HA</span> Well done Bats! " + correctAnswers + " answers correct! Didn't think you had it in you!</p>").fadeIn(400);
							$(".videoHolder").html(
								    '<video autoplay>' +
								        '<source src="img/batmanrevised.mp4" type="video/mp4"></source>' +
								    '</video>');
							$('#next').fadeIn().find('input').val('Try again');
						}); //End fadeOut last question
					
					} else {

						$('#answerForm, .question').fadeOut(400, function() {
							$('.question').html("<p>Aaaww  Batsy... I thought you were a worthy opponent.. " + correctAnswers + " correct? That's just disappointing.. Oh Well... Bombs Away! <span class='laugh'>HA HA HA HA HA HA!</span></p>").fadeIn(400);
								$(".videoHolder").html(
								    '<video autoplay>' +
								        '<source src="img/jokerlaugh.mp4" type="video/mp4"></source>' +
								    '</video>');

							$('#next').fadeIn().find('input').val('Try again');
					});//End fadeOut
		}//End nested if
} //End showResults()

}); //End ready
