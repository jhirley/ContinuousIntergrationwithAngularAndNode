'use strict';

angular.module('app',[]);

angular.module('app').controller('testCtrl', function($scope){
	$scope.jobs = [{
		title: 'Sales Person',
		description: 'Will fight dragons'
	},{
		title: 'Accountant',
		description: 'Will use a keyboard'
	},{
		title: 'Carebear Wrangler',
		description: 'Will fight with adult children'
	}];
	$scope.test = 'working';
});