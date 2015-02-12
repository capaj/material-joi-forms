module.exports = angular.module('materialJoiForms', []).directive('joiSchema', function() {
	return {
		restrict: 'A',
		templateUrl: 'form.tmpl.html',
		scope: {
			joiSchema: '=',
			key: '@'
		},
		compile: function(tEl, tAttrs) {
			return function($scope, el, attrs) {
				//$scope.ngModel = {};
				console.log("$scope.schema", $scope.joiSchema);
			}
		}
	};
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
			return function($scope, el, attrs) {
				var schema = $scope.schema;

				var mappedType = valTypeMap[schema._type];
				var testsByName = {};
				schema._tests.forEach(function (test){
					testsByName[test.name] = test;
				});
				var minTest = testsByName.min;
				var maxTest = testsByName.max;
				$scope.tests = testsByName;

				if (mappedType) {
					$scope.inputType = mappedType;
				} else {
					$scope.inputType = schema._type;

					//ranges
					if (schema._type === 'number') {

						if (minTest && maxTest) {
							$scope.inputType = 'slider';
						}
					}
				}

				if (schema._meta && schema._meta[0]) {
					$scope.label = $sce.trustAsHtml(schema._meta[0].label);
				}

				$scope.placeholder = schema._examples[0];
				console.log("schema", schema);

				$scope.$watch('ngModel', function(newValue, oldValue) {
					if (newValue) {
						$scope.validationResult = schema.validate(newValue);
					}
				});
			}
		}
	};
});