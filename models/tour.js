var mongoose = require("mongoose");

var tourSchema = new mongoose.Schema({

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
  coordinates: [[String]],

  video_url: {
    required: true,
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

  created_at: {
    type: Date,
    default: Date.now
  },

  trailer: { description: String, photo_url: String },

  tour_guide: {
    id: {
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
    // _id: { type:ObjectIdSchema, default: new ObjectId() },

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
      id: {
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

exports.Tour = mongoose.model('Tour', tourSchema);

