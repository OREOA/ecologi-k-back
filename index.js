const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const exampleRouter = require('./controllers/example')

app.use(cors())
app.use(bodyParser.json())

app.use('/hello', exampleRouter)

const server = http.createServer(app)
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})