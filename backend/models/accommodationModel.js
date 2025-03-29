import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    name: String,
    icon: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  rooms: [{
    name: String,
    price: Number,
    capacity: Number,
    description: String,
    amenities: [String]
  }],
  unavailableDates: [{
    type: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export default Accommodation;