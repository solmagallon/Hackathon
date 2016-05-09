(function(){
	'use strict';
	var app = angular.module('app');
	app.factory('intercepterFactory', intercepterFactory)

	intercepterFactory.$inject = ['$log', '$q']
	function intercepterFactory($log, $q){
		return {
			request: function(config){
				config.headers['X-Mashape-Authorization'] = "phYKxfrWJtmshZ6BPkclf63JLuiep1E1tI6jsnMLxdxmqNqzrS";
				return config;
			}
		}
	}
})();