'use strict';

var express = require('express');
// var mongoose = require('mongoose');
var JobModel = require('./models/job');
var jobsData = require('./jobs-data.js');


var app = express();

//Middleware

app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/api/jobs', function(req, res) {
	jobsData.findJobs().then(function(collection) {
		res.send(collection);
	});  
});

app.get('*', function(req, res) {
	res.render('index');
});

jobsData.connectDB('mongodb://localhost/jobfinder')
.then(function(){
	console.log('connected to mongodb');
	jobsData.seedJobs();
});


app.listen(3000);