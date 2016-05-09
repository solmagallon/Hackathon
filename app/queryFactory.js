(function(){
	'use strict';
	var app = angular.module('app');
	app.factory('queryFactory', queryFactory);

	queryFactory.$inject = ['$http', '$q', '$log']

	function queryFactory($http, $q, $log){
		var service = {
			getData: getData
		}

		return service;

		function getData(trail){
			const VIDEO_URL = "https://www.youtube.com/embed/";

			// set up the url for the API query.
			const YOUTUBE_KEY = "&key=AIzaSyAGGi10zMvYlSfc8m_VsOIuesj-D1i6HeM";
			const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&maxResults=8&order=relevance";

			var query = YOUTUBE_URL;
			query += YOUTUBE_KEY;
			query += "&q=hiking+";
			query += trail.name;
			// if a latitude and longitude was provided with trail search based on location.
			// if ((trail.lat!=0) && (trail.lon != 0)){
			// 	query += "&location=" + trail.lat + "%252C+" + trail.lon;
			// 	query += "&locationRadius=25.0mi"
			// } 

			var defer = $q.defer();
			$http({
				method:'GET',
				url: query
			}).then(function(response){
				if (typeof response.data === 'object'){
					toastr.success(trailName + ' data retrieved successfully.');
					defer.resolve(response);
					console.log(response.data)
					angular.forEach(response.data.items, function(element){
						element.id.videoId = VIDEO_URL + element.id.videoId;
					});
				} else {
					toastr.warning('No data retrieved.')
				}
			}, function(error){
				toastr.error("Errer: " + error.message + "<br>Error Status: " + error.statusText);
				$log.error(error);
				defer.reject(error);
			});

			return defer.promise;
		}
	}
})();