(function () {
	'use strict';

	angular
		.module('ToDoApp')
		.controller('CommonCtrl', CommonCtrl);

	CommonCtrl.$inject = ['$scope', 'StorageService'];

	function CommonCtrl($scope, StorageService) {
		var vm = this;

		vm.change_id = null;
		vm.showCompleted = false;

		vm.todos = StorageService.retrieveData() || [];

		vm.todo = {
			title: '',
			text: '',
			completed: false
		}


		vm.addTask = addTask;
		vm.editTask = editTask;
		vm.changeTask = changeTask;
		vm.removeTask = removeTask;
		vm.completeTask = completeTask;

		$scope.$watch('todos', _todosSave, true);

		//////////////

		function _todosSave() {
			StorageService.saveData(vm.todos);
		}

		function _clearFields() {
			vm.todo = {
				title: '',
				text: '',
				completed: false
			};
		};


		function addTask() {
			vm.todos.push(vm.todo);
			vm.showCompleted = false;
			_clearFields();
		};

		

		function editTask(task_id) {
			vm.change_id = task_id;
			vm.todo = angular.copy(vm.todos[task_id]);
		};
		function changeTask() {
			vm.todos[vm.change_id] = vm.todo;
			vm.change_id = null;
			_clearFields();
		};


		function removeTask(task_id) {
			var isRemove = confirm("Are you sure about delete this task?");
			if (isRemove) {
				vm.todos.splice(task_id, 1);
			}
		}

		function completeTask(task_id) {
			vm.todos[task_id].completed = true;
		}
	}

}());