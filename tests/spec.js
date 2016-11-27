describe('ToDo app', function() {
	beforeEach(function(){
		module("ToDoApp");
    });

	describe('Common controller', function() {
		var scope,
	        controller, vm;

	    var _storageService;
		beforeEach(inject(['StorageService', function (myService) {
		    _storageService = _storageService;
		}]));

		var defaultTodo = {
			title: '',
			text: '',
			completed: false
		};

		var firstTodo = {
			title: 'First demo task',
			text: 'This is descriptions for the first task',
			completed: false
		};
		var secondTodo = {
			title: 'Second demo task',
			text: 'This is descriptions for the second task',
			completed: false
		};

	    beforeEach(inject(function($rootScope, $controller) {
	        scope = $rootScope.$new();
	        controller = $controller;
	        vm = controller("CommonCtrl", { $scope: scope });
	    }));

	    it('should be contain Storage Service', function() {
	    	expect(_storageService).not.toEqual(null);
	    })

		it('should be defined all variables', function() {
			expect(vm.change_id).toBeDefined();
			expect(vm.showCompleted).toBeDefined();
			expect(vm.todos).toBeDefined();
			expect(vm.todo).toBeDefined();
			expect(vm.addTask).toBeDefined();
			expect(vm.editTask).toBeDefined();
			expect(vm.changeTask).toBeDefined();
			expect(vm.removeTask).toBeDefined();
			expect(vm.completeTask).toBeDefined();
		});

		it('"todos" should be equal to empty array', function() {
			expect(vm.todos).toEqual(jasmine.arrayContaining([]));
		});

		it('"change_id" should be equal to null', function() {
			expect(vm.change_id).toEqual(null)
		});

		it('"showCompleted" should be equal to false', function() {
			expect(vm.showCompleted).toEqual(false)
		});

		it('"todo" should be equal to default values', function() {
			expect(vm.todo).toEqual(defaultTodo);
		});

		it('should add 2 tasks to todo-list and clear inputs after adding each of task', function() {
			expect(vm.todos.length).toEqual(0);

			vm.todo = firstTodo;

			vm.addTask();
			expect(vm.todos.length).toEqual(1);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo
			]));

			expect(vm.todo).toEqual(defaultTodo);

			vm.todo = secondTodo;

			vm.addTask();
			expect(vm.todos.length).toEqual(2);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo,
				secondTodo
			]));

			expect(vm.todo).toEqual(defaultTodo);
		});

		it('should edit the first task', function() {
			expect(vm.todos.length).toEqual(0);

			vm.todo = firstTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(1);
			vm.todo = secondTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(2);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo,
				secondTodo
			]));
			vm.editTask(0);

			expect(vm.todo).toEqual(firstTodo);

			var editedTodo = {
				title: 'Edited title',
				text: 'Edited text',
				completed: false
			};

			expect(vm.change_id).toEqual(0);

			vm.todo = editedTodo;

			vm.changeTask();

			expect(vm.todo).toEqual(defaultTodo);
			expect(vm.change_id).toEqual(null);

			expect(vm.todos).toEqual(jasmine.arrayContaining([
				editedTodo,
				secondTodo
			]));
			
			expect(vm.todos.length).toEqual(2);
		});

		it('should complete the second task', function() {
			expect(vm.todos.length).toEqual(0);

			vm.todo = firstTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(1);
			vm.todo = secondTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(2);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo,
				secondTodo
			]));
			expect(vm.todo).toEqual(defaultTodo);

			vm.completeTask(1);

			var completedTask = secondTodo;
			completedTask.completed = true;

			expect(vm.todos.length).toEqual(2);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo,
				completedTask
			]));
		});

		it('should remove the first task', function() {
			expect(vm.todos.length).toEqual(0);

			vm.todo = firstTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(1);
			vm.todo = secondTodo;
			vm.addTask();
			expect(vm.todos.length).toEqual(2);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				firstTodo,
				secondTodo
			]));
			expect(vm.todo).toEqual(defaultTodo);

			spyOn(window, 'confirm').and.returnValue(true);

			vm.removeTask(0);

			expect(vm.todos.length).toEqual(1);
			expect(vm.todos).toEqual(jasmine.arrayContaining([
				secondTodo
			]));
		});
	})
})