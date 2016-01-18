'use strict';

var babyApp = angular.module('babyApp', ['ngRoute', 'ui.bootstrap', 'angularMoment'])
babyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/baby.html',
      controller: 'BabyCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }
])

babyApp.controller('BabyCtrl',
  ['$scope', '$rootScope', '$interval', 'BabyService', 'EventService',
  function($scope, $rootScope, $interval, BabyService, EventService) {
  $scope.formData = {};
  $scope.babies = [];

  // Clock
  $scope.clock = Date.now();
  $interval(function () {
    $scope.clock = Date.now(); }, 1000
  )

  // Loading babies
  $scope.loadData = function() {
    BabyService.getBabies().then(function(response) {
      $scope.babies = response;
    })
  }

  // Button to add a baby
  $scope.addBaby = function() {
    BabyService.addBaby($scope.formData).then(function(response) {
      $scope.babies.push(response);
      $scope.formData = {};
    })
  }

  // Button to add a feed event
  $scope.addFeedEvent = function(babyId) {
    EventService.feedBaby({when: $scope.clock, baby: babyId}).then(function(response) {
      $scope.loadData();
    })
  }

  // Initial loading
  $scope.loadData();
}])
