myApp.directive('submitYoutubeLink', ['$location', function($location){
	// Runs during compile
	return {
		restrict: 'A', 
		link: function(scope, element, attributes) {
			element.bind('click', function() {
				scope.fancybox_controller.close();
				// scope.sharedProperties.setProperty(scope.youtube_url);
				// console.log("Submitted: "+scope.youtube_url);
				 $location.path('/edit/'+scope.youtube_url);
		        scope.$apply();
			});
		}
	};
}]);

myApp.directive('slider', function(){
	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, element, attributes, controller) {
			scope.slider = this;
			attributes.max = scope.video_duration;
			element.bind('change', function() {
				scope.updateVideoTime(this.value);
				console.log("Current Scrubbed Time: " +this.value);
				// console.log("Current Video time: "+scope.video.currentTime);
			});
		}
	};
});

myApp.directive('seekButton',  function(){
	// Runs during compile
	return {
		restrict: 'A',
		template: '{{section.start_time}}: {{section.title}}',
		link: function(scope, element, attributes, controller) {
			element.bind('click', function() {
				// console.log(attributes.myTime);
				scope.video.seekTo(attributes.myTime, true);				
			});
		}
	};
});

myApp.directive('endSection', function(){
	// Runs during compile
	return {
		link: function(scope, element, attributes) {
			element.bind('click', function(e) {
				console.log(scope.curr_time + " :: " +scope.next_start_time.value);
				if(scope.curr_time > scope.next_start_time.value){
					e.preventDefault();
					scope.video.pauseVideo();
					scope.errors="";
					var section_duration = scope.curr_time - scope.next_start_time.value;
					var percent_of_video = parseInt((section_duration / scope.video_duration)*100);
					scope.sections.push({
						start_time:scope.next_start_time.value,
						end_time:scope.curr_time,
						percent_of_video: percent_of_video,
						title: '',
						content: ''
					});
					scope.next_start_time.value = scope.curr_time;
					scope.fancybox_controller.open([
					{
						href: '#define_section_info'
					}
					]);
				//Update filler
				} else {
					scope.errors="Sections have already been defined in this area";
					console.log("Sections have already been defined in this area");
					e.stopPropagation();
					e.preventDefault();
				}
				
			});
		}
	};
});

myApp.directive('timelineSection', function($parse){
	return {
		restrict: 'A',

		template: '{{section.title}}<a href="#" class="edit-section-button" section-id="{{$index}}"></a></div>',

		link: function(scope, element, attributes) {
			console.log("timelinSection Started");
    		attributes.$observe('videoDuration', function(value) {
    			if(attributes.videoDuration.length > 0) {
    				// console.log('Observed StartTime: '+value);
	    			var start_time = attributes.startTime;
	    			console.log("Start Time:" + start_time)
					var end_time = attributes.endTime;
					var sectionDuration = end_time-start_time;
					var video_duration = attributes.videoDuration;
					console.log("End Time"+end_time);
					console.log("Vid Duration "+video_duration);
					var percent_of_video_duration = parseInt((sectionDuration / video_duration)*100);
					console.log("% Time: "+percent_of_video_duration);
					attributes.$set('style', 'width: '+percent_of_video_duration+"%");
					scope.next_start_time.value = end_time;
					scope.updateFillerSection();
    			}
    			
    		});
			element.bind('click', function() {
				scope.video.seekTo(attributes.startTime, true);				
			});
		}
	};
});
myApp.directive('editSectionButton', function() {
	return {
		restrict: "C",
		link: function(scope, element, attributes) {
			element.bind('click', function(e) {
				scope.params.current_edit = attributes.sectionId;
				scope.video.pauseVideo();
				e.preventDefault();
				scope.fancybox_controller.open([
		        {
		            href : '#edit_section_info'
		        }]);
			});
		}
	};
});
myApp.directive('timelineFiller', function(){
	return {
		link: function(scope, element, attributes, controller) {
			element.bind('click', function() {
				scope.video.seekTo(scope.next_start_time.value, true);				
			});
		}
	};
});
myApp.directive('submitSection',  function(){
	return {

		link: function(scope, element, attributes) {
			element.bind('click', function(e) {
				e.preventDefault();
				scope.params.current_section++;
				console.log("Submitted new section");
				scope.fancybox_controller.close();
				scope.video.playVideo();
			});
		}
	};
});
myApp.directive('editSection',  function(){
	return {
		link: function(scope, element, attributes) {
			element.bind('click', function(e) {
				e.preventDefault();
				console.log("Edited section");
				scope.fancybox_controller.close();
				scope.video.playVideo();
			});
		}
	};
});
myApp.directive('videoPlayer', function(){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function(scope, element, attributes, controller) {
			element.bind("loadeddata", function() {
				scope.video = this;
				console.log("Loaded a "+this.duration);
				scope.video_duration = this.duration;
				// scope.$apply();
			});
			element.bind("ended", function() {
				console.log("Done.");
			});
			element.bind("playing", function() {
			   console.log("Playing");
			}).bind("seeking", function() {
				// console.log("Seeking at "+this.currentTime);
				scope.updateSlider(this.currentTime);
			}).bind("timeupdate", function() {
				// console.log("Time Change"+this.currentTime);
				scope.updateSlider(this.currentTime);

			});
		}
	};
});
