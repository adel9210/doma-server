const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://adelabodoma:kTvlU7jjlhbAWFnX@cluster0.mnzsn.mongodb.net/doma?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;
