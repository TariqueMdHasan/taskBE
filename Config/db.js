const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        // mongodb connection here
        await mongoose.connect(process.env.MONGO_URL, { 
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        .then(() => console.log('Database connected successfully from db.js in config folder'))
        .catch((error) => console.log("Error connecting to database", error));
    } catch (error) {
        console.log("database is not connected in db.js in config folder", error);
    }
}

module.exports = connectDB;