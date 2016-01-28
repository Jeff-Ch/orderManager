var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, function(){
	console.log('listening on port 8000');
})

// var io = require('socket.io').listen(server);