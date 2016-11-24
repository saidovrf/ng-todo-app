(function () {
	'use strict';

	angular
		.module('ToDoApp')
		.controller('CommonCtrl', CommonCtrl);

	CommonCtrl.$inject = ['$scope', 'StorageService'];

	function CommonCtrl($scope, StorageService) {
		var vm = this;

		vm.todos = StorageService.retrieveData() || [];

		vm.todo = {
			title: '',
			text: '',
			completed: false
		}

		vm.addTask = addTask;

		function addTask() {
			vm.todos.push(vm.todo);
			StorageService.saveData(vm.todos);

			vm.todo = {
				title: '',
				text: '',
				completed: false
			}
		}
	}

}());