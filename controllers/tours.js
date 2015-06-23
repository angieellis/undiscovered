var exports = module.exports = {};
var mongoose = require("mongoose");
var Tour = require('../models/tour').Tour;

// get route method to display new tour form
exports.newTour = function(req, res, next) {
   res.render('new_tour', { title: 'New Tour' });
};

exports.showTour = function(req, res, next) {
  Tour.find({}, function(err, tours){
    if (err || !tours) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: " + err);
      res.json(err);
    };
    res.json(tours);
  });
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
  //expects to receive geolocation of search in json object with longitude and latitude coordinates
  Tour.find({ "coordinates" :
    { $geoWithin : {
        $centerSphere : [ [req.lng, req.lat], 25/3959 ] }
    }},
    function(err, tours) {
    if (err || !tours) {
      // return error message if error occurs
      console.log("Error: " + err);
      return res.json(err);
    } else {
      console.log(tours);
      return res.json(tours);
    };
  })
  // returns nearby tour objects if found
  // otherwise, returns error message
};

// get route method to find and show tour
exports.getTour = function(req, res, next) {
  // expects to receive json object with tour id

  // find tour to show
  Tour.findOne(mongoose.Types.ObjectId(req.params.id), function(err, tour) {
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
  Tour.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
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
  Tour.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), function(err, tour) {
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

exports.allTours = function(req, res, next) {
  res.render('all_tours');
};

exports.browse = function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(categories);
    };
  });
  // res.render('browse', { title: 'Browse Tours' });
  // returns list of locations and interests in json object
};

exports.findByTag = function(req, res, next) {
  Tour.find({"tags" : req.params}, function(err, tours) {
    if (err) {
      // return error message if error occurs
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(tours);
    };
  });
};

exports.browseTours = function(req, res, next) {
  res.render('browse_tours');
}
