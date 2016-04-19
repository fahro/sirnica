var app = angular.module('dummy', [ 'ngRoute', 'ngResource' ]);

app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'partials/home.html',
		controller : 'home',
		controllerAs : 'controller'
	})
	.when('/students', {
		templateUrl: 'partials/student-list.html', controller: 'StudentListCtrl'
		})
	.when('/students/:id/view', {
		templateUrl: 'partials/student-view.html', controller: 'StudentViewCtrl'
		})
	.when('/students/new', {
		templateUrl: 'partials/student-add.html',  controller: 'StudentCreateCtrl'
		})
	.when('/students/:id/edit', {
		templateUrl: 'partials/student-edit.html', controller: 'StudentEditCtrl'
		})
	.otherwise('/');

}).controller('navigation',

function($rootScope, $http, $location, $route) {

	var self = this;

	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

	$http.get('user').then(function(response) {
		if (response.data.name) {
			$rootScope.authenticated = true;
		} else {
			$rootScope.authenticated = false;
		}
	}, function() {
		$rootScope.authenticated = false;
	});

	self.credentials = {};

	self.logout = function() {
		$http.post('logout', {}).finally(function() {
			$rootScope.authenticated = false;
			$location.path("/");
		});
	}

}).controller('home', function($http) {
	var self = this;
	$http.get('resource/').then(function(response) {
		self.greeting = response.data;
	})
});

app.factory('StudentService', function($resource) {
  return $resource('/resource/students/:id', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'} },
      delete: { method: 'DELETE', params: {id: '@id'} }
  });
});

app.factory('StudentsService', function($resource) {
  return $resource('/resource/students', {}, {
      query: { method: 'GET', isArray: true,
          transformResponse: function(data) {
              return angular.fromJson(data)._embedded.students;
            }
      },
      create: { method: 'POST' }
  });
});

//app.controller('StudentListCtrl',  function($scope, $state, popupService, $window, StudentService) {
app.controller('StudentListCtrl',  function($scope, $window, StudentsService, StudentService, $location) {
	  var qry = StudentsService.query();
	  $scope.students = qry; 

      // callback for ng-click 'editStudent':
      $scope.editStudent = function (studentId) {
          $location.path('/students/' + studentId + "/edit");
      };

      // callback for ng-click 'deleteStudent':
      $scope.deleteStudent = function (studentId) {
    	  StudentService.delete({ id: studentId });
          $scope.students = StudentsService.query();
      };

      // callback for ng-click 'createNewStudent':
      $scope.createNewStudent = function () {
          $location.path('/students/new');
      };
	  
}).controller('StudentViewCtrl', function($scope, $routeParams, StudentService, $location) {

    // callback for ng-click 'updateStudent':
    $scope.updateStudent = function () {
    	StudentService.update($scope.student);
        $location.path('/students');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path('/students');
    };

    $scope.student = StudentService.show({id: $routeParams.id});
    
}).controller('StudentCreateCtrl', function($scope, StudentsService, $location) {
    // callback for ng-click 'createNewStudent':
    $scope.createNewStudent = function () {
    	StudentsService.create($scope.student);
        $location.path('/students');
    }
    
}).controller('StudentEditCtrl', function($scope, $routeParams, StudentService, $location) {

    // callback for ng-click 'updateStudent':
    $scope.updateStudent = function () {
    	StudentService.update($scope.student);
        $location.path('/students');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path('/students');
    };

    $scope.student = StudentService.show({id: $routeParams.id});

});
