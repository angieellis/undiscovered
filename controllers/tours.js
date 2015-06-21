var exports = module.exports = {};
// require Tour model
var Tour = require('../models/tour').Tour;

// get route method to display new tour form
exports.newTour = function(req, res, next) {

};

// post route method to add new tour record
exports.add = function(req, res, next) {
  // create new tour
  var tour = new Tour(req.params);
  tour.save(function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    };
  });
};

// get route method to find and show tour
exports.getTour = function(req, res, next) {
  // find tour to show
  Tour.findOne(req.params.id, function(err, tour) {
    if (err || !tour) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(tour);
    };
  });
};

// put route method to find and update tour
exports.update = function(req, res, next) {
  // find tour to update
  Tour.findByIdAndUpdate(req.params.id, {
    // update tour attributes
    $set: req.params
  }, function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(tour);
    };
  });
};

// delete route method to find and delete tour
exports.destroy = function(req, res, next) {
  // find tour to delete
  Tour.findByIdAndRemove(req.params.id, function(err, tour) {
    if (err) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    };
  });
};
