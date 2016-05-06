(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('appController', appController);

	appController.$inject = ['queryFactory'];
	function appController(queryFactory){
		var vm = this;
		vm.test = 'hello world';
	}
})();