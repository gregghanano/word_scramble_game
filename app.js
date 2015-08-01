var myApp = angular.module('myApp', []);

	myApp.controller('wordController', function ($scope, $http){
		window.addEventListener('keydown', function(e){
			console.log(e.keyCode);
			if(e.keyCode === 13){
				// check if word is right first
				$scope.randomWord();
			}
		});
		
		$scope.details = {};
		$scope.correctWord = [];
		$scope.letters = [];
		
		//api call
		$scope.randomWord = function(){
			var path = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
			$http.get(path).success(function(response){
				$scope.details = response;
				console.log($scope.details);
				$scope.correctWord = $scope.details.word.split('');
				$scope.shuffleWord($scope.details.word);
			})
		}
		$scope.randomWord();
		//end api call;

		$scope.shuffleWord = function(string){
			console.log(string);
			var word = string
			var wordLength = word.length;
			var scrambled = '';

			for (var i = 0; i < wordLength; i++) {
			    var charIndex = Math.floor(Math.random() * word.length);
			    scrambled += word.charAt(charIndex);
			    word = word.substr(0, charIndex) + word.substr(charIndex + 1);
			}

			var array = scrambled.split('');
			
			for(var i in array){
				// $scope.letter = {};
				// $scope.letter.character = array[i];
				// $scope.letter.used = false;
				$scope.letters.push({
					letter : array[i],
					used : false
				});
			}
			console.log($scope.letters);
		}


		$scope.keyPress = function(keyCode){
			console.log(keyCode);
		}
	});