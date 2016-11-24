(function () {
	'use strict';

	angular
		.module('ToDoApp')
		.controller('CommonCtrl', CommonCtrl);

	CommonCtrl.$inject = ['$scope', 'StorageService'];

	function CommonCtrl($scope, StorageService) {
		var vm = this;

		vm.change_id = null;

		vm.todos = StorageService.retrieveData() || [];

		vm.todo = {
			title: '',
			text: '',
			completed: false
		}

		vm.clearFields = clearFields;
		vm.addTask = addTask;
		vm.editTask = editTask;
		vm.changeTask = changeTask;
		vm.removeTask = removeTask;

		//////////////

		function clearFields() {
			vm.todo = {
				title: '',
				text: '',
				completed: false
			};
		};


		function addTask() {
			vm.todos.push(vm.todo);
			StorageService.saveData(vm.todos);
			vm.clearFields();
		};

		

		function editTask(task_id) {
			vm.change_id = task_id;
			vm.todo = angular.copy(vm.todos[task_id]);
		};
		function changeTask() {
			vm.todos[vm.change_id] = vm.todo;
			StorageService.saveData(vm.todos);
			vm.change_id = null;
			vm.clearFields();
		};


		function removeTask(task_id) {
			var isRemove = confirm("Are you sure about delete this task?");
			if (isRemove) {
				vm.todos.splice(task_id, 1);
				StorageService.saveData(vm.todos);
			}
		}
	}

}());