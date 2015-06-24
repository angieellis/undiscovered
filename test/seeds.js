// seed database with faker data
// run command: node test/seeds.js

//***********************************************
// doesn't stop execution for unknown reason
// manually stop execution after a few seconds
//***********************************************

// set up connection to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

// // require User and Tour model
var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;
var City = require('../models/categories').City;
var Interest = require('../models/categories').Interest;

var faker = require('faker');

var coordinates = [[122.4167, 37.7833], [73.9597, 40.7903], [71.0589, 42.3601], [122.3331, 47.6097],
  [122.6819, 45.5200], [111.8833, 40.7500]]

// // SF: 37.7833° N, 122.4167°
// // NY: 40.7903° N, 73.9597° W
// // MA: 42.3601° N, 71.0589° W
// // WA: 47.6097° N, 122.3331° W
// // OR: 45.5200° N, 122.6819° W
// // UT: 40.7500° N, 111.8833° W

var interestTags = ["Food", "Shopping", "Outdoors", "Sights", "Lifestyle", "Parks", "Activities"];
var otherTags = ["Beach", "Hike", "Quick", "Group", "Parking", "Dangerous", "Easy", "Relaxing", "Physical"];
var cities = [["San Francisco, California", "http://s3.amazonaws.com/tgc-ee2/articles/San-Francisco.jpg"], ["Manhattan, New York", "http://www.rew-online.com/wp-content/uploads/2013/02/LowerManhattan.jpg"], ["Boston, Massachusetts", "http://lizzdurbin.files.wordpress.com/2010/09/boston.jpg"], ["Seattle, Washington", "http://doubletree3.hilton.com/resources/media/dt/CTAC-DT/en_US/img/shared/full_page_image_gallery/main/dh_seattleskyline_11_677x380_FitToBoxSmallDimension_Center.jpg"], ["Portland, Oregon", "http://joshblatteryoga.com/wp-content/uploads/2013/06/oregon.jpg"], ["Salt Lake City, Utah", "https://www.dfcu.com/images/backgrounds/salt-lake-city-skyline-cropped.jpg"]];

var citiesHash = [["San Francisco", "CA", 94105, [122.4167, 37.7833]], ["Manhattan", "NY", 10021, [73.9597, 40.7903]], ["Boston", "MA", 02108, [71.0589, 42.3601]], ["Seattle", "WA", 98101, [122.3331, 47.6097]], ["Portland", "OR", 97201, [122.6819, 45.5200]], ["Salt Lake City", "UT", 84101, [111.8833, 40.7500]]];

for (var i = 0; i < 10; i++) {
  // create fake users
  var city = citiesHash[Math.floor(Math.random()*citiesHash.length)];

  var userName = faker.internet.userName();
  var user = new User({
    profile_pic: "https://avatars1.githubusercontent.com/u/24913?v=3&s=400",
    username: userName,
    password: userName,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.phoneNumber(),
    city: city[0],
    state: city[1],
    zip: city[2],
    coordinates: city[3]
  });

  user.save(function(err, user) {
    if (err) console.log(err);
  });

  for (var x = 0; x < 2; x++) {
    //create fake tours
    var city = citiesHash[Math.floor(Math.random()*citiesHash.length)];

    var tour = new Tour({
      title: faker.lorem.sentence(),
      city: city[0],
      state: city[1],
      zip: city[2],
      coordinates: city[3],
      video_id: faker.image.imageUrl(),
      photo_urls: [faker.image.imageUrl(), faker.image.imageUrl()],
      content: faker.lorem.paragraph(),
      tags: [
        interestTags[Math.floor(Math.random()*interestTags.length)],
        otherTags[Math.floor(Math.random()*otherTags.length)],
        otherTags[Math.floor(Math.random()*otherTags.length)]
      ],
      trailer: {
        description: faker.lorem.sentence(),
        photo_url: faker.image.imageUrl()
      },
      tour_guide: {
        _id: user._id,
        username: user.username
      },
      comments: [],
      tour_votes: []
    });

    tour.save(function(err, tour) {
      if (err) {
        console.log(err);
      }
    });

    user.authored_tours.push({_id: tour._id, title: tour.title});
  };
};

for (var i = 0; i < cities.length; i++) {
  City.create({
    "name" : cities[i][0],
    "photo_url" : cities[i][1]
  }, function(err, categories) {
    if (err) {
      console.log(err);
    }
  });
};

for (var i = 0; i < interestTags.length; i++) {
  Interest.create({"name" : interestTags[i]}, function(err, categories) {
    if (err) {
      console.log(err);
    }
  });
};

setTimeout( function () {
  mongoose.disconnect();
}, 2000);

//sf : http://s3.amazonaws.com/tgc-ee2/articles/San-Francisco.jpg
//ny : http://www.rew-online.com/wp-content/uploads/2013/02/LowerManhattan.jpg
//ma : http://lizzdurbin.files.wordpress.com/2010/09/boston.jpg
//wa : http://doubletree3.hilton.com/resources/media/dt/CTAC-DT/en_US/img/shared/full_page_image_gallery/main/dh_seattleskyline_11_677x380_FitToBoxSmallDimension_Center.jpg
//or : http://joshblatteryoga.com/wp-content/uploads/2013/06/oregon.jpg
//ut : https://www.dfcu.com/images/backgrounds/salt-lake-city-skyline-cropped.jpg
