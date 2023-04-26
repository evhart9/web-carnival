<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

header('Content-Type: application/json');

set_include_path('.:/home/earharem/cse201/web-carnival/');
require_once(realpath($_SERVER["DOCUMENT_ROOT"]) . '/../../home/earharem/cse201/web-carnival/add_tickets.php');
