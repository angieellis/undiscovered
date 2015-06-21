var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;

var faker = require('faker');

for (var i = 0; i < 10; i++) {
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
    var tour = new Tour({
      title: faker.lorem.sentence(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: parseInt(faker.address.zipCode()),
      coordinates: [[faker.address.latitude(), faker.address.longitude()],
      [faker.address.latitude(), faker.address.longitude()],
      [faker.address.latitude(), faker.address.longitude()]],
      video_id: faker.image.imageUrl(),
      photo_urls: [faker.image.imageUrl(), faker.image.imageUrl()],
      content: faker.lorem.paragraph(),
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
      if (err) console.log(err);
    });
  };
};
