var myApp = angular.module('myApp', []);

	myApp.controller('wordController', function ($scope, $http){
		$scope.details={};
		$scope.letters = {};

		(function fetch(){
			$http.get('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
			.success(function(response){
				$scope.details = response;
				console.log($scope.details);
				console.log($scope.details.word);

				var word = $scope.details.word;
				var wordLength = word.length;
				var scrambled = '';

				for (var i = 0; i < wordLength; i++) {
				    var charIndex = Math.floor(Math.random() * word.length);
				    scrambled += word.charAt(charIndex);
				    word = word.substr(0, charIndex) + word.substr(charIndex + 1);
				}

				$scope.letters = scrambled.split('');
				console.log($scope.letters);
				});
			})();
	});