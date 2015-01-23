module.exports = angular.module('materialJoiForms', []).directive('mdJoiForm', function() {
	return {
		scope: {
			restrict: 'E',
			schema: '=',
			templateUrl: '',
			link: function($scope, el, attrs) {
				$scope.schema
			}
		}
	};
});