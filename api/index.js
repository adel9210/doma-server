const express = require("express");
const cors = require("cors");
const path = require('path');
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

// Connect to the database
connectDB()
    .then(() => {
      console.log('Connected to the database successfully!');
    })
    .catch(err => {
      console.error('Error while connecting to the database:', err.message);
      process.exit(1); // Exit the process on DB connection failure
    });

// Middleware
app.use(cors()); // Enable CORS
app.options('*', cors()); // Handle preflight requests
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve static files

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;
