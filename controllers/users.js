const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    console.log(body)
    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'Username already taken' })
    }

    const user = new User({
      username: body.username,
      name: body.name
    })
    console.log(user)
    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter