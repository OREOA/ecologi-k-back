require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI

module.exports = {
    cacheEnabled: true,
    cacheTimeout: '60 minutes',
    mongoUrl,
}