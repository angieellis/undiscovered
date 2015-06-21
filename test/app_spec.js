var assert = require('assert');
var expect = require('expect.js');
var request = require('superagent');
var port = 'http://localhost:3000';
var faker = require('faker');
var User = require('../models/user').User;

describe('main/index routes', function(){
  describe('index GET', function(){
    it('should respond to GET request', function(done){
      request
        .get(port)
        .end(function(err, res){
          expect(res.status).to.equal(200);
          done();
      })
    });
  });

  describe('signin POST', function(){
    it('should respond to POST request', function(done) {
      request
        .post(port)
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });
});

describe('user routes', function(){
  var user = null;

  before(function(done){
    var userName = faker.internet.userName();
    user = new User({
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

    user.save(done());
  });

  describe('signup GET', function(){
    it('should respond to GET request', function(done){
      request
        .get(port + '/signup')
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('signup POST', function(){
    it('should respond to POST request', function(done) {
      request
        .post(port + '/signup')
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('dashboard GET', function(){
    it('should respond to GET request', function(done){
      request
        .get(port + '/dashboard')
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('show user GET', function(){
    it('should respond to GET request', function(done) {
      request
        .get(port + '/users/' + user._id)
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('update user PUT', function(){
    it('should respond to PUT request', function(done) {
      request
        .put(port + '/users/' + user._id)
        .send({ _id: user._id, city: "New York" })
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.city).to.equal("New York");
          done();
        })
    });
  });

  describe('destroy user DELETE', function(){
    it('should respond to DELETE request', function(done) {
      request
        .put(port + '/users/' + user._id)
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });
});

describe('tour routes', function(){
  var tour = null;

  before(function(done){
    tour = new Tour({
      title: faker.lorem.sentence(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: parseInt(faker.address.zipCode()),
      coordinates: [[faker.address.longitude(), faker.address.latitude()],
      [faker.address.longitude(), faker.address.latitude()],
      [faker.address.longitude(), faker.address.latitude()]],
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

    tour.save(done());
  });

  describe('new tour GET', function(){
    it('should respond to GET request', function(done){
      request
        .get(port + '/tours/new')
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('show all tours GET', function(){
    it('should respond to GET request', function(done) {
      request
        .get(port + '/tours/show')
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('add new tour POST', function(){
    it('should respond to POST request', function(done){
      request
        .get(port + '/tours/new')
        .send({})
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('show tour GET', function(){
    it('should respond to GET request', function(done) {
      request
        .get(port + '/tours/' + tour._id)
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });

  describe('update tour PUT', function(){
    it('should respond to PUT request', function(done) {
      request
        .put(port + '/tours/' + tour._id)
        .send({ _id: tour._id, city: "New York" })
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.city).to.equal("New York");
          done();
        })
    });
  });

  describe('destroy tour DELETE', function(){
    it('should respond to DELETE request', function(done) {
      request
        .put(port + '/tours/' + tour._id)
        .end(function(err, res){
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          done();
        })
    });
  });
});
