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

var quiz0 = new QuizQuestion("Whose nipples caused controversy when they tried to play you in a movie?",
	"George Clooney",
	"Val Kilmer", 
	"Michael Keaton", 
	"Christian Bale");

var quiz1 = new QuizQuestion("What's the color of CatWoman's eyes",
	"Green", "Blue", "Brown", "Black");

var quiz2 = new QuizQuestion("What was the killing Joke?",
	"A comic depicting the Joker's story", 
	"The name of the final plan the Joker used in the Dark Knight", 
	"A joke told by the Riddler", 
	"A cartoon about the Joker killing Barbara Gordon");

var quiz3 = new QuizQuestion("Who does Mr. Freeze need those crystals for?",
	"To revive his wife", 
	"For his suit to work", 
	"To use as magnifying glasses for his freeze ray", 
	"To sell for money");

var quiz4 = new QuizQuestion("Who is Batman?",
	"I'll never say", "Clark Kent", "Bruce Wayne", "Lex Luthor");

// var quiz6 = new QuizQuestion("What's the color of CatWoman's eyes",
// 	"Green", "Blue", "Brown", "Black");

// var quiz7 = new QuizQuestion("What's the color of CatWoman's eyes",
// 	"Green", "Blue", "Brown", "Black");

// var quiz8 = new QuizQuestion("What's the color of CatWoman's eyes",
// 	"Green", "Blue", "Brown", "Black");


// var quiz9 = new QuizQuestion("What's the color of CatWoman's eyes",
// 	"Green", "Blue", "Brown", "Black");

// var quiz10 = new QuizQuestion("What's the color of CatWoman's eyes",
// 	"Green", "Blue", "Brown", "Black");

var quizArray = [quiz0, quiz1, quiz2, quiz3, quiz4];



/* We need a counter to check which question we're at 
   and another one for the amount of questions correct=======*/
var counter = 0;
var correctAnswers = 0;


/* We need a function for adding the quizquestion and answers 
   to the radios and labels =======*/
function addQuiz () {
	if (counter < quizArray.length) {
		// console.log(counter);
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
}); //End submit



/*Allow user to choose answer and then move on to next question=======*/
$('#answerForm').on('click', 'input[type="radio"]', function(){
	counter++;
	if (counter < quizArray.length) {
		if($(this).val() === quizArray[counter].correct) {
			correctAnswers++;
			console.log(correctAnswers);
		}//End nested if

		/*Show user correct answer in split second=======*/
		$(radioArray[0]).next().addClass('correct');
		
		
		console.log("counter: " + counter);
		setTimeout( function(){
			$(radioArray[0]).next().removeClass('correct');
			$('input[type="radio"]').removeAttr('checked');
			addQuiz();
		}, 300)


	} else {
		showResults();
	}//End if statement
}); //End on click





/*Show user correct amount of answers and try again button=======*/
function showResults() {	
		if(correctAnswers >= 4) {
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
							$('.question').html("<p>Aaaaww  Batsy... I thought I was dealing with a worthy opponent.. " + correctAnswers + " correct? That's just disappointing.. Oh Well... Bombs Away! <span class='laugh'>HA HA HA HA HA HA!</span></p>").fadeIn(400);
								$(".videoHolder").html(
								    '<video autoplay>' +
								        '<source src="img/jokerlaugh.mp4" type="video/mp4"></source>' +
								    '</video>');

							$('#next').fadeIn().find('input').val('Try again');
					});//End fadeOut
		}//End nested if
} //End showResults()



debugger;


}); //End ready