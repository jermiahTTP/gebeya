const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Mongoose 6 no longer supports useCreateIndex and useFindAndModify, they are true by default.
      // useCreateIndex: true, // Not needed in Mongoose 6+
      // useFindAndModify: false, // Not needed in Mongoose 6+
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure if DB connection fails
    // Consider if this is the desired behavior for all environments
    process.exit(1);
  }
};

module.exports = connectDB;
