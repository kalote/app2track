var Sails = require('sails');
var Barrels = require('barrels');
require('should');

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    connections: {
      test: {
        adapter: 'sails-memory'
      }
    },
    csrf: false,
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    hooks: {
      grunt: false
    }
  }, function(err, sails) {
    if (err)
      return done(err);

    // Load fixtures
    var barrels = new Barrels();

    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(function(err) {
      done(err,sails);
    });
  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
