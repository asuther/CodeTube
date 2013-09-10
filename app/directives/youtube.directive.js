var ytplayer = "";
//On State Change
function checkStateChange(value) {
	// console.log("CSC: "+value);
  	angular.element(document.getElementById('body')).scope().$apply(function(scope){
  		scope.state = value;
  	});
}
var interval = setInterval(function() {checkTime();}, 500);

function checkTime() {
	angular.element(document.getElementById('body')).scope().$apply(function(scope){
		if(ytplayer) {
			scope.curr_time = ytplayer.getCurrentTime();
            
		}
  	});
}
$(function() {
    angular.element(document.getElementById('body')).scope().$apply(function(scope){
        scope.$on('$routeChangeSuccess', function (new_scope, next, current) {
            // console.log(angular.toJson(current));
            //On Video Load
          
            var params = { allowScriptAccess: "always" };
            var atts = { id: "myytplayer" };
            var youtube_url = next.params.url;
            // console.log(scope.title);
            // console.log("Changing to video: "+"http://www.youtube.com/v/"+youtube_url+"?enablejsapi=1&playerapiid=ytplayer&version=3");
            swfobject.embedSWF("http://www.youtube.com/v/"+youtube_url+"?enablejsapi=1&playerapiid=ytplayer&version=3",
               "ytapiplayer", $(document).width()*0.75, $(document).height()*0.75, "8", null, null, params, atts);

        });
    });
});

function onYouTubePlayerReady(playerId) {
	console.log("HERE");
  	ytplayer = document.getElementById("myytplayer");
  	$(ytplayer).attr('data-video-player','');
  	//Add the youtube player to angularjs
  	angular.element(document.getElementById('body')).scope().$apply(function(scope){
        scope.video = ytplayer;
        ytplayer.addEventListener("onStateChange", 'checkStateChange');
    });
}
