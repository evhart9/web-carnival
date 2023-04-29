/**
 * Copyright 2023 Samantha Bowsher, Logan Smith [, insert other contributor names here]
 * 
 * This file contains the code that runs the Web Carnival Battleship game.
 * Following the basic rules of Battleship, users guess squares by clicking
 * on a square within the grid they have not guessed yet on a 10x10 board. 
 * The user takes turns with an AI player until one of them has correctly 
 * guessed each square containing the other players' ships.
 * 
 * IMPORTANT: Internally, spaces are tracked as integers 00-99. The first digit
 * is the column, and the last digit is the row. This can be checked with % 10 and /10.
 * 
 * User is redirected to '../index.html' after the completion of this game. If
 * the user won, 3 tickets are awards to their account (TODO).
 */

/**
 * Gets a random integer between min (inclusive) and max (exlusive). Uses
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

/**
 * Get the row of a space that is in integer form.
 * @param {number} space an integer between 00 and 99.
 * @returns The last digit of the space.
 */
function toRow(space) {
	return Math.floor(space % 10);
}

/**
 * Get the column of a space that is in integer form.
 * @param {number} space an integer between 00 and 99.
 * @returns The first digit of the space.
 */
function toColumn(space) {
	return Math.floor(space / 10);
}

/**
 * Ship object constructor method
 * @param {number[]} spaces an array of the spaces this ship occupies.
 * @param {String} name the String name of the ship to be displayed when sunk.
 * */
function Ship(spaces, name) {
	this.spaces = spaces;
	this.name = name;
	let spaceCount = spaces.length; //decrements each time the ship is hit.
}

//----------------------------------------------PREGAME----------------------------------------------//

//Number of spaces the AI has yet to guess
let spacesLeft = 100;

let aiUnguessed = [...Array(100).keys()];

/*let aiUnguessed = [["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
	["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
	["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
	["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
	["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
	["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
	["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
	["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
	["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
	["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"]];*/

//let playerUnguessed = [...aiUnguessed];

//Generate AI ship placement
let aiShips = generateAIShips();
console.log(aiShips);
let aiDiscovery = false; //Track whether a ship has been discovered, but not sunk.
let aiHits = []; //Array to push hits to.  Clear once discovered ship is sunk.
let isAiTurn = false; //QOL thin

/**
 * */
function generateAIShips() {
	//TODO
	//Option one: preset list of AI ship placements that it randomly picks from.
	//Option two: generate random ship placements.
	//Option one is more efficient and probably going to give better placements than option two.
	//Ships should be 2,3,3,4,5 with those names below
	let shipArray = [new Ship([00, 01], "Destroyer"), 
		   	new Ship([30, 31, 32], "Submarine"),
		   	new Ship([20, 21, 22], "Cruiser"),
		   	new Ship([06, 16, 26, 36], "Battleship"),
		   	new Ship([25, 35, 45, 55, 65], "Carrier")];
	return shipArray;
}

//This will be an array of the player's ships
let playerShips = [new Ship([00, 01], "Destroyer"), 
		   new Ship([30, 31, 32], "Submarine"),
		   new Ship([20, 21, 22], "Cruiser"),
		   new Ship([06, 16, 26, 36], "Battleship"),
		   new Ship([25, 35, 45, 55, 65], "Carrier")];

//console.log(playerShips);

function rotateShip() {
	//TODO
}

function placePlayerShip(shipSize) {
	//TODO
}

function isPlacementValid(ship) {
	//TODO
}

function drawShips() {
	//TODO
}

//--------------------------------------------PLAYER TURN--------------------------------------------//

/**
 * This is the core method for Battleship. If the player presses
 * a button, run this method. It will attempt to mark a space as guessed, and if it does so successfully,
 * it will then run aiTurn(). If the space is guessed, it will exit immediately.
 * 
 * @param space the ID of the space the player clicked on.
 * */
function playerTurn(space) {
	//TODO

	console.log(aiShips);
	//Convert the ID to an int.
	let guess = convertToNums(space);
	//Check if the guess hits anything
	processPlayerGuess(guess, space);
	//Convert the space to a circle
	console.log(guess);
	

	//Check for a win/loss
	checkForWin();
	//Run aiTurn()
	aiTurn();
}

/**
 * Helper method for playerTurn(). Takes the string ID of the space and converts it to
 * a 2-digit int corresponding to the space. The first digit is the column and the second is 
 * the row, so it's column-row order. For example, space 3D would return 23.
 * @param {string} space The String ID of the space the player clicked.
 * @returns {int} A number between 0-99 inclusive that corresponds with the space.
 */
