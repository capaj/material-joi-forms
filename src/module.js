module.exports = angular.module('materialJoiForms', []).directive('mdJoiForm', function() {
	return {
		scope: {
			schema: '='
		},
		restrict: 'E',

		templateUrl: '',
		link: function($scope, el, attrs) {
			console.log("$scope.schema", $scope.schema);
			debugger;
		}
	};
}).directive('mdJoiInput', function($sce) {
	var valTypeMap = {
		string: 'text',
		boolean: 'checkbox'
	};
	return {
		scope: {
			schema: '='
		},
		restrict: 'E',
		templateUrl: 'input.tmpl.html',
		link: function($scope, el, attrs) {
			var schema = $scope.schema;
			var mappedType = valTypeMap[schema._type];

			if (mappedType) {
				$scope.inputType = mappedType;
			} else {
				$scope.inputType = schema._type;

				//ranges
				if (schema._type === 'number') {

					var minTest = schema._tests.filter(function(test) {
						return test.name === 'min';
					})[0];
					var maxTest = schema._tests.filter(function(test) {
						return test.name === 'max';
					})[0];

					if (minTest && maxTest) {
						$scope.inputType = 'slider';
						$scope.min = minTest.arg;
						$scope.max = maxTest.arg;
					}
				}
			}

			if (schema._meta && schema._meta[0]) {
				$scope.label = $sce.trustAsHtml(schema._meta[0].label);
			}

			$scope.placeholder = schema._examples[0];
			console.log("$scope.schema", schema);
		}
	};
});