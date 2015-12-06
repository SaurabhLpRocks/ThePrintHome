'use strict';

/*!
 * Module dependencies.
 */
var model = require('./../app/models/models');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');
var google = require('./passport/google');
var facebook = require('./passport/facebook');
var twitter = require('./passport/twitter');
var linkedin = require('./passport/linkedin');
var github = require('./passport/github');
var github = require('./passport/github');


/**
 * Expose
 */

module.exports = function (passport) {

  // serialize sessions
passport.serializeUser(function(user, done) {
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
         console.log('serializing user:');
        User.findById(id,function(err,user){
           if(err){
               return done(err,false);
           } 
           
           if(!user){
               console.log('User not found');
               return done(null,false);
           }
            return done(null,user);
        });
    });

  // use these strategies
  passport.use(local.login);
  passport.use(local.signup);
  passport.use(google);
  passport.use(facebook);
  passport.use(twitter);
  passport.use(linkedin);
  passport.use(github);
};
