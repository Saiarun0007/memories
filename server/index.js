import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/posts', postRoutes);

// Configuration
const PORT = process.env.PORT || 2000;
const CONNECTION_URL = process.env.CONNECTION_URL || "your_default_connection_url_here";

// Database Connection
mongoose.connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing MongoDB connection and shutting down server');
  await mongoose.disconnect();
  process.exit(0);
});
