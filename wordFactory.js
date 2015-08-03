myApp.factory('wordFactory', function($http){
	var correctWord = '';
	var otherletters = [];
	var shuffledWord = [];
	var path = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';


	var factory = {};
	

	factory.getRandomWord = function(callback){
		$http.get(path).success(function(output){
			letters = output;
			console.log(letters);
			callback(letters);
		});
	}

	factory.shuffleLetters = function(string, callback){
		var letters = [];
		var word = string
		var wordLength = word.length;
		var scrambled = '';

		for (var i = 0; i < wordLength; i++) {
		    var charIndex = Math.floor(Math.random() * word.length);
		    scrambled += word.charAt(charIndex);
		    word = word.substr(0, charIndex) + word.substr(charIndex + 1);
		}

		shuffledWord = scrambled.split('');
		
		for(var i in shuffledWord){
			letters.push({
				letter : shuffledWord[i],
				used : false
			});
		}
		console.log(letters);
		otherletters = letters;
		console.log(otherletters);
		callback(otherletters);
		//socket.emit('shuffledWords', $scope.letters);
	}

	return factory;
})