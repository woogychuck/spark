'use strict';


// Declare app level module which depends on filters, and services
angular.module('sparkApp', ['sparkApp.filters', 'sparkApp.services', 'sparkApp.directives'], function($httpProvider)
	{	
		return php_post_setup($httpProvider);
	}).
  config(['$routeProvider', function($routeProvider) {
	  //Spark Routes
	  $routeProvider.when('/sparks', {templateUrl: 'partials/spark/list.html', controller: SparkListCtrl});
	  $routeProvider.when('/spark/details/:sparkId', {templateUrl: 'partials/spark/detail.html', controller: SparkDetailCtrl});
	  $routeProvider.when('/spark/create', {templateUrl: 'partials/spark/form.html', controller: SparkEditCtrl});
	  $routeProvider.when('/spark/edit/:sparkId', {templateUrl: 'partials/spark/form.html', controller: SparkEditCtrl});
	  
	  //User Routes
	  $routeProvider.when('/users', {templateUrl: 'partials/user/list.html', controller: UserListCtrl});
	  $routeProvider.when('/user/details/:userId', {templateUrl: 'partials/user/detail.html', controller: UserDetailCtrl});
	  $routeProvider.when('/user/create', {templateUrl: 'partials/user/form.html', controller: UserEditCtrl});
	  $routeProvider.when('/user/edit/:userId', {templateUrl: 'partials/user/form.html', controller: UserEditCtrl});
	  
	  $routeProvider.otherwise({redirectTo: '/sparks'});
  }]);


