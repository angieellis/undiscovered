// second database seed file
// to be run after seeds.js file

// set up connection to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

// // require User and Tour model
var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;

var userList;

User.find({}, function(err, users) {
  if(err) {
    console.log(err);
  } else {
    userList = users;
  }
});

var tourList;

Tour.find({}, function(err, tours) {
  if (err) {
    console.log("error: ", err);
  } else {
    tourList = tours;
  }
});

setTimeout( function () {
  getWishes();
}, 2000);

var getWishes = (function(){
  for (var i = 0; i < userList.length; i++) {
    var wish1 = tourList[Math.floor(Math.random()*tourList.length)];
    var wish2 = tourList[Math.floor(Math.random()*tourList.length)];
    var wish3 = tourList[Math.floor(Math.random()*tourList.length)];

    var wishes = [
      { "_id" : wish1.id,
      "title" : wish1.title },
      { "_id" : wish2.id,
        "title" : wish2.title },
      { "_id" : wish3.id,
        "title" : wish3.title }
    ];

    User.findByIdAndUpdate({"_id" : userList[i].id},
      { $set : { "wishlist" : wishes}},
      function(err, user) {
        if(err) {
          console.log(err);
        }
    });
  };
});

setTimeout( function () {
  mongoose.disconnect(function(err) {
    if (err) throw err;
    console.log('disconnected');
  });
}, 6000);
