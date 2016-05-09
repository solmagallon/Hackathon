(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('appController', appController);

	appController.$inject = ['queryFactory', 'trailFactory', '$log', '$sce'];
	function appController(queryFactory, trailFactory, $log, $sce){
		var vm = this;
		const YOUTUBE_KEY = "&key=AIzaSyAGGi10zMvYlSfc8m_VsOIuesj-D1i6HeM";
		const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&maxResults=8";

		var query = YOUTUBE_URL;
		query += YOUTUBE_KEY;
		query += "&q=hiking+";

		vm.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}

		vm.selectVideo = function(trail, video){
			trail.selectedVideo = video.id.videoId;
		}

		vm.getTrails = function(){
			trailFactory.getData(vm.name, vm.city, vm.state)
			.then(function(response){
				vm.trails = response.data.places;
				angular.forEach(vm.trails, function(element){
					var url = query + element.name;
					queryFactory.getData(url)
					.then(function(response){
						element.videos = response.data.items;	
						element.selectedVideo = element.videos[0].id.videoId
						console.log(element.videos[0].id.videoId)
					}, function(error){
						$log.error("Could not get data.");
					});					
				})
			}, function(error){
				$log.error("Could not get data.")
			})
		}
	}
})();