const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Connect to database
connectDB().then(() => {
  app.listen(3500, () => {
    console.log(`Server is running at 3500`);
    // Register routes
    app.use("/products", productRoutes);
  });
});

app.use(cors()); // Allow all origins by default

app.use(express.json());
