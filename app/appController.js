(function(){
	var app = angular.module('app');
	app.controller('appController', appController);

	appController.$inject = [];
	function appController(){
		var vm = this;
		vm.test = 'hello world';
	}
})();