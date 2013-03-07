'use strict';

/* User Controllers */

/* Gets a list of all users currently in the system */
function UserListCtrl($scope,$http) {
	$http.get('/spark/spark_service/get.php?table=users').success(function(data){
		$scope.users = data;
	});
}
UserListCtrl.$inject = ['$scope','$http'];

/* Gets details for user identified by route parameter */
function UserDetailCtrl($scope,$http,$routeParams) {
	$http.get('/spark/spark_service/get.php?table=users&id=' + $routeParams.userId).success(function(data){
		$scope.user = data[0];
	});
}
UserDetailCtrl.$inject = ['$scope','$http','$routeParams'];

/* Provides functionality for creating and editing users */
function UserEditCtrl($scope,$http,$routeParams) {
	// original user represents default values on create and data loaded from db on edit
	// original user is also used to determine if the model is dirty
	var originalUser = {display_name:'',email:''};
	$scope.saved = false;
	$scope.loading = false;
	
	if($routeParams.userId){
		$http.get('/spark/spark_service/get.php?table=users&id=' + $routeParams.userId).success(function(data){
			$scope.user = data[0];
			originalUser = angular.copy(data[0]);
		});
	}else{
		$scope.user = angular.copy(originalUser);
	}
	
	$scope.save = function(){
		$scope.loading = true;
		$http.post('/spark/spark_service/save.php?table=users',$scope.user).success(function(data){
			$scope.saved = data.success;
			$scope.loading = false;
		});
	}
	
	$scope.cancel = function(){
		$scope.user = angular.copy(originalUser);
	}
	
	$scope.isCancelDisabled = function() {
		return angular.equals(originalUser, $scope.user);
	};
 
	$scope.isSaveDisabled = function() {
		return $scope.userForm.$invalid || angular.equals(originalUser, $scope.user);;
	};
}
UserEditCtrl.$inject = ['$scope','$http','$routeParams'];
