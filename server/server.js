'use strict';

var express = require('express');
var mongoose = require('mongoose');
var JobModel = require('./models/job');

var app = express();

//Middleware

app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/api/jobs', function(req, res) {
	mongoose.model('Job').find({}).exec(function(error, collection) {
		res.send(collection);
	});  
});

app.get('*', function(req, res) {
	res.render('index');
});

mongoose.connect('mongodb://localhost/jobfinder');
var con = mongoose.connection;

con.once('open', function(){
	console.log('cnnected to mongodb');
	JobModel.seedJobs();
});

app.listen(3000);