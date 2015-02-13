module.exports = angular.module('materialJoiForms', []).directive('joiSchema', function() {
	return {
		restrict: 'A',
		templateUrl: 'form.tmpl.html',
		scope: {
			joiSchema: '=',
			ngModel: '=',
			rowCapacity: '@',		//how many inputs per row
			rowPopulation: '@'		//you can specify how many inputs to put in each row
		},
		compile: function(tEl, tAttrs) {
			return function($scope, el, attrs) {
				//console.log("$scope.schema", $scope.joiSchema);
			}
		}
	};
}).directive('joiValidator', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, el, attrs, ngModel) {
			var detail;

			ngModel.$validators.joi = function(val) {
				var validationResult = scope.schema.validate(val);
				if (validationResult.error) {
					detail = validationResult.error.details[0];
					ngModel.$setValidity(detail.type, false);
					scope.validationMessage = detail.message;
					//TODO there are some edgecases when it doesn't show up, but that might be a bug in ngMessages,
					// will investigate it next time
					return false;
				} else {
					if (detail) {
						//console.log("ngModel validated again", ngModel);
						ngModel.$setValidity(detail.type, true);
					}
					return true;
				}
			};

			scope.$error = ngModel.$error;
		}
	}
}).directive('mdJoiInput', function($sce) {
	var valTypeMap = {
		string: 'text',
		boolean: 'checkbox'
	};
	return {
		priority: 0,
		scope: {
			schema: '=',
			ngModel: '=',
			name: '@'
		},
		restrict: 'E',
		templateUrl: 'input.tmpl.html',
		compile: function(sEl, attributes) {
			if (!attributes.ngModel) {
				throw new Error('ngModel is required on md-joi-input ' + sEl[0].outerHTML.split('<ng')[0] );
			}
			return function(scope, el, attrs) {
				var schema = scope.schema;

				var mappedType = valTypeMap[schema._type];
				var testsByName = {};
				schema._tests.forEach(function (test){
					testsByName[test.name] = test;
				});
				var minTest = testsByName.min;
				var maxTest = testsByName.max;
				scope.tests = testsByName;

				if (mappedType) {
					scope.inputType = mappedType;
				} else {
					scope.inputType = schema._type;

					//ranges
					if (schema._type === 'number') {

						if (minTest && maxTest) {
							scope.inputType = 'slider';
						}
					}
				}

				if (schema._meta && schema._meta[0]) {
					scope.label = $sce.trustAsHtml(schema._meta[0].label);
				}

				scope.placeholder = schema._examples[0];
				console.log("schema", schema);

			}
		}
	};
});