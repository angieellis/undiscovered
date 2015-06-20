var exports = module.exports = {};
var User = require('../models/user').User;

exports.showDash = function(req, res, next) {

};

exports.newUser = function(req, res, next) {
  // res.render('signup', { title: 'Signup' });
};

exports.add = function(req, res, next) {
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
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    };
  });
};

exports.getUser = function(req, res, next) {
  var user = User.findOne(req.params.id, function(err, user) {
    if (err) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(user);
    }
  });
};

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, {
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
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true)
    };
  });
};

exports.destroy = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    }
  });
};
