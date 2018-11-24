const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  userId: String,
  PersonAgeGrp: String,
  KCustomer: String
})

customerSchema.statics.format = (customer) => {
  return {
    id: customer.id,
    userId: customer.userId,
    PersonAgeGrp: customer.PersonAgeGrp,
    KCustomer: customer.KCustomer
  }
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer