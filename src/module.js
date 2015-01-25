module.exports = angular.module('materialJoiForms', []).directive('mdJoiForm', function() {
	return {
		scope: {
			restrict: 'E',
			schema: '=',
			templateUrl: '',
			link: function($scope, el, attrs) {
				console.log("$scope.schema", $scope.schema);
				debugger;
			}
		}
	};
}).directive('mdJoiInput', function() {
	return {
		scope: {
			restrict: 'E',
			model: '=',
			templateUrl: '',
			link: function($scope, el, attrs) {
				console.log("$scope.model", $scope.model);
				debugger;
			}
		}
	};
});