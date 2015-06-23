var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for Category model
var citySchema = new Schema({
  name: {
    type: String,
    trim: true
  }
});

var interestSchema = new Schema({
  name: {
    type: String,
    trim: true
  }
});

// export Category model
exports.City = mongoose.model('City', citySchema);
exports.Interest = mongoose.model('Interest', interestSchema);