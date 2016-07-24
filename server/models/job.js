'use strict';

var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
	title:{type:String},
	description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
	Job.find({}).exec(function(error, collection) {
		if(collection.length === 0) {
			Job.create({title: 'Sales Person', description: 'Will fight dragons'});
			Job.create({title: 'Accountant', description: 'Will use a keyboard'});
			Job.create({title: 'Carebear Wrangler', description: 'Will fight with adult children'});
			Job.create({title: 'Kitty Vomit Cleaner', description: 'Will clean cat fun'});
			console.log('job.js seedJobs Jobs created');
		}
	});
}