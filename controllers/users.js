var exports = module.exports = {};
var User = require('../models/user').User;

exports.signup = function(req, res, next) {
  res.render('signup', { title: 'Signup' });
}

exports.add = function(req, res, next) {
  console.log(req.body);
  console.log(req.body.username);
  var user = new User({
    username: req.body.username,
    password_hash: req.body.password,
    first_name: req.body.first_name,
    middle_initial: req.body.middle_initial,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_numbers: req.body.phone_numbers,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });

  user.save(function(result, savedUser) {
    console.log("result:")
    console.log(result);
    console.log("saved user:")
    console.log(savedUser);
  });
};
