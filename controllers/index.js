require('dotenv').load();
var exports = module.exports = {};
var User = require('../models/user').User;
var passport = require('passport');

// get route method to show index page
exports.index = function(req, res, next) {
  if (req.user) {
    //redirect if user is in session
    res.redirect('/dashboard');
  } else {
    res.render('index');
  };
};

// post route method to sign in user and create session
exports.signin = function(req, res, next) {
  // expects to receive json object with username and password

  // authenticate user through passport module
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.json(err);
    } else if (!user) {
      return res.json(false);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return res.json(err);
        } else {
          res.redirect('/dashboard/' + user.id);
        }
      })
    };
  })(req, res, next);
  // returns user object if signin is successful
  // returns false if user doesn't exist
  // returns error message for all other cases
};

// post route method to sign out user and clear session
exports.signout = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.session = null;
  };
  res.redirect('/');
};

exports.signinGoogle = function(req, res, next) {
  passport.authenticate('google', { scope:
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  )
};

exports.oauthRedirect = function(req, res, next) {
  passport.authenticate( 'google', {
          successRedirect: '/dashboard',
          failureRedirect: '/auth/google'
  });
};

// helper method to check if user is logged in
exports.userLoggedIn = function() {
  if (passport.session.name === "") {
    return false;
  } else {
    return true;
  };
};

// helper method to get user that is logged in
exports.currentUser = function() {
  console.log("passport local: \n", passport.deserializeUser());
  console.log("req user :", req.user);
  if (passport.session.name === "") {
    return false;
  } else {
    return passport.session.name;
  };
};
