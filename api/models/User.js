/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Passwords = require('machinepack-passwords'),
    Gravatar = require('machinepack-gravatar');

module.exports = {

  attributes: {

    // The user's full name
    name: {
      type: 'string',
      required: true
    },

    // The user's email address
    email: {
      type: 'email',
      required: true,
      unique: true
    },

    // The encrypted password for the user
    encryptedPassword: {
      type: 'string',
      required: true
    },

    // The gender
    gender: {
      type: 'string',
      enum: ['Male','Female']
    },

    // url for gravatar
    gravatarUrl: {
      type: 'string'
    },

    // The babies
    babies: {
      collection: 'baby',
      via: 'owner'
    }
  },

  beforeCreate: function (user, cb) {
    //Password encryption
    Passwords.encryptPassword({
      password: user.encryptedPassword,
      difficulty: 10,
    }).exec(function (err, encPwd) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      user.encryptedPassword = encPwd;
      //If succes, retrieve the Gravatar img
      Gravatar.getImageUrl({
        emailAddress: user.email
      }).exec(function (err, imgUrl){
        if (err) {
          console.log(err);
          return cb(err);
        }
        //If success, create user
        user.gravatarUrl = imgUrl;
        cb();
      });
    });
  }
};