function convertToNums(space) {
	let numSpace = 0;
	let subs = space.substring(5);

	//There is certainly a more efficient way to do this, but I don't think it's worth investing the time.
	if (subs.includes("10")) {
		numSpace += 90;
	} else if (subs.includes("9")) {
		numSpace += 80;
	} else if (subs.includes("8")) {
		numSpace += 70;
	} else if (subs.includes("7")) {
		numSpace += 60;
	} else if (subs.includes("6")) {
		numSpace += 50;
	} else if (subs.includes("5")) {
		numSpace += 40;
	} else if (subs.includes("4")) {
		numSpace += 30;
	} else if (subs.includes("3")) {
		numSpace += 20;
	} else if (subs.includes("2")) {
		numSpace += 10;
	} //Skip 1, that would just add 0.

	if (subs.includes("B")) {
		numSpace += 1;
	} else if (subs.includes("C")) {
		numSpace += 2;
	} else if (subs.includes("D")) {
		numSpace += 3;
	} else if (subs.includes("E")) {
		numSpace += 4;
	} else if (subs.includes("F")) {
		numSpace += 5;
	} else if (subs.includes("G")) {
		numSpace += 6;
	} else if (subs.includes("H")) {
		numSpace += 7;
	} else if (subs.includes("I")) {
		numSpace += 8;
	} else if (subs.includes("J")) {
		numSpace += 9;
	} 
	return (numSpace);
}

/**
 * Check whether any opposing ships occupy the target spot.
 * @param {Ship[]} shipArray The ships to check.
 * @param {number} target The spot to seach for.
 * @returns {boolean} true if the target is found in any of the Ships, otherwise false.
 */
function checkForHits(shipArray, target) {
	let found = false;
	shipArray.forEach(ship => {
		ship.spaces.forEach(shipSpace => {
			if(target == shipSpace) {
				found = true;
			}
		});
	});
	return found;
}
/**
 * Hit the ship that occupies the space that was guessed, reducing its total amount of spaces.
 * If the ship has no remaining spaces, sink the ship and remove it from the game.
 * @param {Ship[]} shipArray An array of ships that contains the ship that got hit.
 * @param {number} target The spot at which the ship was hit.
 */
function hitShip(shipArray, target) {
	let shipIndex = getIndexOfShipAtSpot(shipArray, target); //Get the index of the ship
	//I'll figure out how to throw errors later, for now this is a good substitute.
	if(shipIndex == -1) {
		console.log("ERROR! This shipArray does not contain target.");
		return;
	}
	let mark = shipArray[shipIndex]; //mark is the ship that got hit.
	let spaceIndex = -1; //index of the target space in the ship's spaces array.
	for( let i = 0; i < mark.spaces.length; i++){ 
    
		//If you find the ship where you were looking
		if (mark.spaces[i] == target) { 
			spaceIndex = i;
        }
    
	}

	//Remove the space from mark.spaces.
	mark.spaces.splice(spaceIndex, 1); 

	//If every space of this ship has been hit, the ship has sunk.
	if(mark.spaces.length == 0) {
		sinkShip(mark, shipArray, shipIndex);
	}
}

/**
 * Helper method for HitShip. Gets the index of the ship that occupies the target
 * space in the shipArray.
 * @param {Ship[]} shipArray The array that contains the ship to find.
 * @param {number} target The space that was guessed.
 * @returns {number} Index of the ship in shipArray. Returns -1 if no ships occupy the space.
 */
function getIndexOfShipAtSpot(shipArray, target) {
	if (!checkForHits(shipArray, target)) {
		return -1;
	}
	let found = -1;
	for(let i = 0; i < shipArray.length; i++) {
		shipArray[i].spaces.forEach(shipSpace => {
			if(target == shipSpace) {
				found = i;
			}
		});
	}
	return found;
}

/**
 * Helper method for hitShip. Sinks a ship, removing it from the board and shipArray.
 * @param {Ship} ship The ship to sink.
 * @param {Ship[]} shipArray The array containing the ship that will sink.
 * @param {number} shipIndex The index of the sinking ship.
 */
function sinkShip(ship, shipArray, shipIndex) {
	let msg = "You sunk my " + (ship.name + "!");
	console.log(msg);
	shipArray.splice(shipIndex, 1);
	if(isAiTurn) {
		aiDiscovery = false;
		aiHits = [];
	}
}

function processAIGuess(shipArray, target) {
	if(checkForHits(shipArray, target)) {
		console.log("Hit");
		aiDiscovery = true;
		aiHits.push(target);
		//TODO: Draw a red circle on the grid?
		hitShip(shipArray, target);
		
	} else {
		console.log("Miss");
		//TODO: Draw a black circle on the grid?
	}
}

