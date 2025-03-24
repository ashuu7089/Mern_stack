const mongoose = require('mongoose')

    try {
        mongoose.connect(process.env.MONGO_URL)
       console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
    
