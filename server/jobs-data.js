'use strict';

// var expect = require('chai').expect;
// var JobModel = require('./models/job');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');

var Job = mongoose.model('Job');

var jobs = [
	{title: 'Sales Person', description: 'Will fight dragons'}
	,{title: 'Accountant', description: 'Will use a keyboard'}
	,{title: 'Carebear Wrangler', description: 'Will fight with adult children'}
	,{title: 'Kitty Vomit Cleaner', description: 'Will clean cat fun'}
];

var findJobs = function(query) {
	return Promise.cast(mongoose.model('Job').find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, {context:mongoose});

var createJob = Promise.promisify(Job.create, {context:Job});

exports.seedJobs = function() {
	return findJobs({}).then(function(collection) {
		if(collection.length === 0) {
			return Promise.map(jobs, function(job){
				return createJob(job);
			});
		}
	});
};

