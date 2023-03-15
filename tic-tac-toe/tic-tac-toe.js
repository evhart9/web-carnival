/**
 * Copyright 2023 Samantha Bowsher [, insert other contributor names here]
 * 
 * This file contains the code that runs the Web Carnival Tic-Tac-Toe game.
 * Following the basic rules of tic-tac-toe, users claim squares by clicking
 * on an open square on a 3x3 board. The user takes turns with an AI player
 * until one of them has claimed three spaces that form a straight line,
 * or until there are no more open spaces.
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

// Total number of characters that still needs to be guessed
let totalToGuess = 0;
let spacesLeft = 9;

// All the letters the user has guessed (correct and incorrect)
let guessed = [];
let spaces = ["space1A", "space2A", "space3A", "space1B", "space2B", "space3B",
			"space1C", "space2C", "space3C"];
let openSpaces = [...spaces];
let claimedX = [false, false, false, false, false, false, false, false, false];
let claimedO = [false, false, false, false, false, false, false, false, false];

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

	if (totalToGuess === 0) {
		userWon();
	} else if (guessesLeft === 0) {
		userLost();
	}

	guessed.push(currentLetter);
}

/**
 * This is the core method for tic-tac-toe. If the player presses
 * a button, run this method.
 * */
function playerTurn(space) {
	let open = isAvailable(space);
	if (!open) {
		return;
	} 

	claimSpace(space, true);
	//Check that the space isn't claimed
	//if it is, break.
	//if it isn't, claim the space
	//Run aiTurn()
	aiTurn();
}

/**
 * Helper method for playerTurn(). Runs after a successful turn if 
 * the game hasn't ended, placing an o instead of an x.
 * */
function aiTurn() {
	let max = openSpaces.length;
	let randy = Math.floor(Math.random() * max);
	claimSpace(openSpaces[randy], false);
}

/**
 * Helper method for playerTurn() and ai(Turn)
 * This method converts an empty space to a claimed space.
 * If this causes there to be three claimed spaces in a row,
 * determine who won. If the number of available spaces reaches
 * 0, end the game in a tie.
 * */
function claimSpace(space, isX) {
	//TODO
	let gameEnd = false;
	let removal = openSpaces.indexOf(space);
	openSpaces.splice(removal, 1);

	if (isX) {
		document.getElementById(space).innerHTML = 'X';
		document.getElementById(space).style.color = "black";
		claimedX[spaces.indexOf(space)] = true;
		gameEnd = checkWin(claimedX);
	} else {
		document.getElementById(space).innerHTML = 'O';
		document.getElementById(space).style.color = "black";
		claimedO[spaces.indexOf(space)] = true;
		gameEnd = checkWin(claimedO);
	}

	if (gameEnd) {
		if (isX)
			userWon();
		else
			userLost();
	}

	spacesLeft--;
	//Claim space

	//Check win/loss
	//Check spaces left
	if (spacesLeft == 0) {
		userTied();
	}

	//If gameplay continues, continue game.
}

function isAvailable(spaceID) {
	let spaceText = document.getElementById(spaceID).innerHTML;
	if (spaceText === "X") {
		return false;
	} else if (spaceText === "O") {
		return false;
	}
	return true;
}

function checkWin(player) {
	if (player[0] && player[1] && player[2])
		return true;
	else if (player[0] && player[3] && player[6])
		return true;
	else if (player[1] && player[4] && player[7])
		return true;
	else if (player[2] && player[5] && player[8])
		return true;
	else if (player[0] && player[4] && player[8])
		return true;
	else if (player[2] && player[4] && player[6])
		return true;
	else if (player[3] && player[4] && player[5])
		return true;
	else if (player[6] && player[7] && player[8])
		return true;
	else
		return false;
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
 * Helper method for processLetter() and for claimSpace().
 * If the user won the game, alert them, add the tickets to their account, and
 * redirect to the home page.
 */
function userWon() {
	alert("You Win!");
	document.getElementById("gameArea").innerHTML =
			"Adding tickets and redirecting...";
	
	// TODO: add tickets to account
	
	window.location.replace("../index.html");
}

/**
 * Helper method for processLetter() and for claimSpace().
 * If the user lost the game, alert them, and redirect to the home page.
 */
function userLost() {
	alert("You Lost!");
	document.getElementById("gameArea").innerHTML = "Redirecting...";

	window.location.replace("../index.html");
}

/**
 * Helper method for claimSpace()
 * If the user tied with the AI opponent, alert them and redirect to the home page.
 */
function userTied() {
	alert("Tie!");
	document.getElementById("gameArea").innerHTML = "Redirecting...";

	window.location.replace("../index.html");
}