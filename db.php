<?php
	$db = mysql_connect('localhost','spark_db','sparky');
	mysql_select_db('spark_dev');
	
	function clean_query($query, $params){
		$clean_query = $query;
		foreach($params as $name => $value){
			$clean_value = mysql_real_escape_string($value);
			$clean_query = str_replace($name, $clean_value, $clean_query);
		}
		
		$query_result = mysql_query($clean_query);
		
		return $query_result;
	}
	
	function json_result($db_result){
		$output = array();
		
		while($result_item = mysql_fetch_assoc($db_result)){
			$output[] = $result_item;
		}
		
		$json_output = json_encode($output);
		
		header('Content-Type:text/json');
		echo $json_output;
	}
	
?>