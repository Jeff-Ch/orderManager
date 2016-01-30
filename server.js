var express = require('express');
var path = require('path');
var app = express();
require('./server/config/mongoose.js')

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.get('/',function(req,res){
	res.render('index');
});

var server = app.listen(8080, function(){
	console.log('listening on port 8080');
})
