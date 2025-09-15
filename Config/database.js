const mongoose = require("mongoose")
require("dotenv").config()

async function connectDB () {
    try {
        await mongoose.connect(process.env.mongodb_uri, {dbName: process.env.mongodb_name})
        console.log("MONGO URI:", process.env.mongodb_uri);
        console.log("DB NAME:", process.env.mongodb_name);
        console.log("Database Connected Sucessfully To " + process.env.mongodb_name)
    } catch (error) {
        console.log("Database Connection Failed")
        console.log(error)
    }
}

module.exports = connectDB