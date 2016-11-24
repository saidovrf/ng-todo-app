(function () {
	'use strict';

	angular
		.module('ToDoApp')
		.service('StorageService', StorageService);

	function StorageService($localStorage){
		var vm = this;
		
		vm.saveData = function(todos){
			$localStorage.prevPageData = todos; 
		};

		vm.retrieveData = function(){
			return $localStorage.prevPageData;
		};
	}
}());