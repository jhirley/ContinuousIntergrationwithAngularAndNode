'use strict';

var expect = require('chai').expect;
var JobModel = require('../models/job');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
var jobsData = require('../jobs-data.js');

 function resetJobs() {
 	return new Promise( function( resolve, reject) {
		mongoose.connection.collections['jobs'].drop(resolve, reject); //(resolve, reject);
 	});
 } 


// console.log(connectDB);

describe("get jobs", function() {

	var jobs;

	before(function(done) {
		jobsData.connectDB('mongodb://localhost/jobfinder')
		.then(resetJobs)
		.then(jobsData.seedJobs)
		.then(jobsData.findJobs)
		.then(function(collection) {
			jobs = collection;
			done();
		});
	});

	it("should never be empty since jobs are seeded", function() {
		expect(jobs.length).to.be.at.least(1);
	});
	
	it("should have a job with a title", function(){
		expect(jobs[0].title).to.not.be.empty;
	});

	it("should have a job with a description", function(){
		expect(jobs[0].description).to.not.be.empty;
	});
});
