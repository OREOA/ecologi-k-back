const challengeRouter = require('express').Router()
const Challenge = require('../models/challenge')

challengeRouter.get('/', async (request, response) => {
  const challenges = await Challenge
    .find({})
  response.json(challenges.map(Challenge.format))
})

challengeRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const challenge = new Challenge({
      name: body.name,
      description: body.description,
      goal: body.goal
    })
    const savedChallenge = await challenge.save()

    response.json(Challenge.format(savedChallenge))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = challengeRouter