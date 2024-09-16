const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const serverless = require('serverless-http');



const products = [
  { id: 1, name: 'adel 1eee', price: 100 },
  { id: 2, name: 'Product 2www', price: 200 },
  { id: 3, name: 'Product 3eeee3333', price: 300 }
];



// Connect to database
connectDB().then(() => {
  // app.listen(3000, () => {
  //   console.log(`Server is running at 3000`);
  //   // Register routes
  //
  //
  //
  // });


// app.use("/products", productRoutes);
});

app.get('/products', (req, res) => {
  res.json(products);
});

// app.use(cors()); // Allow all origins by default

// app.use(express.json());


// // Start the server
// app.listen(3000, () => {
//   console.log(`Server is running on http://localhost:${3000}`);
// });

module.exports.handler = serverless(app);
