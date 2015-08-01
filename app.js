var myApp = angular.module('myApp', []);

	myApp.controller('wordController', function ($scope, $http){
		window.addEventListener('keydown', function(e){
			console.log(e.keyCode);
		});
		
		$scope.details = {};
		$scope.letters = {};
		
		//api call
		(function fetch(){
			var path = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
			$http.get(path)
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
		//----end api call


		$scope.keyPress = function(keyCode){
			console.log(keyCode);
		}
	});