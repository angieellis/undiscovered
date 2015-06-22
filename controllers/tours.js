var exports = module.exports = {};
// require Tour model
var Tour = require('../models/tour').Tour;

// get route method to display new tour form
exports.newTour = function(req, res, next) {
   res.render('new_tour', { title: 'New Tour' });
};

exports.showTour = function(req, res, next) {
  res.render('tours', { title: 'Tours' });
};

// post route method to add new tour record
exports.add = function(req, res, next) {
  // expects to receive json object with new tour attributes


  // check if user has google oauth session
  if(req.user.googleId === null) {
    return res.redirect('/auth/google');
  }

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
  // returns true if tour is successfully added to collection
  // otherwise, returns error message
};

exports.findTours = function(req, res, next) {
  //expects to receive geolocation of search in json object with longitude and latitude
  // Tour.find({ coordinates[0]:
  //   { $near : [req.params.longitude, req.params.latitude],
  //     spherical : true,
  //     distanceMultiplier: 0,
  //     maxDistance: 0 }},
  //   function(err, tours) {
  //   if (err || !tours) {
  //     // return error message if error occurs
  //     console.log("Error: " + err);
  //     res.json(err);
  //   } else {
  //     res.json(tour);
  //   };
  // })
  // returns nearby tour objects if found
  // otherwise, returns error message
};

// get route method to find and show tour
exports.getTour = function(req, res, next) {
  // expects to receive json object with tour id

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
  // returns tour object if found
  // otherwise, returns error message
};

// put route method to find and update tour
exports.update = function(req, res, next) {
  // expects to receive json object with tour id

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
      res.json(true);
    };
  });
  // returns true if tour is successfully updated
  // otherwise, returns error message
};

// delete route method to find and delete tour
exports.destroy = function(req, res, next) {
  // expects to receive json object with tour id

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
  // returns true if tour is successfully destroyed
  // otherwise, returns error message
};
