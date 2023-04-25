<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Load the login.php file that is located outside of the web directory
set_include_path('.:/home/earharem/cse201/web-carnival/');
require_once(realpath($_SERVER["DOCUMENT_ROOT"]) . '/../../home/earharem/cse201/web-carnival/signup.php');

// Get the username and password from the AJAX request
$username = $_POST['username'];
$password = $_POST['password'];

// Call the login function from the login.php file
$result = signup($username, $password);

// Return the result to the client-side code
echo json_encode($result);

