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
			console.log("$scope.schema", schema);
		}
	};
});