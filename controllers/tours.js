var exports = module.exports = {};
var mongoose = require("mongoose-q")();

var Tour = require('../models/tour').Tour;
var City = require('../models/categories').City;
var Interest = require('../models/categories').Interest;

var main = require('./index');

// get route method to display new tour form
exports.newTour = function(req, res, next) {
  res.render('new_tour', { title: 'New Tour' });
};

exports.showTour = function(req, res, next) {
  Tour.find(function(err, tours){
    if (err || !tours) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: ", err);
      res.json(err);
    };
    res.json(tours);
  });
};

// post route method to add new tour record
exports.add = function(req, res, next) {
  // expects to receive json object with new tour attributes
  // console.log("+++++++++++++++++++++++++++");
  // console.log(req.params);
  // console.log("+++++++++++++++++++++++++++");
  // check if user has google oauth session
  if(req.user.googleId === null) {
    return res.redirect('/auth/google');
  }

  // create new tour
  var tour = new Tour(req.params);
  tour.save(function(err, saved) {
    if (err || !saved) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: ", err);
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
        $centerSphere : [ [req.body.lng, req.body.lat], 25/3959 ] }
    }},
    function(err, tours) {
      if (err || !tours) {
        // return error message if error occurs
        console.log("Error: ", err);
        return res.json(err);
      } else {
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
      console.log("Error: ", err);
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
      console.log("Error: ", err);
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
      console.log("Error: ", err);
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
  var categories = [];

  // use promises to handle async callbacks
  // find list of cities
  City.findQ()
  .then(function(cities) {
    categories.push(cities);
    findInterests();
  })
  .catch(function(err) {
    console.log("Error: ", err);
    return res.json(err);
  })
  .done();

  // find list of interests and return aggregated objects
  var findInterests = function() {
    Interest.findQ()
    .then(function(interests) {
      categories.push(interests);
      res.json(categories);
    })
    .catch(function(err) {
      console.log("Error: ", err);
      return res.json(err);
    })
    .done();
  };
  // returns list of locations and interests in json object
};

exports.browseCities = function(req, res, next) {
  City.find(function(err, cities) {
    if (err) {
      // return error message if error occurs
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(cities);
    };
  });
  // returns list of cities to browse tours
};

exports.browseInterests = function(req, res, next) {
  Interest.find(function(err, interests) {
    if (err) {
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(interests);
    };
  });
};

exports.findByTag = function(req, res, next) {
  Tour.find({"tags" : req.params}, function(err, tours) {
    if (err) {
      // return error message if error occurs
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(tours);
    };
  });
};

exports.renderBrowse = function(req, res, next) {
  res.render('browse_tours');
}

exports.renderTour = function(req, res, next) {
  res.render("individual_tour");
}
