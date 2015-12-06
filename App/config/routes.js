
'use strict';

/*!
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var index = require('../app/controllers/index');
var postCtrl = require('../app/controllers/post');
var userCtrl = require('../app/controllers/user');
var auth = require('./middlewares/authenticate');


/**
 * Route middlewares
 */

// var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
// var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

var authRequest = auth.authUserRequest;

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.post('/auth/login', auth.loginAuth(passport));
  app.get('/auth/signup', auth.signupAuth(passport));
  app.get('/auth/logout', auth.signout);
  
  //app.get('/auth',auth);
  // app.get('/userCtrl', user.create);  
  // app.post('/userCtrl/session',auth.sign, user.session);  
  // app.get('/userCtrl/:userId', user.show);
  
  
  app.get('/auth/facebook', auth.facebookAuth(passport));

  app.get('/auth/facebook/callback', auth.facebookAuthCallback(passport));

  app.get('/auth/github', auth.githubAuth(passport));

  app.get('/auth/github/callback', auth.githubAuth(passport));

  app.get('/auth/twitter', auth.twitterAuth(passport));

  app.get('/auth/twitter/callback', auth.twitterAuth(passport));

  app.get('/auth/google', auth.googleAuth(passport));

  app.get('/auth/google/callback', auth.googleAuthCallback(passport));

  app.get('/auth/linkedin', auth.linkedinAuth(passport));

  app.get('/auth/linkedin/callback', auth.linkedinAuthCallback(passport));

  // app.param('userId', userCtrl.load);
  app.get('/api/user/', userCtrl.getAllUsers);
  app.get('/api/user/:id', userCtrl.getUser);

  app.get('/api/post/', postCtrl.getAllPosts);
  app.get('/api/post/:id', authRequest, postCtrl.getPost);
  app.post('/api/post/', authRequest, postCtrl.savePosts);
  app.put('/api/posts/:id', authRequest, postCtrl.updatePosts);
  app.delete('/api/posts/:id', authRequest, postCtrl.deletePost);
  
  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });


  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
};
