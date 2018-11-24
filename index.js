const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

const exampleRouter = require('./controllers/example')

app.use(cors())
app.use(bodyParser.json())

app.use('/hello', exampleRouter)

const server = http.createServer(app)
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}