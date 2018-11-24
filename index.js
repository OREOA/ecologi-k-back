const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

const exampleRouter = require('./controllers/example')
const usersRouter = require('./controllers/users')

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

app.use(cors())
app.use(bodyParser.json())

app.use('/hello', exampleRouter)
app.use('/api/users', usersRouter)

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