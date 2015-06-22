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
  //expects to receive geolocation of search in json object with longitude and latitude or address
  var tours;
  var params = "San Francisco, CA";
  console.log(req);
  // query for nearby tours if given coordinates from post
  if (req.latitude && req.longitude) {
    tours = findNearbyTours(req);
    console.log(tours);
  }
  // query google api if address was received from post
  else {
    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(params) + '&key=' + process.env.GOOGLE_API_KEY;
    console.log(uri);

    tours = x(uri);
  }
  return res.json(tours);

  // returns nearby tour objects if found
  // otherwise, returns error message
};

function x(uri) {
  var tours;
  console.log(" in x");

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=San%20Francisco,%20CA&key=AIzaSyCiwGjcVfBvLaCWJc9GuZjijmUnuHs7vCo");
  xmlhttp.onload = function() {

    if (this.status == 200) {
      console.log(this.response);
    } else {
      console.log(this.statusText); }
  }

  xmlhttp.onerror = function() {
    console.log("Network Error");
  }

  xmlhttp.send();

  // $(document).ready(function(){
  //   $.ajax({
  //     type: "GET",
  //     url: "https://maps.googleapis.com/maps/api/geocode/json?address=San%20Francisco,%20CA&key=AIzaSyCiwGjcVfBvLaCWJc9GuZjijmUnuHs7vCo"
  //   }).done(function(data) {
  //     console.log("in get");
  //     console.log(data);
  //     tours = findNearbyTours(data.results["geometry"]["bounds"]["location"]);
  //     console.log(tours);
  //   }).fail(function(data){
  //     console.log("Fail!" + data);
  //   });
  // });
  return res.json(true);
  // return tours;
};

// query for tours nearby given coordinates
function findNearbyTours(req) {
  console.log("in find tours");
   Tour.find({ "coordinates.0" :
    { $near : [req.lng, req.lat],
      spherical : true,
      // distance multiplier for a mile
      distanceMultiplier: 3959,
      // max of 25 miles from location coordinates
      maxDistance: 25/3959 }},
    function(err, tours) {
    if (err || !tours) {
      // return error message if error occurs
      console.log("Error: " + err);
      return err;
    } else {
      return tours;
    };
  })
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
