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
  $scope.feedData = {};
  $scope.babies = [];
  $scope.feedList = {
    qty: null,
    availableOptions: [
      {id: '50', name: '50ml'},
      {id: '60', name: '60ml'},
      {id: '70', name: '70ml'},
      {id: '80', name: '80ml'},
      {id: '90', name: '90ml'},
      {id: '100', name: '100ml'},
      {id: '110', name: '110ml'},
      {id: '120', name: '120ml'}
    ]
  };

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
    console.log($scope.formData);
    BabyService.addBaby($scope.formData).then(function(response) {
      $scope.babies.push(response);
      $scope.formData = {};
    })
  }

  // Button to add a feed event
  $scope.addFeedEvent = function(babyId, qty) {
    EventService.feedBaby({when: $scope.clock, quantity: qty, baby: babyId}).then(function(response) {
      $scope.loadData();
    })
  }

  // Initial loading
  $scope.loadData();
}])
