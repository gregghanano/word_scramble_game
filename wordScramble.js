myApp.controller('wordScramble',function ($scope, wordFactory){
	var socket = io.connect();
	$scope.details = {};
	$scope.correctWord = [];
	$scope.shuffledWord = [];
	$scope.letters = [];
	$scope.guessedLetters = []; // for checking but can later be removed

	wordFactory.getRandomWord(function(data){
		console.log('got letters');
		console.log(data);
		$scope.details = data;
		wordFactory.shuffleLetters(data.word, function(data){
			console.log('shuffled letters');
			console.log(data);
			$scope.letters = data;
		});
	})

	socket.on('setWords', function(data){
		console.log('in setWords socket');
		console.log('socket data');
		console.log(data);
		
		$scope.letters=data;
		console.log('fetch!');
		
		
	});

	window.addEventListener('keydown', function(e){
			console.log(e.keyCode);
			var value = String.fromCharCode(e.keyCode).toLowerCase();
			console.log(value);
			$scope.checkLetter(value, e.keyCode);
	});


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
						console.log($scope.letters);
						return socket.emit('rearrangeWord', $scope.letters);
					}
					
				}
			}
		}
	}
});

























