const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const path = require('path');

const allowedOrigins = ['https://doma-store.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to database
connectDB().then(() => {
  console.log('Connected Success!')
}).catch(err =>{
  console.log('Error While Connecting DB')

})

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// app.options('*', cors()); // Enable preflight for all routes


app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
