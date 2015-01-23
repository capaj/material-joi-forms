window.Hammer = require('hammer.js');
require('angular');
require('angular-route');
require('angular-aria');
require('angular-animate');
require('angular-sanitize');
require('angular-material');
require('json-editor');
require('angular-json-editor');
require('angular-strap');
require('jspm_packages/github/mgcrea/angular-strap@2.1.6/dist/angular-strap.tpl.min');
var Joi = require('joi');

require('./js/module').controller('mainCtrl', function($scope) {
	$scope.basicTypes = {
		string: Joi.string(),
		array: Joi.array(),
		boolean: Joi.boolean(),
		date: Joi.date(),
		number: Joi.number()
	}
});