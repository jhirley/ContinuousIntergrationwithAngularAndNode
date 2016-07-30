'use strict';

var expect = require('chai').expect;
var request = require('supertest');
// var JobModel = require('../models/job');
// var mongoose = require('mongoose');
// var Promise = require('bluebird');
// mongoose.Promise = require('bluebird');
// var jobsData = require('../jobs-data.js');

describe('save jobs', function(){
	it('should validate that the title is greater than 4 characters ');
	it('should validate that the title is less than 40 characters ');
	it('should validate that the description is greater than 4 characters ');
	it('should validate that the description is less than 250 characters ');

	var dataSavedJob;
	var newJob = {title: 'Sales Person', description: 'Will fight dragons'};

	it('should pass the job to the database and save', function() {
		expect(dataSavedJob).to.deep.equal(newJob);
	});
	it('should return a status of 200 to the front end if the database saved');
	it('should return a job with an id');
	it('should return an error if the database failed');
});