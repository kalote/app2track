babyApp.service('EventService', function($http, $q) {
  $http.defaults.headers.post['X-CSRF-Token']=window.SAILS_LOCALS._csrf;
  return {
    'feedBaby': function(data) {
      var defer = $q.defer();
      $http.post('/baby/feedBaby', data).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }
})
