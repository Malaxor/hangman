
$(document).ready(function() {

	// Variables
	//=================================================================

	var choices = ["blue", "green", "pink", "purple", "orange", "black", "white", "red", "teal", "amber"];
	var chosen = "";
	var lettersInWord = [];
	var numBlanks = 0; 
	var blanksAndSuccesses = [];
	var wrongLetters = [];

	var wins = 0;
	var losses = 0;
	var guessesLeft = 9;

	// Functions
	//=================================================================

	function startGame() {

		chosen = choices[Math.floor(Math.random() * choices.length)];
		lettersInWord = chosen.split("");
		numBlanks = lettersInWord.length;

		// at the start of a game, reset the variables bellow
		guessesLeft = 9;
		blanksAndSuccesses = [];
		wrongLetters = [];

		for(var i = 0; i < numBlanks; i++) {

			blanksAndSuccesses.push("_");
		}

		// Testing/Debugging //
		console.log("Chosen: " + chosen);
		console.log("Letters in Word: " + lettersInWord);
		console.log("Blanks: " + numBlanks);
		console.log("Blanks 'n Successes: " + blanksAndSuccesses);

		$("#wordToGuess").html(blanksAndSuccesses.join(" "));
		$("#numGuesses").html(guessesLeft);
		$("#wins").html(wins);
		$("#losses").html(losses);
	}
	// call function to initiate the game
	startGame();

	function checkLetters(letter) {

		var findLetter = false;

		for(var i = 0; i < numBlanks; i++) {

			if(chosen[i] === letter) {

				findLetter = true;
			}
		}

		if(findLetter) {

			for(var i = 0; i < numBlanks; i++) {

				if(chosen[i] === letter) {

					blanksAndSuccesses[i] = letter;
				}
			}
		}
		else {
			wrongLetters.push(letter);
			guessesLeft--;
		}
	}

	function roundComplete() {

		console.log("Wins: " + wins + "| Losses: " + losses + "| Guesses Left: " + guessesLeft);

		$("#numGuesses").html(guessesLeft);
		$("#wordToGuess").html(blanksAndSuccesses.join(" "));
		$("#wrongGuesses").html(wrongLetters.join());

		if(blanksAndSuccesses.toString() === lettersInWord.toString()) {

			wins++;
			alert("Congrats, champeeon!")
			startGame();
		}
		else if(guessesLeft === 0) {
			losses++;
			alert("Insert coin; try again")
			startGame();
		}
	}

	document.onkeyup = function(event) {

		var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
		checkLetters(letterGuessed);
		roundComplete();	
	}	
});