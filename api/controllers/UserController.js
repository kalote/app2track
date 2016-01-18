/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  //login page
  displayLogin: function(req,res) {
    res.view('user/login', {
      layout:'public',
      displayLogin: false
    });
  },

  //login function
  login: function (req, res) {
    User.findOne({email: req.param('email')}, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){
          req.session.me = user.id;
          return res.ok();
        }
      });
    });

  },

  //signup form
  signup: function(req, res) {
    User.create({
      name: req.param('name'),
      email: req.param('email'),
      gender: req.param('gender'),
      encryptedPassword: req.param('password')
    }, function userCreated(err, newUser) {
      if (err) {
        //sails-disk or sails-memory error management
        if (err.invalidAttributes) {
          if (err.invalidAttributes &&
            err.invalidAttributes.email &&
            err.invalidAttributes.email[0] &&
            err.invalidAttributes.email[0].rule === 'unique') {
              return res.emailAddressInUse();
          }
        //mongodb error management
        } else {
          var errMsg = JSON.stringify(err.originalError.err);
          if (err.originalError.code == 11000 &&
            errMsg.indexOf("duplicate key") != -1 &&
            errMsg.indexOf("email") != -1) {
              return res.emailAddressInUse();
          }
        }
        return res.negotiate(err);
      }

      // Log user in
      req.session.me = newUser.id;

      // Send back the id of the new user
      return res.json({
        id: newUser.id
      });
    });
  },

  //Log out function
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.destroy();

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },

  //display the user information
  find: function (req,res){
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.negotiate();

      res.view({
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          gravatarUrl: user.gravatarUrl
        },
        layout: 'private'
      });
    });
  },

  //load the edit user view
  edit: function(req, res) {

    // Find the user from the id passed in via params
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.negotiate();

      res.view({
        me: user,
        layout: 'private'
      });
    });
  },

  //process the info from edit view
  update: function(req, res) {
    var userObj = {
      name: req.param('name'),
      email: req.param('email')
    }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        // If this is a uniqueness error about the email attribute,
        // send back an easily parseable status code.
        var errMsg = JSON.stringify(err.originalError.err);
        if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
          && errMsg.indexOf("email") != -1) {
          return res.emailAddressInUse();
        }
      }

      return res.json({
        id: req.param("id")
      });
    });
  }
};
