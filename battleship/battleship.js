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
console.log(toColumn(aiUnguessed[67]));

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
	let shipArray = [new Ship([00, 01], "Battleship")];
	return shipArray;
}

//This will be an array of the player's ships
let playerShips = [new Ship([00, 01, 02], "Boaty mcBoatface"), new Ship([30, 31, 32, 33, 34, 35], "Rowboat")];
aiTurn();
aiTurn();
aiTurn();
aiTurn();

aiTurn();
aiTurn();
aiTurn();

aiTurn();
aiTurn();
aiTurn();
aiTurn();
aiTurn();
aiTurn();
aiTurn();
aiTurn();
aiTurn();
console.log(playerShips);

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
/*function playerTurn(space) {
	//Ensure the space isn't already claimed. If it is, return immediately.
	let open = isAvailable(space);
	if (!open) {
		return;
	} 

	//Claim the space
	claimSpace(space, true);

	//Run aiTurn()
	aiTurn();
}*/
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
        if ( mark[i] == target) { 
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

function processGuess(shipArray, target) {
	if(checkForHits(shipArray, target)) {
		console.log("Hit");
		if(isAiTurn) {
			aiDiscovery = true;
			aiHits.push(target);
		}
		//TODO: Draw a red circle on the grid?
		hitShip(shipArray, target);
		
	} else {
		console.log("Miss");
		//TODO: Draw a black circle on the grid?
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
	//Run randomGuess();
	//Alt run smartGuess();
	//Check for a winner
	//Update board?
	isAiTurn = false;
}

function randomGuess() {
	console.log("RANDOM GUESS");
	let randy = getRandom(0, spacesLeft - 1);
	let guess = aiUnguessed.splice(randy, 1)[0];
	console.log(guess);
	processGuess(playerShips, guess);

}

function smartGuess() {
	console.log("SMART GUESS");
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
		console.log(guessDir);
		if (guessDir === 'N') {
			console.log(startingSpace - 10);
			processGuess(playerShips, startingSpace - 10);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace - 10), 1);
		} else if (guessDir === 'S') {
			console.log(startingSpace + 10);
			processGuess(playerShips, startingSpace + 10);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace + 10), 1);
		} else if (guessDir === 'W') {
			console.log(startingSpace - 1);
			processGuess(playerShips, startingSpace - 1);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace - 1), 1);
		} else {
			console.log(startingSpace + 1);
			processGuess(playerShips, startingSpace + 1);
			aiUnguessed.splice(aiUnguessed.indexOf(startingSpace + 1), 1);
		}

	} else if (aiHits.length > 1) {
		let hitDiff = aiHits[0] - aiHits[1];
		if (hitDiff == 10 || hitDiff == -10) {
			if (aiUnguessed.includes(aiHits[aiHits.length - 1] - 10)) {
				let guess = aiHits[aiHits.length - 1] - 10;
				processGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				console.log(guess);
			} else if (aiUnguessed.includes(aiHits[aiHits.length - 1] + 10)) {
				let guess = aiHits[aiHits.length - 1] + 10;
				processGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				console.log(guess);
			} else {
				//TODO: if this happens, it means this is two ships stacked ontop of eachother.
				//I can make the ai handle that later, for now it's just gonna give up.
				aiDiscovery = false;
			}
		} else if (hitDiff == 1 || hitDiff == -1) {
			if (aiUnguessed.includes(aiHits[aiHits.length - 1] - 1)) {
				let guess = aiHits[aiHits.length - 1] - 1;
				processGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				console.log(guess);
			} else if (aiUnguessed.includes(aiHits[aiHits.length - 1] + 1)) {
				let guess = aiHits[aiHits.length - 1] + 1;
				processGuess(playerShips, guess);
				aiUnguessed.splice(aiUnguessed.indexOf(guess), 1);
				console.log(guess);
			} else {
				//TODO: if this happens, it means this is two ships next to eachother.
				//I can make the ai handle that later, for now it's just gonna give up.
				aiDiscovery = false;
			}
		}
	} else {
		console.log("ERROR! No hits have been recorded");
		aiDiscovery = false;
	}
}

/**
 * Helper method for playerTurn(). Runs after a successful turn if 
 * the game hasn't ended, placing an o instead of an x to represent the ai.
 * Currently, the ai picks a random open square.
 * */
/*function aiTurn() {
	let max = openSpaces.length;
	let randy = Math.floor(Math.random() * max);
	claimSpace(openSpaces[randy], false);
}*/

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
/*function claimSpace(space, isX) {
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
}*/

/**
 * Helper method for playerTurn()
 * Returns true if the space does not contain an X or an O, false otherwise.
 * @param spaceID The space to check
 * @returns boolean true if the space does not contain an X or an O.
 * */
/*function isAvailable(spaceID) {
	let spaceText = document.getElementById(spaceID).innerHTML;
	if (spaceText === "X") {
		return false;
	} else if (spaceText === "O") {
		return false;
	}
	return true;
}*/

/**
 * Helper method for claimSpace()
 * Runs through each possible 3-in-a-row sequence, and if any of them are
 * owned by player, returns true. Otherwise returns false.
 * 
 * @param player Boolean array of claimed spaces. If a space is claimed by the player, 
 * its respective slot will be true. Otherwise, it will be false.
 * @returns true if any win condition is met, otherwise returns false.
 * */
/*function checkWin(player) {
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
}*/

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
