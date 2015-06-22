var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for Category model
var categorySchema = new Schema({
  locations: {
    type: [String],
    trim: true
  },

  interests: {
    type: [String],
    trim: true
  }
});

// export Category model
exports.Category = mongoose.model('Category', categorySchema);
