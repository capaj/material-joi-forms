//window.Hammer = require('hammer');
//require('angular');
//require('angular-aria');
//require('angular-animate');
//require('angular-sanitize');
require('angular-material');

var Joi = require('joi');

require('./module').controller('mainCtrl', function($scope) {
	$scope.basicTypes = {
		string: Joi.string(),
		array: Joi.array(),
		boolean: Joi.boolean(),
		date: Joi.date(),
		number: Joi.number()
	}
});