/**
 * Copyright 2023 John Peerzada
 * 
 * This is the main java file for the web carnival game connect 4.
 * This game is played with 2 people who place pieces to get 4 peices
 * in a row while also blocking each others pieces.
 */

/**
 * Initlizing variables
 */
// This initizilises each player with a string to recognize them in the game
var playerRed = "R";
var playerYellow = "Y";
// This game always start with the player red going first
var currPlayer = playerRed;
// game over variable makes it so after a player wins, they cannot play another piece
var gameOver = false;
// Creating the board with 6 rows and 7 columns
var board;
var rows = 6;
var columns = 7;
// This variable keeps track of which row each column is located at
var currColumns = [];

/**
 * This function start the game when the page loads in
 */
window.onload = function() {
    setGame();
}

/**
 * This is the main game function where a board is created with 7 columns
 */
function setGame() {
    // The board is created
    board = [];
    // The first player is red so text is put to notify that
    winner.innerText = "Red Player's Turn"; 
    // Current columns heights are all 6 in a standard connect 4 board
    // (in java 5 is 6)
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    // This loop runs for as many rows are initilized for
    for (let r = 0; r < rows; r++) {
        // creating new row variable
        let row = [];
        // This loop is ran for as many columns are initilized for
        for (let c = 0; c < columns; c++) {
            // Row first element is an empty space to signify where
            // a piece can be placed
            row.push(' ');
            // creates the tile for piece to be held
            let tile = document.createElement("div");
            // creates tile id that uses the row and column divided by a "-"
            // to easily split apart later for identification
            tile.id = r.toString() + "-" + c.toString();
            // creates a class with string tile
            tile.classList.add("tile");
            // for each tile created, it places a button that once clicked
            // calls the setPiece function that places a red/yellow piece
            // depending on whether the current player is yellow or red.
            tile.addEventListener("click", setPiece);
            // Once a piece is placed, append that piece to the board so
            // when the next setGame() function call is ran, the piece is 
            // still there and doesn't get deleted.
            document.getElementById("board").append(tile);
        }
        // push new changes to the board
        board.push(row);
    }
}

/**
 * This function is ran when the player clicks on the eventlistener in each spot in the board
 * and places a piece whether or not the player is red or yellow.s
 */
function setPiece() {
    // if game over is true, then the player shouldn't be able to place another piece, so this
    // check is here to fix that
    if (gameOver) {
        return;
    }
    // Checks whether player is yellow or red
    if(currPlayer != playerRed) {
        winner.innerText = "Red Player's Turn"; 
    } else {
        winner.innerText = "Yellow Player's Turn";
    }
    //get row and column id of that tile clicked
    let coords = this.id.split("-"); // split id based upon the "-" from earlier
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    // if the rows count is less than 0, then the current column is out of range
    // and needs to return
    if (r < 0) {
        return;
    }
    // updates the board's row and column with the current players click
    board[r][c] = currPlayer;
    // creates new tile in the hole of the board which either takes on the color
    // yellow or red depending on whether player is placing the piece
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        // changes player once the piece is set
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        // changes player once the piece is set
        currPlayer = playerRed;
    }

    //update the row height for that column
    r -= 1;
    // this updates the current column with the new bottom column height that
    // was changed when a piece was put into that spot, because you can not put pieces
    // on top of each other
    currColumns[c] = r;
    // this function checks after each piece is put down whether or not the player wins off
    // of that placements
    checkWinner();
}

/**
 * This function is ran at the end of each piece that is played and checks whether either player
 * has gotten 4 pieces in a row, horizontaly, verticaly, or diagonally.
 */
function checkWinner() {
     // horizontal solution
     // traverses each row
     for (let r = 0; r < rows; r++) {
        // traverses each column except the last three (not needed)
         for (let c = 0; c < columns - 3; c++){
            // if board space is not empty 
            if (board[r][c] != ' ') {
                // checks whether each combination of all horizontal solutions are all controlled by
                // one player's pieces
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] 
                    && board[r][c+2] == board[r][c+3]) {
                    // if winner is found, call function setWinner with coordinates on the board
                    // of the player's current color piece
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical solution
    // traverses each column
    for (let c = 0; c < columns; c++) {
        // traverses each row except the last three (not needed)
        for (let r = 0; r < rows - 3; r++) {
            // if board space is not empty 
            if (board[r][c] != ' ') {
                // checks whether each combination of all vertical solutions are all controlled by
                // one player's pieces
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] 
                    && board[r+2][c] == board[r+3][c]) {
                    // if winner is found, call function setWinner with coordinates on the board
                    // of the player's current color piece
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // left diagonal solution
    // traverses each row except the last three (not needed)
    for (let r = 0; r < rows - 3; r++) {
        // traverses each column except the last three (not needed)
        for (let c = 0; c < columns - 3; c++) {
            // if board space is not empty 
            if (board[r][c] != ' ') {
                // checks whether each combination of all left diagonal solutions are all controlled by
                // one player's pieces
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] 
                    && board[r+2][c+2] == board[r+3][c+3]) {
                    // if winner is found, call function setWinner with coordinates on the board
                    // of the player's current color piece
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // right diagonal solution
    // traverses each row except the beggining 3 (not needed)
    for (let r = 3; r < rows; r++) {
        // traverses each column except the last three (not needed)
        for (let c = 0; c < columns - 3; c++) {
            // if board space is not empty 
            if (board[r][c] != ' ') {
                // checks whether each combination of all right diagonal solutions are all controlled by
                // one player's pieces
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] 
                    && board[r-2][c+2] == board[r-3][c+3]) {
                        // if winner is found, call function setWinner with coordinates on the board
                    // of the player's current color piece
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

/**
 * This is the end of the game function when a win condition is met,
 * this function alerts the players which one won, then awards tickets,
 * and exits to the main page
 */
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    // checks whether playerRed wins, else playerYellow wins
    if (board[r][c] == playerRed) {
        // alerts player on screen that they won
        alert("Red Wins!");           
    } else {
        // alerts player on screen that they won
        alert("Yellow Wins!");
    }
    // gameover is set to true so neither player can play another piece
    gameOver = true;
    // changes the player turn to notify the player the page is being redirected
    document.getElementById("winner").innerHTML = "Redirecting to home page...";
    // after 2 seconds then the window is redirected to the home page
    var timer = setTimeout(function() {
    window.location.replace("../index.html");
    }, 2000);
	// TODO: add tickets to account
	// exits the screen to the main page
}