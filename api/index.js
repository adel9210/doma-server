const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");



const products = [
  { id: 1, name: 'adwwwwel 1eee', price: 100 },
  { id: 2, name: 'Product 2www', price: 200 },
  { id: 3, name: 'Product 3eeee3333', price: 300 }
];



// Connect to database
connectDB().then(() => {
  console.log('Connected Success!')
}).catch(err =>{
  console.log('Error While Connecting DB')
})
app.use("/products", productRoutes);

app.use(cors()); // Allow all origins by default

app.use(express.json());


// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
