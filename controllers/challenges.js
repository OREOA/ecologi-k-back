const challengeRouter = require('express').Router()
const Challenge = require('../models/challenge')
const Customer = require('../models/customer')
const Result = require('../models/result')

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
            goal: body.goal,
            field: body.field
        })
        const savedChallenge = await challenge.save()
        const formattedChallenge = Challenge.format(savedChallenge)
        const customers = await Customer.find({})
        for (var i = 0; i < customers.length; i++) {
            const customer = Customer.format(customers[i])
            console.log(customer)
            const result = new Result({
                value: 0,
                completed: false,
                customer: customer.id,
                challenge: formattedChallenge.id
            })
            const savedResult = await result.save()
        }

        response.json(formattedChallenge)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})
    }
})

module.exports = challengeRouter