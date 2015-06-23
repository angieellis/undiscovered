// seed database with faker data
// run command: node test/seeds.js

//***********************************************
// doesn't stop execution for unknown reason
// manually stop execution after a few seconds
//***********************************************

// set up connection to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

// require User and Tour model
var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;
var Category = require('../models/Category').Category;

var faker = require('faker');

var coordinates = [[122.4167, 37.7833], [73.9597, 40.7903], [71.0589, 42.3601], [122.3331, 47.6097],
  [122.6819, 45.5200], [111.8833, 40.7500]]

// SF: 37.7833° N, 122.4167°
// NY: 40.7903° N, 73.9597° W
// MA: 42.3601° N, 71.0589° W
// WA: 47.6097° N, 122.3331° W
// OR: 45.5200° N, 122.6819° W
// UT: 40.7500° N, 111.8833° W

var interestTags = ["Food", "Shopping", "Outdoors", "Sights", "Lifestyle", "Parks", "Activities"];

for (var i = 0; i < 10; i++) {
  // create fake users
  var userName = faker.internet.userName();
  var user = new User({
    username: userName,
    password: userName,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: parseInt(faker.address.zipCode())
  });

  user.save(function(err, user) {
    if (err) console.log(err);
  });

  for (var x = 0; x < 2; x++) {
    //create fake tours
    var tour = new Tour({
      title: faker.lorem.sentence(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: parseInt(faker.address.zipCode()),
      loc: coordinates[Math.floor(Math.random()*coordinates.length)],
      video_id: faker.image.imageUrl(),
      photo_urls: [faker.image.imageUrl(), faker.image.imageUrl()],
      content: faker.lorem.paragraph(),
      tags: [interestTags[Math.floor(Math.random()*interestTags.length)], faker.lorem.words, faker.lorem.words],
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
  };
};

var cities = ["San Francisco, CA", "Manhattan, New York", "Boston, Massachusetts", "Seattle, Washington", "Portland, Oregon", "Salt Lake City, Utah"];

for (var i = 0; i < cities.length; i++) {
  City.create({"city" : cities[i]}, function(err, categories) {
    if (err) {
      console.log(err);
    }
  });
};

for (var i = 0; i < interestTags.length; i++) {
  Interest.create({"interest" : interestTags[i]}, function(err, categories) {
    if (err) {
      console.log(err);
    }
  });
};
