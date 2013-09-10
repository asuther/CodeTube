$(function() {
	$('.fancybox').fancybox();

	// On PageLoad
	angular.element(document.getElementById('body')).scope().$apply(function(scope){
		scope.$on('$routeChangeSuccess', function () {
			scope.fancybox_controller = $.fancybox;
			$('.fancybox_div').hide();
		});
	});
});

myApp.directive('fancyboxDiv', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, element, attributes) {
			element.hide();
		}
	};
});