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

		function getData(url){
			var defer = $q.defer();
			$http({
				method:'GET',
				url: url
			}).then(function(response){
				if (typeof response.data === 'object'){
					toastr.success('Data retrieved successfully.');
					defer.resolve(response);
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