const apicache = require('apicache')
const config = require('./config')
const { cacheEnabled, cacheTimeout } = config

apicache.options({
    enabled: cacheEnabled,
})

module.exports = apicache.middleware(cacheTimeout)
