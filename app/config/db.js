const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB_NAME,
            serverSelectionTimeoutMS: 5000,
            heartbeatFrequencyMS: 1000,
            retryWrites: true,
            w: 'majority',
            family: 4
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
connectDB()

module.exports = connectDB; 