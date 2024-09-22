const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const path = require('path');

// Connect to database
// connectDB().then(() => {
//   console.log('Connected Success!')
// }).catch(err =>{
//   console.log('Error While Connecting DB')
// })

app.use(express.json());
app.use(cors()); // Should be before defining routes
app.options('*', cors()); // Handle preflight requests
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);


// Sample in-memory data (array of books)
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

// DELETE endpoint to remove a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1); // Remove the book from the array
    return res.status(200).json({message:"deleted"}); // No content to send back
  }

  return res.status(404).json({ message: 'Book not found' });
});


// // Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

// module.exports.handler = serverless(app);