function processPlayerGuess(target, spaceID) {
	if (checkForHits(aiShips, target)) {
		console.log("Hit");
		hitShip(aiShips, target);
		drawCircle(spaceID, true);
	} else {
		console.log("Miss");
		drawCircle(spaceID, false);
	}
	
}

function drawCircle(spaceID, isHit) {
	document.getElementById(spaceID).onclick = null;
	document.getElementById(spaceID).innerHTML = '&bull;';
	if (isHit) {
		document.getElementById(spaceID).classList.add('hitSpace');
	} else {
		document.getElementById(spaceID).classList.add('missSpace');
	}
}

//----------------------------------------------AI TURN----------------------------------------------//

function aiTurn() {
	//TODO
	isAiTurn = true;
	//decide whether to use a random spot
	if (aiDiscovery) {
		smartGuess();
	} else {
		randomGuess();
	}
	//Check for a winner
	checkForWin();
	//Update board?
	isAiTurn = false;
}

function randomGuess() {
	//console.log("RANDOM GUESS");
	let randy = getRandom(0, spacesLeft - 1);
	let guess = aiUnguessed.splice(randy, 1)[0];
	//console.log(guess);
	processAIGuess(playerShips, guess);
	spacesLeft--;

}

function smartGuess() {
	//console.log("SMART GUESS");
	let direction = ['N', 'E', 'S', 'W'];

	if (aiHits.length == 1) {
		let startingSpace = aiHits[0];
		if (!aiUnguessed.includes(startingSpace - 10)) {
			direction.splice(direction.indexOf('N'), 1);
		}
		if (!aiUnguessed.includes(startingSpace + 10)) {
			direction.splice(direction.indexOf('S'), 1);
		}

		if (!aiUnguessed.includes(startingSpace - 1)) {
			direction.splice(direction.indexOf('W'), 1);
		}
		if (!aiUnguessed.includes(startingSpace + 1)) {
			direction.splice(direction.indexOf('E'), 1);
		}

		if (direction.length == 0) {
			aiDiscovery = false;
			return;
		}

		let guessDir = direction[getRandom(0, direction.length - 1)];
		//console.log(guessDir);
		if (guessDir === 'N') {
			//console.log(startingSpace - 10);
			processAIGuess(playerShips, startingSpace - 10);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace - 10), 1);
		} else if (guessDir === 'S') {
			//console.log(startingSpace + 10);
			processAIGuess(playerShips, startingSpace + 10);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace + 10), 1);
		} else if (guessDir === 'W') {
			//console.log(startingSpace - 1);
			processAIGuess(playerShips, startingSpace - 1);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace - 1), 1);
		} else {
			//console.log(startingSpace + 1);
			processAIGuess(playerShips, startingSpace + 1);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace + 1), 1);
		}

	} else if (aiHits.length > 1) {
		let hitDiff = aiHits[0] - aiHits[1];
		if (hitDiff == 10 || hitDiff == -10) {
			if (aiUnguessed.includes(aiHits[aiHits.length - 1] - 10)) {
				let guess = aiHits[aiHits.length - 1] - 10;
				processAIGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				//console.log(guess);
			} else if (aiUnguessed.includes(aiHits[aiHits.length - 1] + 10)) {
				let guess = aiHits[aiHits.length - 1] + 10;
				processAIGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				//console.log(guess);
			} else {
				//TODO: if this happens, it means this is two ships stacked ontop of eachother.
				//I can make the ai handle that later, for now it's just gonna give up.
				aiDiscovery = false;
			}
		} else if (hitDiff == 1 || hitDiff == -1) {
			if (aiUnguessed.includes(aiHits[aiHits.length - 1] - 1)) {
				let guess = aiHits[aiHits.length - 1] - 1;
				processAIGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				//console.log(guess);
			} else if (aiUnguessed.includes(aiHits[aiHits.length - 1] + 1)) {
				let guess = aiHits[aiHits.length - 1] + 1;
				processAIGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				//console.log(guess);
			} else {
				//TODO: if this happens, it means this is two ships next to eachother.
				//I can make the ai handle that later, for now it's just gonna give up.
				aiDiscovery = false;
			}
		}
		spacesLeft--;
	} else {
		console.log("ERROR! No hits have been recorded");
		aiDiscovery = false;
	}
}

/**
 * Helper method for aiTurn() and playerTurn()
 * Checks for a win, and then uses the appropriate method.
 */
function checkForWin() {
	if (playerShips.length == 0) {
		userLost();
	} else if (aiShips.length == 0) {
		userWon();
	}
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
	
	addTickets();
	
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
