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
	
	function save_data($table_name, $data, $ignore_fields = array('id','created')){
		$is_update = isset($data['id']) && $data['id'] != '';
		$save_query = '';
		if($is_update){
			$value_clause = '';
			foreach($data as $col => $value){
				if(!in_array($col, $ignore_fields)){
					$value_clause .= "`$col` = '$value',";
				}
			}
			$value_clause = trim($value_clause,',');
			$save_query = "UPDATE $table_name SET $value_clause WHERE id = ".$data['id'];
		}else{
			$column_clause = '';
			$value_clause = '';
			foreach($data as $col => $value){
				if(!in_array($col, $ignore_fields)){
					$column_clause .= "`$col`,";
					$value_clause .= "'$value',";
				}
			}
			$column_clause = trim($column_clause,',');
			$value_clause = trim($value_clause,',');
			$save_query = "INSERT INTO $table_name ($column_clause) VALUES ($value_clause)";
		}
		$result = mysql_query($save_query);
		
		return $result;
	}
	
?>