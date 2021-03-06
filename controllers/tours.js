var exports = module.exports = {};
var mongoose = require("mongoose-q")();

var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;
var City = require('../models/categories').City;
var Interest = require('../models/categories').Interest;

var main = require('./index');

// get route method to display new tour form
exports.newTour = function(req, res, next) {
  // check if user has google oauth session
  if ( req.session.googleUser === null) {
    res.redirect('/auth/google');
  } else {
    res.redirect('/tours/new_tour');
  };
};

exports.renderNewTour = function(req, res, next) {
  res.render('new_tour', { title: 'New Tour' });
};

exports.showTour = function(req, res, next) {
  Tour.find(function(err, tours){
    if (err || !tours) {
      // return error message if error occurs or tour isn't found
      console.log("Error: ", err);
      res.json(err);
    };
    res.json(tours);
  });
};

// post route method to add new tour record
exports.add = function(req, res, next) {
  // expects to receive json object with new tour attributes
  var tourParams = req.body;
  tourParams["tour_guide"] = { "_id": mongoose.Types.ObjectId(req.session.user._id), "username": req.session.user.username }

  // create new tour
  var tour = new Tour(tourParams);
  tour.save(function(err, tour) {
    if (err || !tour) {
      // return error message if error occurs or tour isn't saved
      console.log("Error: ", err);
      res.json(err);
    } else {
      res.json(tour._id);
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
      return res.json(err);
    } else {
      findTourGuide(tour);
    };
  });

  var findTourGuide = function(tour) {
    User.findOne(mongoose.Types.ObjectId(tour.tour_guide["_id"]), function(err, user) {
      if (err || !user) {
        // return error message if error occurs
        console.log("Error: ", err);
        return res.json(err);
      } else {
        var tourInfo = tour.toObject();
        tourInfo.tour_guide.description = user.user_description;
        tourInfo.tour_guide.profile_pic = user.profile_pic;
        return res.json(tourInfo);
      }
    });
  };
  // returns tour object and associated tour guide if found
  // otherwise, returns error message
};

// post route to add tour to user's tour wishlist
exports.wishlistTour = function(req, res, next) {
  Tour.find(
    { "_id": mongoose.Types.ObjectId(req.params.id) },
    function(err, tour) {
      if (err || !tour) {
        // return error message if error occurs
        console.log("Error: ", err);
        return res.json(err);
      } else {
        console.log(tour);
        User.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.session.user._id),
          { $push: { wishlist: { "_id": tour._id, "title": tour.title }}},
          function(err, user) {
            if (err || !user) {
            // return error message if error occurs
              console.log("Error: ", err);
              return res.json(err);
            } else {
              return res.json(user);
            }
        })
      }
    })
}

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
      return res.json(categories);
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
