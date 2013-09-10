var myApp = angular.module('myApp', []);


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'app/partials/home.html',   controller: 'HomeCtrl'}).
      when('/edit/:url', {templateUrl: 'app/partials/edit.html', controller: 'EditCtrl'}).
      otherwise({redirectTo: '/'});
}]);

myApp.controller('HomeCtrl', function($scope) {
	$scope.youtube_url = "";
	$scope.fancybox_controller;
	$scope.test = "Working";
	// $scope.sharedProperties = sharedProperties;
});

myApp.controller('EditCtrl', function($scope, $routeParams, $http) {
	$scope.fancybox_controller;
	$scope.errors = "";
	$scope.title = "This is a title";
	$scope.video;
	$scope.state;
	$scope.state_text = "Play";
	$scope.curr_time;
	$scope.video_duration;
	$scope.next_start_time = {value: 0};
	$scope.params = {
		remaining_width: 100,
		current_section: 0,
		current_edit:0
	};
	$scope.slider;
	$scope.slider_value=0;
    // $scope.youtube_url = sharedProperties.getProperty();
    $scope.youtube_url = $routeParams.url;
	$scope.$watch('video', function (new_value, old_value){
		if($scope.video){
			$scope.video_duration = $scope.video.getDuration();
			
			// console.log("Duration: " + $scope.video_duration);

			//Get widths of all sections
			// for(var section_index=0;section_index<$scope.sections.length;section_index++) {
			// 	var sectionDuration = $scope.sections[section_index].duration;
			// 	var percent_of_video_duration = parseInt((sectionDuration / $scope.video_duration)*100);
			// 	console.log("% Time: "+percent_of_video_duration);
			// 	$scope.sections[section_index].percent_of_video = percent_of_video_duration;
			// }
		}
	});

	$scope.$watch('state', function(new_value, old_value) {
		// console.log("State Change: "+new_value);
		if(new_value == 1) {
			$scope.state_text = "Pause";
		} else if(new_value == 2) {
			$scope.state_text = "Play";
		} else {
			$scope.state_text = "Play";
		}
	});
	$scope.updateSlider = function(new_time) {
		console.log("Slider Updated to new time: "+new_time);
		$scope.slider_value = new_time;
		// $scope.updateContent(new_time);
		// $scope.$apply();
	};
	$scope.updateFillerSection = function() {
		console.log("MEOW");
		var total_percentage_of_video = 0;
		for(var section_index=0;section_index<$scope.sections.length;section_index++) {
			total_percentage_of_video+=$scope.sections[section_index].percent_of_video;

		}
		$scope.params.remaining_width = 99-total_percentage_of_video;
		console.log("Total of Video:" +total_percentage_of_video);
	};

	$scope.$watch('curr_time', function(new_value, old_value) {
		console.log("Current Time: "+new_value);
        $scope.updateSlider(new_value);
    });
	$http.post('ajax/fetchSections.php', {}).
		success(function(data) {
			// console.log("FetchSectionData:" + data);

			$scope.sections = angular.fromJson(data);
			$scope.params.current_section = $scope.sections.length;
			// for(var section_index=0;section_index<$scope.sections.length;section_index++) {
			// 	var start_time = $scope.sections[section_index].start_time;
			// 	var end_time = $scope.sections[section_index].end_time;
			// 	var sectionDuration = end_time-start_time;
			// 	$scope.sections[section_index].duration = sectionDuration;
			// }
			
		});
	$scope.updateVideoTime = function(new_time) {
		console.log("Updated time to "+new_time);
		// $scope.curr_time = new_time;
		$scope.video.seekTo(new_time, true);
		// $scope.updateContent(new_time);
	};
	
});


