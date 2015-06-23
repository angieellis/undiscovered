var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for Category model
var citySchema = new Schema({
  city: {
    type: String,
    trim: true
  }
});

var interestSchema = new Schema({
  interest: {
    type: String,
    trim: true
  }
});

// export Category model
exports.City = mongoose.model('City', citySchema);
