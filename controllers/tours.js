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
  console.log("in find tours");
  //expects to receive geolocation of search in json object with longitude and latitude or address
  var app = express();
  var tours;
  var params = "San Francisco, CA";
  // console.log(req);
  // query for nearby tours if given coordinates from post
  // if (req.latitude && req.longitude) {
  //   tours = findNearbyTours(req);
  //   console.log(tours);
  // }
  // query google api if address was received from post
  // else {
    console.log(encodeURI(params));
    var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(params);
    console.log(uri);
    app.post(uri, function(gReq, gRes, gNext) {
      console.log(gReq);
      tours = findNearbyTours(greq.results["geometry"]["location"]);
      console.log(tours);
    });
  // }
  return res.json(tours);

  // returns nearby tour objects if found
  // otherwise, returns error message
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
