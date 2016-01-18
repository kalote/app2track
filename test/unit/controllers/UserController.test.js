var request = require('supertest');

describe('User (Controller)', function() {
  describe('Login', function() {
    it ('should display the login form', function(done) {
      request(sails.hooks.http.app)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        var gotText = res.text.indexOf('Please log in...');
        gotText.should.be.greaterThan(-1, 'text not found');
        done();
      });
    });
    it ('should not log the user in (incorrect password)', function(done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send({email:'johannbich@gmail.com', password:'wrongpassword'})
      .expect(404, done);
    });
    it ('should not log the user in (user does not exists)', function(done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send({email:'otherguy@gmail.com', password:'password'})
      .expect(404, done);
    });
    it ('should log the user in', function(done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send({email:'johannbich@gmail.com', password:'password'})
      .expect(200, done);
    });
  });
  describe('Signup', function() {
    it ('should display the signup form', function(done) {
      request(sails.hooks.http.app)
      .get('/signup')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        var gotText = res.text.indexOf('Create an account');
        gotText.should.be.greaterThan(-1, 'text not found');
        done();
      });
    });
    it ('should not create a new account (duplicate email)', function(done) {
      request(sails.hooks.http.app)
      .post('/signup')
      .send({
        name: 'John Snow',
        email: 'johannbich@gmail.com',
        gender: 'Male',
        password: 'password',
      })
      .expect(409, done);
    });
    it ('should create a new account', function(done) {
      request(sails.hooks.http.app)
      .post('/signup')
      .send({
        name: 'John Snow',
        email: 'john@snow.com',
        gender: 'Male',
        password: 'password',
      })
      .expect(200, done);
    });
  });
});
