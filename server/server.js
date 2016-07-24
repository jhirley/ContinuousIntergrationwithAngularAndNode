'use strict';

var express = require('express');

var app = express();

//Middleware

app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));

// Routes
app.get('*', function(req, res) {
	res.render('index');
});

app.listen(3000);