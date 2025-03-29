import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dev_db', options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Add connection event handlers
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // In development, create an in-memory fallback store
    if (process.env.NODE_ENV === 'development') {
      console.log('Starting in development mode with in-memory storage');
      global.inMemoryDB = {
        users: new Map(),
        accommodations: new Map(),
        bookings: new Map(),
        reviews: new Map()
      };
    }
    return null;
  }
};

export default connectDB;