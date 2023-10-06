const mongoose = require('mongoose');

//Database connection.
const connectDB = async() =>{
    try {
      const dbConnect = await mongoose.connect(process.env.DATABASE_URI);
      console.log(`DATABASE successfully connected on host: ${dbConnect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//Database Disconnection
const disconnectDB = async() =>{
try {
    return mongoose.disconnect();
} catch (error) {
    console.log(error)
}
}

module.exports = { connectDB, disconnectDB };