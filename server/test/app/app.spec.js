// 'use strict';

// var require = ('chai').expect;


describe('posting jobs', function(){

	var postRequestJob;

	it('should call /api/jobs with job data', inject(function($httpBackend){
		$httpBackend.whenPOST('/api/jobs', function( data ){
			postRequestJob = JSON.parse(data);
			expect(postRequestJob).to.not.be.empty;
			return true;
		}).respond(200);	
	}));
});