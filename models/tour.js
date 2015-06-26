var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create schema for Tour model
var tourSchema = new Schema({
  title: {
    required: true,
    type: String,
    trim: true
  },

  city: {
    required: true,
    type: String,
    trim: true
  },

  state: {
    required: true,
    type: String
  },

  zip: Number,
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },

  video_id: {
    required: true,
    type: String,
    trim: true
  },

  photo_url: {
    type: String,
    trim: true
  },

  photo_urls: {
    type: [String],
    trim: true
  },

  content: {
    type: String,
    trim: true
  },

  tag: {
    type: String,
    trim: true
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  trailer_description: String,
  trailer_photo_url: String,

  tour_guide: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    username: {
      type: String,
      required: true
    }
  },

  comments: [{
    _id: {
      type: Schema.Types.ObjectId,
      default: Schema.Types.ObjectId()
    },

    title: {
      type: String,
      trim: true
    },

    content: {
      type: String,
      trim: true
    },

    created_at: {
      type: Date,
      default: Date.now
    },

    author: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      username: {
        type: String,
        required: true
      }
    }
  }],

  tour_votes: [{
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    up_vote: {
      type: Boolean,
      required: true
    }
  }]
});

// export Tour model
exports.Tour = mongoose.model('Tour', tourSchema);

