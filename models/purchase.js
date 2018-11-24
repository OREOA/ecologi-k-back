const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  ean: String,
  quantity: String,
  userId: String
})

purchaseSchema.statics.format = (purchase) => {
  return {
    id: purchase.id,
    ean: purchase.ean,
    quantity: purchase.quantity,
    userId: purchase.userId
  }
}

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase