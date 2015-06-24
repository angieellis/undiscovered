var exports = module.exports = {};
var mongoose = require("mongoose-q")();

var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;
var main = require('./index');

// get route method to show user dashboard
exports.showDash = function(req, res, next) {
  var userInfo = [];
  console.log("Session user: ", req.session.user._id)
  // use promises to handle async callbacks
  // find user from given id
  User.findOneQ(mongoose.Types.ObjectId(req.session.user._id))
    .then(function(user) {
      userInfo.push({"user" : user });
      findRecommendedTours(user);
    })
    .catch(function(err) {
      console.log("Error: ", err);
      return res.json(err);
    })
    .done();

  // find recommended tours for user
  var findRecommendedTours = function(user) {
    Tour.findQ({ "coordinates" : { $geoWithin : {
        $centerSphere : [ user.coordinates, 25/3959 ] }
      }})
      .then(function(tours) {
        userInfo.push({"recommended_tours" : tours });
        res.json(userInfo);
      })
      .catch(function(err) {
        console.log("Error: ", err);
        return res.json(err);
      })
      .done();
  };
  // returns the user object, their authored tours, and recommended tours based on proximity to their current location
};

exports.renderDash = function(req, res, next) {
  res.render('dashboard', { id: req.session.user._id });
};

// post route method to add new user record
exports.add = function(req, res, next) {
  // expects to receive json object with new user attributes

  // create new user
  var user = new User(req.body);

  user.save(function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs
      console.log("Error: ", err);
      res.json(err);
    } else {
      console.log("success!");
      req.session.user = user;
      req.session.save(function(err) {
        res.json(true);
      })
    };
  });
  // returns true if user was added to collection
  // otherwise, returns error message
};

// get route method to find and show user
exports.getUser = function(req, res, next) {
  // expects to receive json object with user id
  // find user to show
  var user = User.findOne(mongoose.Types.ObjectId(req.params.id), function(err, user) {
    if (err) {
      // return error message if error occurs
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(user);
    }
  });
  // returns user object is user is found
  // otherwise, returns error message
};

// put route method to find and update user record
exports.update = function(req, res, next) {
  // expects to receive json object with user id

  // find user to update
  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
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
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(true)
    };
  });
  // returns true if user was successfully updated
  // otherwise, returns error message
};

// delete route method to find and destroy user record
exports.destroy = function(req, res, next) {
  // expects to receive json object with user id

  // find user to delete
  User.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), function(err, user) {
    if (err) {
      // return error message if error occurs
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(true);
    }
  });
  // returns true if user was successfully destroyed
  // otherwise, returns error message
};

exports.showUsers = function(req, res, next) {
  User.find(function(err, users){
    if (err || !users) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: ", err);
      res.json(err);
    };
    res.json(users);
  });
}

exports.renderUser = function(req, res, next) {
  console.log("Render User")
  res.render('user_page')
};
