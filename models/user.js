var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema for User model
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  first_name: {
    type: String,
    required: true,
    trim: true
  },

  last_name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  phone_number: {
    type: String,
    trim: true
  },

  city: {
    type: String,
    trim: true
  },

  state: {
    type: String,
    trim: true
  },

  zip: Number,
  created_at: {
    type: Date,
    default: Date.now
  },

  tour_votes: [{
    tour_id: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true
    },

    up_vote: {
      type: Boolean,
      required: true
    }
  }]
});

// method to validate user password
userSchema.methods.validPassword = function( pwd ) {
  return ( this.password === pwd );
};

// export User model
exports.User = mongoose.model('User', userSchema);
