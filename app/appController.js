(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('appController', appController);

	appController.$inject = ['queryFactory', '$log'];
	function appController(queryFactory, $log){
		var vm = this;
		const YOUTUBE_KEY = "&key=AIzaSyAGGi10zMvYlSfc8m_VsOIuesj-D1i6HeM";
		const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&maxResults=8";
		
		const VIDEO_URL = "https://www.youtube.com/watch?v=";

		var query = YOUTUBE_URL;
		query += YOUTUBE_KEY;
		query += "&q=hiking+";

		vm.dataToVar = function(url){
			queryFactory.getData(url)
			.then(function(response){
				vm.videos = response.data.items;	
				console.log(response.data.items)
			}, function(error){
				$log.error("Could not get data.");
			});
		}
		
		//https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?part=snippet&order=viewCount&q=skateboarding+dog&type=video&videoDefinition=high&_h=1&
		// on load query for all youtube channels that match 'hiking'
		vm.dataToVar(query);
	}
})();