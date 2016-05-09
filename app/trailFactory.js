(function(){
	'strict use';
	var app = angular.module('app');
	app.factory('trailFactory', trailFactory);

	trailFactory.$inject = ['$http', '$q', '$log'];

	function trailFactory($http, $q, $log){
		var service = {
			getData: getData
		}

		return service;

		function getData(name="", city="", state=""){
			var defer = $q.defer();
			console.log("getData called")
			// var s = JSON.stringify({state_cont: "California"});
			$http({
				method:'GET',
				url: 'https://trailapi-trailapi.p.mashape.com',
				params: {
					'q[city_cont]':city,
					'q[name_cont]': name,
					'q[activities_activity_type_name_eq]': 'hiking',
				  	'q[state_cont]': state,
					limit:5
				},
				headers:{
					"X-Mashape-Authorization": "phYKxfrWJtmshZ6BPkclf63JLuiep1E1tI6jsnMLxdxmqNqzrS"
				}
			}).then(function(response){
				if (typeof response.data === 'object'){
					defer.resolve(response);
					toastr.success("Trail data received");
				} else {
					defer.reject(response);
					toastr.warning("No trail data recieved.")
				}
			}, function(error){
				defer.reject(error);
				$log.error(error);
				toastr.error('Error: ' + error.message + '<br>Error Status: ' + error.statusText);
			});

			return defer.promise;
		}
	}
})();