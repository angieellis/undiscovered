var exports = module.exports = {};
// require User model
var User = require('../models/user').User;

// get route method to show user dashboard
exports.showDash = function(req, res, next) {

};

// get route method to render new user form
exports.newUser = function(req, res, next) {
  // res.render('signup', { title: 'Signup' });
};

// post route method to add new user record
exports.add = function(req, res, next) {
  // create new user
  var user = new User(req.params);
    // username: req.body.username,
    // password_hash: req.body.password,
    // first_name: req.body.first_name,
    // middle_initial: req.body.middle_initial,
    // last_name: req.body.last_name,
    // email: req.body.email,
    // phone_numbers: req.body.phone_numbers,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip
  // });

  user.save(function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    };
  });
};

// get route method to find and show user
exports.getUser = function(req, res, next) {
  // find user to show
  var user = User.findOne(req.params.id, function(err, user) {
    if (err) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(user);
    }
  });
};

// put route method to find and update user record
exports.update = function(req, res, next) {
  // find user to update
  User.findByIdAndUpdate(req.params.id, {
    // update user attributes
    $set: req.params
      // username: req.body.username,
      // password_hash: req.body.password,
      // first_name: req.body.first_name,
      // middle_initial: req.body.middle_initial,
      // last_name: req.body.last_name,
      // email: req.body.email,
      // phone_numbers: req.body.phone_numbers,
      // city: req.body.city,
      // state: req.body.state,
      // zip: req.body.zip
  }, function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs or user isn't saved
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true)
    };
  });
};

// delete route method to find and destroy user record
exports.destroy = function(req, res, next) {
  // find user to delete
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    }
  });
};
