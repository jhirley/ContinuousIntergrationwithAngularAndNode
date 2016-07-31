'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();

var dataSavedJob;
var db = {
	findJobs: function(){
		return new Promise(function(resolve, reject){
			resolve(['hi']);
		});
	},
	saveJob: function(job) {
		dataSavedJob = job;
	}
};
var JobService = require('../jobs-service')(db, app);
// var JobModel = require('../models/job');
// var mongoose = require('mongoose');
// var Promise = require('bluebird');
// mongoose.Promise = require('bluebird');
// var jobsData = require('../jobs-data.js');

describe('get jobs', function(){
	it('should give us a list of jobs in json', function(done){
		request(app).get('/api/jobs')
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			console.log(res.body);
			expect(res.body).to.be.a('Array');
			done();
		});
	});
});

describe('save jobs', function(){
	it('should validate that the title is greater than 4 characters ');
	it('should validate that the title is less than 40 characters ');
	it('should validate that the description is greater than 4 characters ');
	it('should validate that the description is less than 250 characters ');

	
	var newJob = {title: 'Sales Person', description: 'Will fight dragons'};

	it('should pass the job to the database and save', function(done) {
		request(app).post('/api/jobs').send(newJob).end(function( error, response ){
			expect(dataSavedJob).to.deep.equal(newJob);
			done();
		});
	});
	it('should return a status of 200 to the front end if the database saved');
	it('should return a job with an id');
	it('should return an error if the database failed');
});