require('angular-material');
require('angular-messages');

var Joi = require('joi');
require('module');

angular.module('materialJoiFormsShowcase', [
	'materialJoiForms', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngMessages'
]).controller('mainCtrl', function($scope) {
	$scope.basicTypes = {
		string: Joi.string().example('test test'),
		array: Joi.array(),
		boolean: Joi.boolean().meta({label: 'this is how you define a label'}),
		date: Joi.date(),
		number: Joi.number(),
		range: Joi.number().min(0).max(100)
	}
});