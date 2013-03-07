'use strict';

/* Spark Controllers */

/* Gets a list of all sparks currently in the system */
function SparkListCtrl($scope,$http) {
	$http.get('/spark/spark_service/get.php?table=sparks').success(function(data){
		$scope.sparks = data;
	});
}
SparkListCtrl.$inject = ['$scope','$http'];

/* Gets details for spark identified by route parameter */
function SparkDetailCtrl($scope,$http,$routeParams) {
	$http.get('/spark/spark_service/get.php?table=sparks&id=' + $routeParams.sparkId).success(function(data){
		$scope.spark = data[0];
	});
}
SparkDetailCtrl.$inject = ['$scope','$http','$routeParams'];

/* Provides functionality for creating and editing sparks */
function SparkEditCtrl($scope,$http,$routeParams) {
	// original spark represents default values on create and data loaded from db on edit
	// original spark is also used to determine if the model is dirty
	var originalSpark = {title:'',description:''};
	$scope.saved = false;
	$scope.loading = false;
	
	if($routeParams.sparkId){
		$http.get('/spark/spark_service/get.php?table=sparks&id=' + $routeParams.sparkId).success(function(data){
			$scope.spark = data[0];
			originalSpark = angular.copy(data[0]);
		});
	}else{
		$scope.spark = angular.copy(originalSpark);
	}
	
	$scope.save = function(){
		$scope.loading = true;
		$http.post('/spark/spark_service/save.php?table=sparks',$scope.spark).success(function(data){
			$scope.saved = data.success;
			$scope.loading = false;
		});
	}
	
	$scope.cancel = function(){
		$scope.spark = angular.copy(originalSpark);
	}
	
	$scope.isCancelDisabled = function() {
		return angular.equals(originalSpark, $scope.spark);
	};
 
	$scope.isSaveDisabled = function() {
		return $scope.sparkForm.$invalid || angular.equals(originalSpark, $scope.spark);;
	};
}
SparkEditCtrl.$inject = ['$scope','$http','$routeParams'];
