'use strict';

angular.module('app',['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource){
	$scope.jobs = $resource('/api/jobs').query();
	$scope.test = 'working';
});