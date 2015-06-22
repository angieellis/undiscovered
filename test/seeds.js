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
<<<<<<< HEAD:test/seeds.js
      coordinates: [{
        lng: faker.address.longitude(),
        lat: faker.address.latitude()
      }, {
        lng: faker.address.longitude(),
        lat: faker.address.latitude()
      }, {
        lng: faker.address.longitude(),
        lat: faker.address.latitude()
      }],
=======
      loc: [
        faker.address.longitude(),
        faker.address.latitude()
      ],
>>>>>>> uxintegration:test/seeds.js
      video_id: faker.image.imageUrl(),
      photo_urls: [faker.image.imageUrl(), faker.image.imageUrl()],
      content: faker.lorem.paragraph(),
      tags: [faker.lorem.words, faker.lorem.words, faker.lorem.words],
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


var categories = new Category({
  locations: ["San Francisco, CA", "Manhattan, New York", "Boston, Massachusetts", "Seattle, Washington", "Miami, Florida", "Portland, Oregon", "Salt Lake City, Utah"],
  interests: ["Food", "Shopping", "Outdoors", "Sights", "Lifestyle", "Parks", "Activities"]
})

categories.save(function(err, categories) {
  if (err) {
    console.log(err);
  }
});
