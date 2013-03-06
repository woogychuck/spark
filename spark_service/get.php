<?php

	require_once 'db.php';
	
	$params = array();
	$params['@Table'] = $_GET['table'];
	
	$getQuery = 'SELECT * FROM @Table';
	
	if(isset($_GET['id']) && $_GET['id'] != ''){
		$params['@Id'] = $_GET['id'];
		$getQuery .= ' WHERE id = @Id';
	}
	
	$result = clean_query($getQuery, $params);

	json_result($result);
?>