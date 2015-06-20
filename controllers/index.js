var exports = module.exports = {};

exports.index = function(req, res, next) {
   if (req.user) {
    res.redirect('/');
  } else {
    res.render('index');
  };
};

exports.signin = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureFlash: 'Invalid username or password.' });

  // var user = User.findOne(req.params.id, function(err, user) {
  //   if (err) {
  //     console.log("Error: " + err);
  //     res.json(err);
  //   } else {
  //     res.json(user);
  //   };
  // })
};

exports.signout = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout();
  };
  res.redirect('/');
};

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },

  function(username, password, done) {
    User.findOne({ where: { username: username }}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
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
