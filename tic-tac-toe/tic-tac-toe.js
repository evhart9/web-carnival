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

//Total number of characters that still needs to be guessed. If this number hits zero and neither
//side has won, it will result in a tie.
let spacesLeft = 9;

//Keep track of whether each space has been claimed and who it has been claimed by
let spaces = ["space1A", "space2A", "space3A", "space1B", "space2B", "space3B",
			"space1C", "space2C", "space3C"];
let openSpaces = [...spaces];

//Boolean arrays filled with false. If a square is claimed, the index number corresponding with the slot in the 
//relevant array will be set to true. This is done to make checking win conditions easier.
let claimedX = [false, false, false, false, false, false, false, false, false];
let claimedO = [false, false, false, false, false, false, false, false, false];

/**
 * This is the core method for tic-tac-toe. If the player presses
 * a button, run this method. It will attempt to claim the space, and if it does so successfully,
 * it will then run aiTurn(). If the space isn't open, it will exit immediately.
 * 
 * @param space the ID of the space the player clicked on.
 * */
function playerTurn(space) {
	//Ensure the space isn't already claimed. If it is, return immediately.
	let open = isAvailable(space);
	if (!open) {
		return;
	} 

	//Claim the space
	claimSpace(space, true);

	//Run aiTurn()
	aiTurn();
}

/**
 * Helper method for playerTurn(). Runs after a successful turn if 
 * the game hasn't ended, placing an o instead of an x to represent the ai.
 * Currently, the ai picks a random open square.
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
 * 
 * @param space The ID of the space to be claimed.
 * @param isX Boolean value to track which side gets the space.
 * */
function claimSpace(space, isX) {
	let gameEnd = false;

	//Remove the space from open spaces
	let removal = openSpaces.indexOf(space);
	openSpaces.splice(removal, 1);

	//Set the space to the appropriate character and add it to the corresponding claimed spaces.
	//Then, check if that causes the game to end.
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

	//If the game is over, determine the winner and run the corresponding method.
	if (gameEnd) {
		if (isX)
			userWon();
		else
			userLost();
	}

	//Decrement spacesLeft, then check whether there is a tie.
	spacesLeft--;

	if (spacesLeft == 0) {
		userTied();
	}

	//If gameplay continues, continue game.
}

/**
 * Helper method for playerTurn()
 * Returns true if the space does not contain an X or an O, false otherwise.
 * @param spaceID The space to check
 * @returns boolean true if the space does not contain an X or an O.
 * */
function isAvailable(spaceID) {
	let spaceText = document.getElementById(spaceID).innerHTML;
	if (spaceText === "X") {
		return false;
	} else if (spaceText === "O") {
		return false;
	}
	return true;
}

/**
 * Helper method for claimSpace()
 * Runs through each possible 3-in-a-row sequence, and if any of them are
 * owned by player, returns true. Otherwise returns false.
 * 
 * @param player Boolean array of claimed spaces. If a space is claimed by the player, 
 * its respective slot will be true. Otherwise, it will be false.
 * @returns true if any win condition is met, otherwise returns false.
 * */
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
 * Helper method for processLetter() and for claimSpace().
 * If the user won the game, alert them, add the tickets to their account, and
 * redirect to the home page.
 */
function userWon() {
	//var time = setTimeout(function() {
		alert("You Win!");
		document.getElementById("gameArea").innerHTML =
			"Adding tickets and redirecting...";

		addTickets();

		window.location.replace("../index.html");
		//}, 1000);
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
