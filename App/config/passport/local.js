'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var config = require('../config');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
/**
 * Expose
 */

module.exports.login = new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {

        User.findOne({ username: username }, function (err, user) {

            if (err) {
                return done(err, false);
            }

            if (!user) {
                console.log('user ' + username + ' not found');
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                console.log('Invalid password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
    );
module.exports.signup = new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, username, password, done) {
        console.log('signup call');

        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {
                console.log('username alredy taken');
                return done(null, false);
            }

            var newUser = new User({
                username: username,
                password: createHash(password)
            });
            newUser.save(function (err, user) {

                if (err) {
                    return done(err, false);
                }
                console.log('successfully signup user' + username);
                return done(null, user);
            });

        });
    });




var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
};
// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};