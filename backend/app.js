// Main application entry point
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config(); // Looks for .env in the current working directory (expected to be 'backend/')

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic Route - Placeholder
app.get('/api/v1', (req, res) => {
  res.send('API is running...');
});

// Placeholder for other routes
// app.use('/api/v1/users', require('./src/routes/userRoutes'));
// app.use('/api/v1/products', require('./src/routes/productRoutes'));

// Mount auth routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1)); // Consider if this is too abrupt
});
