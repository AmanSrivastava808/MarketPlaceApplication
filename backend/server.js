const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./utils/errorHandler');
const { logger, errorLogger } = require('./utils/logger');
const connectDB = require('./config/db');
const env = require('./config/env');
// Load environment variables from .env file
dotenv.config();
//Connect to MongoDB
connectDB();
// Initialize Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Log requests

// Connect to MongoDB
/*mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));*/

// Define API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/deliveries', require('./routes/deliveries'));
app.use('/api/auth', require('./routes/auth'));

// Use error handler middleware
app.use(errorLogger); // Log errors
app.use(errorHandler);

// Start the server and listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));