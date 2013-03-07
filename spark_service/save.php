<?php
	
require_once 'db.php';
require_once 'input.php';

$post_data = sanitize_post();
$table_name = $_GET['table'];

$save_result = save_data($table_name,$post_data);

$result = array();
if($save_result){
	$result['success'] = true; 
}else{ 
	$result['success'] = false;
}

header('Content-Type:text/json');

echo json_encode($result);
	
?>