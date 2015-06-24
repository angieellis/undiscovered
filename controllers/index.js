require('dotenv').load();
var exports = module.exports = {};
var User = require('../models/user').User;
var passport = require('passport');

// get route method to show index page
exports.index = function(req, res, next) {
  if (req.session.user || req.session.googleUser) {
    //redirect if user is in session
    res.redirect('/show_dashboard');
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
          req.session.user = user;
          req.session.googleUser = null;
          req.session.save(function(err) {
            res.redirect('/show_dashboard');
          })
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
    req.session.user = null;
    req.session.save(function(err) {
      res.redirect('/');
    });
  };
  res.redirect('/');
};

var LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new LocalStrategy(
  // method to find user and validate password
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
