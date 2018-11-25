const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  _id: String,
  PersonAgeGrp: String,
  KCustomer: String
})

customerSchema.statics.format = (customer) => {
  return {
    id: customer.id,
    PersonAgeGrp: customer.PersonAgeGrp,
    KCustomer: customer.KCustomer
  }
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer