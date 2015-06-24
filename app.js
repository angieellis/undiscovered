// require node modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejsLayouts = require('express-ejs-layouts');

// set up connection to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

// require controllers for setting routes
var main = require('./controllers/index');
var users = require('./controllers/users');
var tours = require('./controllers/tours');
var User = require('./models/user').User;

var app = express();

// setting up ejsLayouts
app.use(ejsLayouts);

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views/'));
app.set("view engine","ejs");
app.use(express.static(__dirname + '../public'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// set main routes for index controller
app.get('/', main.index);
app.post('/', main.signin);
app.post('/signout', main.signout);

// set routes for Google Oauth
app.get('/auth/google', main.signinGoogle);
app.get('/auth/google/callback', main.oauthRedirect);

// set routes for user controller
app.get('/signup', users.newUser);
app.post('/signup', users.add);

app.get('/dashboard', users.showDash);
app.get('/show_dashboard', users.renderDash);

app.get('/users/show/:id', users.renderUser);

app.get('/users/show', users.showUsers);
app.get('/users/:id', users.getUser);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.destroy);

// set routes for tour controller
app.get('/tours/new', tours.newTour);
app.get('/tours/show', tours.showTour);
app.post('/tours/new', tours.add);

// set routes for tour ejs files
app.get('/tours/all', tours.allTours);
app.get('/tours/', tours.findTours);
app.get('/tours/:id', tours.getTour);
app.put('/tours/:id', tours.update);
app.delete('/tours/:id', tours.destroy);
app.get('/tours/display/:id', tours.renderTour);

//set routes for browsing tours
app.get('/browse', tours.browse);
app.get('/browse/cities', tours.browseCities);
app.get('/browse/interests', tours.browseInterests);
app.post('/browse', tours.findTours);
app.post('/browse/tags', tours.findByTag);
app.get('/browse_tours', tours.renderBrowse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// passport module configuration
var LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new LocalStrategy(
  // method to find user and validate password
  function(username, password, done) {
    console.log("in local func");
    console.log(username);
    User.findOne({ username: username }, function (err, user) {
      console.log("in findOne");
      console.log(user);
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

// method to save user session
passport.serializeUser(function(user, done) {
  // var userInfo = { id: user.id, googleId: user.googleId };
  // console.log(userInfo);
  done(null, user.id);
});

// method to clear user session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});

// app.listen(3000);

module.exports = app;
