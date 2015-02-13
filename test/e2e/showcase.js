require('angular-material');
require('angular-messages');

var Joi = require('joi');
require('module');

angular.module('materialJoiFormsShowcase', [
	'materialJoiForms', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngMessages'
]).controller('mainCtrl', function($scope) {
	$scope.basicTypes = {
		string: Joi.string().alphanum().max(10).example('testtest'),
		array: Joi.array(),
		boolean: Joi.boolean().meta({label: 'this is how you define a label'}),
		date: Joi.date(),
		number: Joi.number(),
		range: Joi.number().min(0).max(100)
	};

	$scope.schema = Joi.object().keys($scope.basicTypes);

	$scope.string = 'aaa';
	$scope.bool = true;
	$scope.range = 50;
	$scope.myFormVals = {
		string: 'bvve',
		bool: true,
		range: 70
	}

});