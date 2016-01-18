var request = require('supertest');

describe('User (Model)', function() {
  it ('should have a user in db', function(done){
    User.findByEmail('johannbich@gmail.com').exec(function(err, user){
      user.length.should.not.be.eql(0);
      done(err);
    });
  });
  it ('should encrypt password', function(done) {
    User.findOneByEmail('johannbich@gmail.com').exec(function(err, user) {
      user.encryptedPassword.should.not.be.eql('password');
      done(err);
    });
  });
  it ('should have a gravatar URL', function(done) {
    User.findOneByEmail('johannbich@gmail.com').exec(function(err, user) {
      user.gravatarUrl.should.not.be.empty;
      done(err);
    });
  });
});
