var express = require('express');
var router = express.Router();
exports.loginAuth = function (passport) {
    return passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    });
};
exports.signupAuth = function (passport) {
    return passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    });
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.facebookAuth = function (passport) {
    return passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/login'
    });
};

exports.facebookAuthCallback = function (passport) {
    return passport.authenticate('facebook', {
        failureRedirect: '/login'
    });
}

exports.githubAuth = function (passport) {
    return passport.authenticate('github', {
        failureRedirect: '/login'
    });
}


exports.twitterAuth = function (passport) {
    return passport.authenticate('twitter', {
        failureRedirect: '/login'
    });
}

exports.googleAuth = function (passport) {
    return passport.authenticate('google', {
        failureRedirect: '/login',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    });
}

exports.googleAuthCallback = function (passport) {
    return passport.authenticate('google', {
        failureRedirect: '/login'
    });
}

exports.linkedinAuth = function (passport) {
    return passport.authenticate('linkedin', {
        failureRedirect: '/login',
        scope: [
            'r_emailaddress'
        ]
    });
}


exports.linkedinAuthCallback = function (passport) {
    return passport.authenticate('linkedin', {
        failureRedirect: '/login'
    });
}

exports.authUserRequest = router.use(function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    console.log(req.method);
    if (req.method === "GET") {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
});

// 
// module.exports = function (passport) {
// 
//     
//     
//     //sends successful login state back to angular
//     router.get('/success', function (req, res) {
//         console.log('success call');
//         res.send({ state: 'success', user: req.user ? req.user : null });
//     });
// 
//     //sends failure login state back to angular
//     router.get('/failure', function (req, res) {
//         res.send({ state: 'failure', user: null, message: "Invalid username or password" });
//     });   
//     
//     
// 
// }


