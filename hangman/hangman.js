/**
 * Copyright 2023 Evan Earhart, Andrew LaMendola
 * 
 * This file contains the code that runs the Web Carnival Hangman game.
 * Following the basic rules of hangman, users input their guesses using the
 * buttons on the left side of the page. Then, on the right side of the page,
 * players can see the hangman character (TODO), the phrase to guess, the
 * correct letters they have guessed and where those letters are in the phrase,
 * whether they have guessed that letter already, and how many guesses they
 * have left.
 * 
 * Phrases are definined in './dictionary.js' and contain all the possible
 * phrases. Phrases are picked at random in this file.
 * 
 * User is redirected to '../index.html' after the completion of this game. If
 * the user won, 3 tickets are awards to their account (TODO).
 */

/**
 * Gets a random number between min (inclusive) and max (exlusive). Uses
 * Math.random() to obtain the random number.
 * 
 * @param {number} min The minimum the random number should be (inclusive).
 * @param {number} max The maximum the random number can be (exclusive).
 * @returns A random number between min (inclusive) and max (exlusive).
 */
 function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Concatenates each string in the array to create a continuous string. Nothing
 * is added between the characters when concatinating. Returns the continuous
 * string.
 * 
 * For example: ["This", "Is", "An", "Array"] -> "ThisIsAnArray"
 * 
 * @param {string[]} array The array containing strings to return as a single
 * string.
 * @returns A single string made by concatenating the strings in the array.
 */
function arrayToString(array) {
	let resultString = "";
	for (let i = 0; i < array.length; i++) {
		resultString += array[i];
	}
	return resultString;
}

// Gets the random phrase from the array of phrases in './dictionary.js'
let phrase = phrases[getRandom(0, phrases.length)];
//console.log("random phrase: " + phrase);  // Prints to console for debugging

// Total number of characters that still needs to be guessed
let totalToGuess = 0;

// All the letters the user has guessed (correct and incorrect)
let guessed = [];

let guessesLeft = 6;
let result = fillArray(phrase);
let currentLetter = "";

// Initializes areas before the game "starts"
document.getElementById("riddle").innerHTML = arrayToString(result);
document.getElementById("guessesLeft").innerHTML = "Incorrect Guesses Left: " +
		guessesLeft;
document.getElementById("message").innerHTML = "\n";

/**
 * Based on the phrase, for each character, fills an array depending on the
 * character at that position. If there is an alpha character at that position,
 * a "_" is added to the array and if there is a space at that position, a " "
 * is added to the array.
 * Also, keeps track of the number of alpha characters that exist in phrase by
 * increasing totalToGuess by one for each character.
 * 
 * For example: "TWO WORDS" -> ["_", "_", "_", " ", "_", "_", "_", "_", "_"]
 * 
 * @param {string} phrase The phrase the array is built from.
 * @returns An array full of "_" or " " for each character position in the
 * phrase.
 */
function fillArray(phrase) {
	let array = [];
	for (let i = 0; i < phrase.length; i++) {
		if (phrase.charAt(i) === " ") {
			array[i] = " ";
		} else {
			array[i] = "_";
			totalToGuess++;
		}
	}
	return array;
}

/**
 * This method is the main controller of the game and is called with each
 * button press by the user. It checks whether the user has already guessed a
 * letter and if so, takes no further action. If the letter hasn't been guessed
 * yet and is contained in the phrase, it is printed to the "riddle" element. If
 * the letter hasn't been guessed yet and is not contained in the phrase,
 * guessesLeft is decreased, printed to the "guessesLeft" element, and a body
 * part is drawn (TODO). If the user has won or lost, an alert is displayed,
 * tickets are added if necessary (TODO), and the user is redirected to the home
 * page.
 * 
 * @param {string} letter The letter entered by the user to process.
 */
function processLetter(letter) {
	//console.log(letter + " was guessed; guesses = " + guessesLeft);
	currentLetter = letter;
	if (alreadyGuessed()) {
		document.getElementById("message").innerHTML =
				"Letter Already Guessed!";
	} else if (checkLetter()) {
		document.getElementById("message").innerHTML = "";  // Clears message
		document.getElementById("riddle").innerHTML = arrayToString(result);
	} else {
		document.getElementById("guessesLeft").innerHTML =
				"Incorrect Guesses Left: " + guessesLeft;
	}


	buildHangman();
	//console.log("hangman built; guesses = " + guessesLeft);

	if (totalToGuess === 0) {
		userWon();
	} else if (guessesLeft === 0) {
		userLost();
	}

	guessed.push(currentLetter);
}

/**
 * Helper method for processLetter().
 * Checks the array of previously guessed letters to determine if the current
 * letter has been previously guessed. If it has, return true. Otherwise, return
 * false.
 * 
 * @returns true if the current letter has been previously guessed, false
 * otherwise.
 */
