const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const path = require('path');
const Product = require("../models/Product");

// Connect to database
connectDB().then(() => {
  console.log('Connected Success!')
}).catch(err =>{
  console.log('Error While Connecting DB')
})

app.use(cors()); // Should be before defining routes
app.options('*', cors()); // Handle preflight requests
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);

app.post('/products', (req, res) => {
  console.log('files=======', req.files);
  res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
});

// Optional helper function to check if an ObjectId is valid
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id); // Check if it's a 24-character hex string
};

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  // Check if the product ID is a valid format (optional)
  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format.' });
  }

  try {
    // Attempt to delete the product by ID
    const result = await Product.findByIdAndDelete(productId);

    // If no product was found, return a 404 error
    if (!result) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Successfully deleted
    res.status(200).json({ message: `Product ${productId} deleted successfully.` });
  } catch (error) {
    console.error(error);

    // Handle different types of errors
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    // Generic server error
    res.status(500).json({ message: 'Error deleting product.' });
  }

});

// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
