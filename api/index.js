const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const path = require('path');

// Connect to database
connectDB().then(() => {
  console.log('Connected Success!')
}).catch(err =>{
  console.log('Error While Connecting DB')
})

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors({
  origin: '*', // Or specify allowed origins, e.g., ['http://example.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.options('*', cors()); // Enable preflight for all routes


app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