function alreadyGuessed() {
	for (let i = 0; i < guessed.length; i++) {
		if (currentLetter.charAt(0) === guessed[i].charAt(0)) {
			return true;
		}
	}
	return false;
}

/**
 * Helper method for processLetter().
 * Checks if the current letter is contained in the phrase. If so, for each time
 * it appears in the phrase, totalToGuess is decreased by one. If the current
 * letter is not contained in the phrase, guessesLeft is decreased by one. 
 * Finally, if the current letter is found in the phrase, the method returns
 * true, otherwise the method returns false.
 * 
 * @returns true if the letter is contained in the phrase, false otherwise.
 */
function checkLetter() {
	let found = false;
	for (let i = 0; i < result.length; i++) {
		if (currentLetter.charAt(0) === phrase.charAt(i)) {
			result[i] = currentLetter;
			totalToGuess--;
			found = true;
		}
	}
	if (!found) {
		guessesLeft--;
	}
	return found;
}

/**
 * Helper method for processLetter().
 * Prints out the hangman animation based on how many guesses the user
 * has left. Each time the user guesses incorrectly, another part of the 
 * hangman is shown. Once the whole hangman is shown, the user has lost 
 * the game.
 */
function buildHangman() {
    if (guessesLeft === 5) {
		drawHead();
    } else if (guessesLeft === 4) {
        drawTorso();
    } else if (guessesLeft === 3) {
        drawArm(25);
    } else if (guessesLeft === 2) {
        drawArm(75);
    } else if (guessesLeft === 1) {
        drawLeg(25);
    } else if (guessesLeft === 0) {
        drawLeg(75);
		drawFace();
    }
}

/**
 * Helper method for buildHangman().
 * Prints out the head of the hangman. The head of the hangman will only
 * be shown once the user has guessed incorrectly at least one time. The
 * head will remain printed out as the user continues to guess.
 */
function drawHead() {
	var c = document.getElementById("hangman");
	var ctx =  c.getContext("2d");
	ctx.beginPath();
	ctx.arc(50, 50, 25, 0, 2 * Math.PI, false);
	ctx.stroke();
}

/**
 * Helper method for buildHangman().
 * Prints out the torso of the hangman. The torso of the hangman will only
 * be shown once the use has guessed incorrectly at least two times. The 
 * torso will remain printed out as the user continues to guess.
 */
function drawTorso() {
	var c = document.getElementById("hangman");
	var ctx =  c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(50, 75);
	ctx.lineTo(50, 125);
	ctx.stroke();
}

/**
 * Helper method for buildHangman().
 * Prints out the arms of the hangman. It will decide which arm to draw
 * based on the x parameter.
 * 
 * @param {position} x The ending x coordinate of the arm.
 */
function drawArm(x) {
	var c = document.getElementById("hangman");
	var ctx =  c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(50, 90);
	ctx.lineTo(x, 110);
	ctx.stroke();
}

/**
 * Helper method for buildHangman().
 * Prints out the legs of the hangman. It will decide which leg to draw
 * based on the x parameter.
 * 
 * @param {position} x The ending x coordinate of the leg.
 */
function drawLeg(x) {
	var c = document.getElementById("hangman");
	var ctx =  c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(50, 125);
	ctx.lineTo(x, 155);
	ctx.stroke();
}

/**
 * Helper method for buildHangman().
 * Prints out the face of the hangman. The face of the hangman will only
 * be shown once the rest of the hangman has appeared.
 */
function drawFace() {
	var c = document.getElementById("hangman");
	var ctx =  c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(39, 37);
	ctx.lineTo(45, 43);
	ctx.moveTo(39, 43);
	ctx.lineTo(45, 37);

	ctx.moveTo(61, 37);
	ctx.lineTo(55, 43);
	ctx.moveTo(61, 43);
	ctx.lineTo(55, 37);

	ctx.moveTo(35, 60);
	ctx.lineTo(65, 60);

	ctx.arc(45, 60, 5, Math.PI, 2 * Math.PI, true);

	ctx.stroke();
}

/**
 * Helper method for processLetter().
 * If the user won the game, alert them, add the tickets to their account, and
 * redirect to the home page.
 */
function userWon() {
	var timer = setTimeout(function() {
		alert("You Win!");
		document.getElementById("gameArea").innerHTML =
			"Adding tickets and redirecting...";

		addTickets();

		window.location.replace("../index.html");
		}, 1000);
}

/**
 * Helper method for processLetter().
 * If the user lost the game, alert them, and redirect to the home page.
 */
function userLost() {
	var time = setTimeout(function() {
		alert("You Lost!");
		document.getElementById("gameArea").innerHTML = "Redirecting...";

		window.location.replace("../index.html");
	}, 1000);
}
