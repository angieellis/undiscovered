require('dotenv').load();
var exports = module.exports = {};
var User = require('../models/user').User;

// get route method to show index page
exports.index = function(req, res, next) {
  res.render('index', { layout: 'index' });

  if (req.user) {
    //redirect if user is in session
    res.redirect('/');
  } else {
    res.render('index');
  };
};

// post route method to sign in user and create session
exports.signin = function(req, res, next) {
  // expects to receive json object with username and password

  // authenticate user through passport module
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.json(err); }
    if (!user) { return res.json(false); }
    req.logIn(user, function(err) {
      if (err) { return res.json(err); }
      return res.json(user);
    });
  })(req, res, next);
  // returns user object if signin is successful
  // returns false if user doesn't exist
  // returns error message for all other cases
};

// post route method to sign out user and clear session
exports.signout = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout();
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

// passport module configuration
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// method to save user session
passport.serializeUser(function(user, done) {
  var userInfo = { id: user.id, googleId: user.googleId };
  done(null, userInfo);
});

// method to clear user session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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

// method to validate user with Google Oauth
passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://yourdormain:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

