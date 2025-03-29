import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { devErrorHandler } from './middleware/devMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';

dotenv.config();

const app = express();

// Development CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: process.env.NODE_ENV });
});

// Error handling
app.use(devErrorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Try to connect to MongoDB but continue if it fails
    await connectDB().catch(err => {
      console.log('Running without database connection in development mode');
    });
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    // Continue running the server even if database connection fails
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode (without database)`);
    });
  }
};

startServer();