const customerRouter = require('express').Router()
const Customer = require('../models/customer')

customerRouter.get('/', async (request, response) => {
  const customers = await Customer
    .find({})
  response.json(customers.map(Customer.format))
})

customerRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const customer = await Customer.findOne({
    userId,
  })
  res.json(Customer.format(customer))
})

customerRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const customer = new Customer({
      _id: body.id,
      PersonAgeGrp: body.personAgeGrp,
      KCustomer: body.kCustomer
    })
    const savedCustomer = await customer.save()

    response.json(Customer.format(savedCustomer))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = customerRouter