// second database seed file
// to be run after seeds.js file

// set up connection to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yourguide_development');

// // require User and Tour model
var User = require('../models/user').User;
var Tour = require('../models/tour').Tour;
var faker = require('faker');

var userList;
var tourList;

User.find({}, function(err, users) {
  if(err) {
    console.log(err);
  } else {
    userList = users;
    getTours();
  }
});

var getTours = function() {
  Tour.find({}, function(err, tours) {
    if (err) {
      console.log("error: ", err);
    } else {
      tourList = tours;
      getWishes();
    }
  });
}

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

setTimeout(function() {
  setDemoWishes();
}, 3000)
var city = ["San Francisco", "California", 94105, [-122.4167, 37.7833]];
var setDemoWishes = function() {
  var u;
  User.findOne({"username": "keiter"}, function(err, user){
    if(err) {
      console.log(err);
    } else {
      u = user;
      test(user);
    }
  });
  console.log(u);
}

var test = function(u) {
  var titles = [["Vintage and Resale Shops", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDG9gjtGRZFDMZG6VIRBmrGHUqrg3XRHOWt5mt-Q0AL3O5HqX", "Shopping"], ["Summer Concerts in the Park", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTI7bUzY2h_BuToJJqUjqO3lUgEpvGxqXIEEzUwqeFYMyiMEJgi", "Music"], ["Hike Summit Overlooking City", "http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/8b/bd/Picture%202_93.png?itok=7aNeVA9s", "Hiking"]];
  u.authored_tours = [];
  for (var i = 0; i < 3; i++) {
    var tour = new Tour({
        title: titles[i][0],
        city: city[0],
        state: city[1],
        zip: city[2],
        coordinates: city[3],
        video_id: "gDJ2THIbfQw",
        photo_url: titles[i][1],
        photo_urls: faker.image.imageUrl(),
        content: faker.lorem.paragraph(),
        tag: titles[i][2],
        trailer_description: faker.lorem.sentence(),
        trailer_photo_url: faker.image.imageUrl(),
        tour_guide: {

        },
        comments: [],
        tour_votes: []
      });

      tour.save(function(err, tour) {
        if (err) {
          console.log(err);
        }
      });
      console.log(u);
      console.log(u.authored_tours);
    u.authored_tours.push({"_id": tour._id, "title": tour.title, "photo_url": tour.photo_url, "tag": tour.tag});
  };

    u.wishlist = [];
    u.save(function(err){
      if(err) {
        console.log(err);
      }
    });
  setTimeout(function() {

}, 3000)
  console.log(u.wishlist);

  var t = [["Weekly Art Show on Main", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSlJD79NRrBL1FQgz4OpBV2bdt415NuMhC4Qp_V0t0F7jrwDc-0Gg", "Art"], ["Italian Cooking Classes", "http://whitegatefarm.net/images/cooking_lg.jpg", "Food"], ["SF Dungeon Tour", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR610YLPYXfP4XCOWdEaMTjCMqJ4sZnp9eyF4BOXTSqRgHhoB8r2w", "Historic"], ["Antique Book Shop", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSirmAzdDzN9IASn0mM965WDZv3GPGdTyt27fdDqgFWG9WZxv7A_A", "Shopping"]];

  for (var x = 0; x < 3; x++) {
    var tour = new Tour({
        title: t[x][0],
        city: city[0],
        state: city[1],
        zip: city[2],
        coordinates: city[3],
        video_id: "gDJ2THIbfQw",
        photo_url: t[x][1],
        photo_urls: faker.image.imageUrl(),
        content: faker.lorem.paragraph(),
        tag: t[x][2],
        trailer_description: faker.lorem.sentence(),
        trailer_photo_url: faker.image.imageUrl(),
        tour_guide: {

        },
        comments: [],
        tour_votes: []
      });

      tour.save(function(err, tour) {
        if (err) {
          console.log(err);
        }
      });
    u.wishlist.push({"_id": tour._id, "title": tour.title, "photo_url": tour.photo_url, "tag": tour.tag});

  }
  console.log(u.wishlist);
  u.save(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(u.wishlist);
    }
  });
};

setTimeout( function () {
  mongoose.disconnect(function(err) {
    if (err) throw err;
    console.log('disconnected');
  });
}, 6000);
