const PORT = process.env.PORT || 3000; // Use environment variable for port
const express = require('express');
const app = express();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
