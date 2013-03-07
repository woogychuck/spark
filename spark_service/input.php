<?php
function sanitize_post(){
	$post_data = array();
	
	foreach($_POST as $field => $value){
		$post_data[$field] = htmlspecialchars($value);
	}
	
	return $post_data;
}
?>