var exports = module.exports = {};
var User = require('../models/user').User;

exports.index = function(req, res, next) {
   if (req.user) {
    res.redirect('/');
  } else {
    res.render('index');
  };
};

exports.signin = function(req, res, next) {
  console.log(req.params);
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.json(err); }
    if (!user) { return res.json(false); }
    req.logIn(user, function(err) {
      if (err) { return res.json(err); }
      return res.json(user);
    });
  })(req, res, next);
};

exports.signout = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout();
  };
  res.redirect('/');
};

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
