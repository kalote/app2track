babyApp.service('BabyService', function($http, $q) {
  $http.defaults.headers.post['X-CSRF-Token']=window.SAILS_LOCALS._csrf;
  return {
    'getBabies': function() {
      var defer = $q.defer();
      $http.get('/baby/getBabies/'+me).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addBaby': function(baby) {
      baby.owner = me;
      var defer = $q.defer();
      $http.post('/baby/addBaby', baby).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }
})
