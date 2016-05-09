(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('appController', appController);

	appController.$inject = ['queryFactory', 'trailFactory', '$log', '$sce'];
	function appController(queryFactory, trailFactory, $log, $sce){
		var vm = this;

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
					// get the youtube data for each trail.  
					queryFactory.getData(element)
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