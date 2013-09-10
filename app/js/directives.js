myApp.directive('submitYoutubeLink', ['$location', function($location){
	// Runs during compile
	return {
		restrict: 'A', 
		link: function(scope, element, attributes) {
			element.bind('click', function() {
				scope.fancybox_controller.close();
				// scope.sharedProperties.setProperty(scope.youtube_url);
				console.log("Submitted: "+scope.youtube_url);
				 $location.path('/edit/'+scope.youtube_url);
		        scope.$apply();
			});
		}
	};
}]);


myApp.directive('seekButton',  function(){
	// Runs during compile
	return {
		restrict: 'A',
		template: '{{section.start_time}}: {{section.title}}',
		link: function(scope, element, attributes, controller) {
			element.bind('click', function() {
				console.log(attributes.myTime);
				scope.video.seekTo(attributes.myTime, true);				
			});
		}
	};
});

myApp.directive('endSection', function(){
	// Runs during compile
	return {
		link: function(scope, element, attributes) {
			element.bind('click', function() {
				scope.sections.push({
					start_time:scope.curr_time,
					title: 'Test',
					content: 'This is the content'
				})
			});
		}
	};
});

myApp.directive('timelineSection', function($parse){
	return {
		restrict: 'A',
		template: '{{section.title}}</td>',
		link: function(scope, element, attributes) {
			console.log("timelinSection Started");
			element.bind('click', function() {
				// var start_time = attributes.startTime;
				// var end_time = attributes.endTime;
				// var sectionDuration = end_time-start_time;
				// var percent_of_video_duration = parseInt((sectionDuration / scope.video_duration)*100);
				// console.log("% Time: "+percent_of_video_duration);
				// attributes.$set('style', 'width: '+percent_of_video_duration+"%");

			});
		}
	};
});