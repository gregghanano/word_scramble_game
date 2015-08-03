var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/scramble.html'
	})
	.otherwise({
		redirectTo: 'partials/scramble.html'
	})
});