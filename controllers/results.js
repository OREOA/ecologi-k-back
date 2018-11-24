const resultRouter = require('express').Router()
const Result = require('../models/result')

resultRouter.get('/', async (request, response) => {
    const results = await Result
        .find({})
        .populate('challenge', {_id: 1, name: 1, description: 1, goal: 1})
    response.json(results.map(Result.format))
})

resultRouter.get('/:customer', async (request, response) => {
    const results = await Result
        .find({customer: request.params.customer})
        .populate('challenge', {_id: 1, name: 1, description: 1, goal: 1})
    response.json(results.map(Result.format))
})

resultRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const result = new Result({
            value: body.value,
            completed: body.completed,
            customer: body.customer,
            challenge: body.challenge
        })
        const savedResult = await result.save()

        response.json(Result.format(savedResult))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})
    }
})

module.exports = resultRouter