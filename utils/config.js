require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI

module.exports = {
    cacheEnabled: true,
    cacheTimeout: '5 minutes',
    mongoUrl,
}