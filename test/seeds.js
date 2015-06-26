// seed database with faker data
// run command: node test/seeds.js
// second seed file: test/seeds2.js

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

// var coordinates = [[122.4167, 37.7833], [73.9597, 40.7903], [71.0589, 42.3601], [122.3331, 47.6097], [122.6819, 45.5200], [111.8833, 40.7500]]

// // SF: 37.7833° N, 122.4167°
// // NY: 40.7903° N, 73.9597° W
// // MA: 42.3601° N, 71.0589° W
// // WA: 47.6097° N, 122.3331° W
// // OR: 45.5200° N, 122.6819° W
// // UT: 40.7500° N, 111.8833° W
var demoUsers = ["keiter", "keiter", "Kei", "Oka", "keioka@gmail.com"];
var demoTours = [["The Streets of San Francisco Bitter Wine", "99osT5PMmas", "https://i.ytimg.com/vi_webp/IVhykm-Llmo/mqdefault.webp"], ["Where to Eat Like A Local", "Q16bLlXXPOQ", "https://i.ytimg.com/vi/Q16bLlXXPOQ/mqdefault.jpg"], ["San Francisco Local Secrets", "S5T08fH0hSQ", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZomO2zk_EKYFAgZ9kV_57nTr7FKaN34Bck2KdzObybWfVUYnGwA"], ["Old Secret Military Battery in San Francisco", "FQk5UCadvqk", "https://i.ytimg.com/vi/FQk5UCadvqk/mqdefault.jpg"], ["A Walk Through the Tenderloin", "mp4eAkQbieQ", "https://i.ytimg.com/vi/mp4eAkQbieQ/mqdefault.jpg"]]
// cable car to chinatown (sf): 4uBqcAxTEAQ
// bay area bridge: ZlnxQQqIc64
// San Francisco local secrets: S5T08fH0hSQ
// where to eat like a local: Q16bLlXXPOQ
// secret underground bunker: IVhykm-Llmo
var interestTags = ["Food", "Shopping", "Hiking", "Sports", "Beer/Wine", "Nature", "Educational", "Historic", "Arts", "Music", "Theater", "Group", "Lifestyle", "Parks", "Festivals", "Alternative", "Technology", "Business", "Museum"];

var cities = [
  ["San Francisco", "California", "http://s3.amazonaws.com/tgc-ee2/articles/San-Francisco.jpg"],
  ["Manhattan", "New York", "http://www.rew-online.com/wp-content/uploads/2013/02/LowerManhattan.jpg"],
  ["Boston", "Massachusetts", "http://wikitravel.org/upload/shared//thumb/1/19/Boston_Back_Bay.jpg/400px-Boston_Back_Bay.jpg"],
  ["Seattle", "Washington", "http://doubletree3.hilton.com/resources/media/dt/CTAC-DT/en_US/img/shared/full_page_image_gallery/main/dh_seattleskyline_11_677x380_FitToBoxSmallDimension_Center.jpg"],
  ["Portland", "Oregon", "http://joshblatteryoga.com/wp-content/uploads/2013/06/oregon.jpg"],
  ["Salt Lake City", "Utah", "https://www.dfcu.com/images/backgrounds/salt-lake-city-skyline-cropped.jpg"],
  ["Los Angeles", "California", "http://students.marshall.usc.edu/undergrad/files/2012/04/Selling-Your-Los-Angeles-Home1.jpeg"],
  ["Chicago", "Illinois", "http://www.socrata.com/wp-content/uploads/2014/06/chicago-dreary-bean-1.jpg"],
  ["Houston", "Texas", "http://www.photohome.com/pictures/texas-pictures/houston/downtown-houston-5a.jpg"],
  ["Philadelphia", "Pennsylvania", "http://www.urbanohio.com/UOThreads/Philadelphia/April2008/08MarchPhiladelphia41.jpg"],
  ["Phoenix", "Arizona", "http://westwoodps.com/sites/default/files/styles/slideshow_slide_small/public/phoenix_1_0.jpg?itok=qw1E-P3V"],
  ["Denver", "Colorado", "http://www.travelweekly.com/uploadedImages/Shutterstock_images/denverskyline.jpg"]
];

var sf = ["San Francisco", "CA", 94105, [-122.4167, 37.7833]];

var citiesHash = [
  ["Manhattan", "NY", 10021, [-73.96, 40.80]],
  ["Boston", "MA", 02108, [-71.06, 42.36]],
  ["Seattle", "WA", 98101, [-122.3331, 47.61]],
  ["Portland", "OR", 97201, [-122.68, 45.52]],
  ["Salt Lake City", "UT", 84101, [-111.8833, 40.75]]
];

var tourNames = ["Vintage and Resale Shops", "Wine Tasting for Red Wine Lovers", "Summer Concerts in the Park", "Hike Summit Overlooking City", "Tech Museum with Old Military Mainframes", "Rugby Field with Community Games", "Mom and Pop Shops", "Used Book Store with Antique Books", "Weekly Art Show on Main Street", "Historic Citadel Tours", "Alternative Lifestyles Celebration", "Unique Foodie Spots", "Italian Cooking Classes"];

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

  for (var x = 0; x < 4; x++) {
    //create fake tours
    var city = citiesHash[Math.floor(Math.random()*citiesHash.length)];

    var tour = new Tour({
      title: tourNames[Math.floor(Math.random()*tourNames.length)],
      city: city[0],
      state: city[1],
      zip: city[2],
      coordinates: city[3],
      video_id: "gDJ2THIbfQw",
      photo_url: faker.image.imageUrl(),
      photo_urls: faker.image.imageUrl(),
      content: faker.lorem.paragraph(),
      tag: interestTags[Math.floor(Math.random()*interestTags.length)],
      trailer_description: faker.lorem.sentence(),
      trailer_photo_url: faker.image.imageUrl(),
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
    "city" : cities[i][0],
    "state" : cities[i][1],
    "photo_url" : cities[i][2]
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

// create meaningful tour for specific tour demo
var tour = new Tour({
  title: demoTours[0][0],
  city: sf[0],
  state: sf[1],
  zip: sf[2],
  coordinates: sf[3],
  video_id: demoTours[0][1],
  photo_url: "http://media5.starkinsider.com/wordpress/wp-content/uploads/2011/01/Wine-Competition.jpg",
  photo_urls: [
  "http://media5.starkinsider.com/wordpress/wp-content/uploads/2011/01/Wine-Competition.jpg",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRfB5svZRNWI-0WWwk1ssOYeiwzFGVyeqK4soII8p1HuU-_ehBt",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR9rDyH-llgllFEcsTDVCnGSpZk8KnySBKZ-wmQXCsIpPAKuSZl",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPb-_NkQvaStUCqDA-pL2XBn9ACbGCq-Av8ukMDWomGEOsUs2C8Q"],
  content: "We recently traveled to San Francisco and then on to Napa Valley. The wine tours were amazing, especially Hall and Rutherford where you see the wine-tasting cave. All in all we visited Hall and Rutherford, Anomoly, Nickel and Nickel, CakeBread, and a couple others I cannot remember.",
  tag: "Beer/Wine",
  trailer_description: faker.lorem.sentence(),
  trailer_photo_url: "http://media5.starkinsider.com/wordpress/wp-content/uploads/2011/01/Wine-Competition.jpg",
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

// create meaningful user for demo
var user = new User({
  profile_pic: "https://avatars1.githubusercontent.com/u/24913?v=3&s=400",
  username: demoUsers[0],
  password: demoUsers[1],
  first_name: demoUsers[2],
  last_name: demoUsers[3],
  email: demoUsers[4],
  phone_number: faker.phone.phoneNumber(),
  city: sf[0],
  state: sf[1],
  zip: sf[2],
  coordinates: sf[3],
  authored_tours: [],
  wishlist: [{"_id": mongoose.Types.ObjectId(tour._id), "title": tour.title}]
});

user.save(function(err, user) {
  if (err) console.log(err);
});

// create meaningful tours for general demo
for (var i = 1; i < demoTours.length; i++) {
  var userName = faker.internet.userName();
  var tour = new Tour({
    title: demoTours[i][0],
    city: sf[0],
    state: sf[1],
    zip: sf[2],
    coordinates: sf[3],
    video_id: demoTours[i][1],
    photo_url: demoTours[i][2],
    photo_urls: demoTours[i][2],
    content: faker.lorem.paragraph(),
    tag: interestTags[Math.floor(Math.random()*interestTags.length)],
    trailer_description: faker.lorem.sentence(),
    trailer_photo_url: demoTours[i][2],
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

  user.wishlist.push({"_id": mongoose.Types.ObjectId(tour._id), "title": tour.title});
}

setTimeout( function () {
  mongoose.disconnect();
}, 2000);

//sf : http://s3.amazonaws.com/tgc-ee2/articles/San-Francisco.jpg
//ny : http://www.rew-online.com/wp-content/uploads/2013/02/LowerManhattan.jpg
//ma : http://lizzdurbin.files.wordpress.com/2010/09/boston.jpg
//wa : http://doubletree3.hilton.com/resources/media/dt/CTAC-DT/en_US/img/shared/full_page_image_gallery/main/dh_seattleskyline_11_677x380_FitToBoxSmallDimension_Center.jpg
//or : http://joshblatteryoga.com/wp-content/uploads/2013/06/oregon.jpg
//ut : https://www.dfcu.com/images/backgrounds/salt-lake-city-skyline-cropped.jpg
