'use strict';

var app = angular.module('app',['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource,jobs){
	$scope.jobs = $resource('/api/jobs').query();
	$scope.test = 'working';
	jobs.save({title: 'test title', description: 'test description'});
});