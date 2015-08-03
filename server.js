var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 8000));

app.use(express.static(path.join(__dirname, '/')));

// app.get('/', function(req, res){
// 	res.sendfile('index.html');
// });

var server = app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});

//--------- Sockets -------------
var io = require('socket.io').listen(server);
var scrambledWord = [];

io.sockets.on('connection', function(socket){
	socket.on('test', function(data){
		console.log(data.message);
	});
	socket.on('shuffledWords', function(data){
		scrambledWord = data;
		console.log(scrambledWord);
		io.emit('setWords', scrambledWord);
	});
	socket.on('rearrangeWord', function(data){
		scrambledWord = data;
		console.log(scrambledWord);
		io.emit('setWords', scrambledWord);
	})
})