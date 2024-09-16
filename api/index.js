const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");


// Connect to database
connectDB().then(() => {
  console.log('Connected Success!')
}).catch(err =>{
  console.log('Error While Connecting DB')
})

app.use(cors()); // Allow all origins by default

app.use(express.json());

app.use("/products", productRoutes);


// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
