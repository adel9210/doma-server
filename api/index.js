const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");



const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 }
];

// Connect to database
connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running at 3000`);
    // Register routes

    app.get('/test', (req, res) => {
      res.json(products);
    });

    app.use("/products", productRoutes);
  });
});

app.use(cors()); // Allow all origins by default

app.use(express.json());
