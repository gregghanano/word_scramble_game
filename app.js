var myApp = angular.module('myApp',[]);
myApp.controller('wordScramble',function ($scope, $http){
	$scope.details = {};
	console.log($scope.details);
	$scope.correctWord = [];
	$scope.shuffledWord = [];
	$scope.letters = [];
	$scope.guessedLetters = []; // for checking but can later be removed
	console.log($scope.guessedLetters);

	window.addEventListener('keydown', function(e){
			console.log(e.keyCode);
			var value = String.fromCharCode(e.keyCode).toLowerCase();
			console.log(value);
			$scope.checkLetter(value, e.keyCode);

	}]);

	$scope.randomWord = function(){
		var path = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
		$http.get(path).success(function(response){
			$scope.details = response;
			console.log($scope.details);
			$scope.correctWord = $scope.details.word.split('');
			$scope.shuffleWord($scope.details.word);
			console.log($scope.correctWord);
		})
	}
	$scope.randomWord();

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

		$scope.shuffledWord = scrambled.split('');
		
		for(var i in $scope.shuffledWord){
			$scope.letters.push({
				letter : $scope.shuffledWord[i],
				used : false
			});
		}
		console.log($scope.letters);
	}

	$scope.checkLetter = function(typedLetter, keyCode){
		console.log('letter typed = ' + typedLetter);
		if(keyCode === 8){
			//delete guessed letter
			//go back wards through the array and 
			// change the first used === true to 
			// used === false
			// possibly rearrange to show change
			e.preventDefault();
		}
		for(var i=0; i<$scope.letters.length; i++){
			if($scope.letters[i].letter === typedLetter && $scope.letters[i].used === false){
				var index = $scope.letters.indexOf($scope.letters[i]);
				$scope.letters[i].used = true;
				console.log('the letter ' + typedLetter + ' is in there' );
				return $scope.rearrangeWord(typedLetter, keyCode, index);
				//re-arrange letters function
				//$scope.rearrangeWord(typedLetter, keyCode, index);

			}
		}
	}

	$scope.rearrangeWord = function(typedLetter, keyCode, index){
		//take the type letter and find the matching
		// letter in the array, switch to front
		if(keyCode === 8){
			//delete guessed letter
			e.preventDefault();
		} else {
			if(index > -1){
				console.log(index);
				console.log($scope.letters);
				var temp = $scope.letters[index];
				console.log(temp);
				for(var i = 0; i < $scope.letters.length; i++){
					if($scope.letters.indexOf($scope.letters[i]) === index){
						return;
					}
					if($scope.letters[i].used === false){
						$scope.letters[index] = $scope.letters[i];
						$scope.letters[i] = temp;
						return;
					}
					
				}
			}
		}
	}
});

























