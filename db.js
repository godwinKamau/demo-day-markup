const mongoose = require('mongoose')
const env = require('dotenv').config()

const connectMongo = async() => {
    try {
        await mongoose.connect(process.env.mongoURI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('ERROR: ' ,error.message)
    }
}

module.exports = connectMongo