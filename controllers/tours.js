var exports = module.exports = {};
var Tour = require('../models/tour').Tour;

exports.newTour = function(req, res, next) {
  res.render('new_tour', { title: 'Signup' });
};

exports.showTour = function(req, res, next) {
  res.render('new_tour', { title: 'Signup' });
};

exports.add = function(req, res, next) {
  // var tour = new Tour(req.params);
  // tour.save(function(err, saved) {
    res.json(id)
    // if (err || !saved) {
    //   console.log("Error: " + err);
    //   res.json(err);
    // } else {
    //   res.json(true);
    // };
  // });
};

exports.getTour = function(req, res, next) {
  Tour.findOne(req.params.id, function(err, tour) {
    if (err || !tour) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(tour);
    };
  });
};

exports.update = function(req, res, next) {
  Tour.findByIdAndUpdate(req.params.id, {
    $set: req.params
  }, function(err, saved) {
    if (err || !saved) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(tour);
    };
  });
};

exports.destroy = function(req, res, next) {
  Tour.findByIdAndRemove(req.params.id, function(err, tour) {
    if (err) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(true);
    };
  });
};
