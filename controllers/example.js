const exampleRouter = require('express').Router()

exampleRouter.get('/', async (req, res) => {
  res.send('Hello world')
})

module.exports = exampleRouter