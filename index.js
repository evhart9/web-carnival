/**
 * Copyright 2023 Andrew LaMendola
 * 
 * This file contains the code that is used for the landing page for
 * the Web Carnival website. This page will include a link to each game,
 * along with links to both the login page and help page.
 * 
 * This file contains the functions that are used to carry out the buttons'
 * functionality on the page.
 */

/**
 * Redirects you to the page of the game that is specified by which button
 * was clicked.
 * 
 * @param {*} game The game that was clicked.
 */
function playGame(game) {
    if (game == 'tic') {
        window.location.href = "./tic-tac-toe/tic-tac-toe.html";
    } else if (game == 'hang') {
        window.location.href = "./hangman/hangman.html";
    } else if (game == 'connect') {
        window.location.href = "./connect4/connect4.html";
    } else {
        window.location.href = "./battleship/battleship.html";
    }
}

/**
 * Takes you to the login page.
 */
function loginPage() {
    window.location.href = "./login/login.html";
}

/**
 * Takes you to the signup page.
 */
function signupPage() {
    window.location.href = "./signup/signup.html";
}

/**
 * Takes you to the leaderboard page.
 */
function leaderboard() {
    window.location.href = "./leaderboard/leaderboard.html"
}
