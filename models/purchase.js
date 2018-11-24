const mongoose = require('mongoose')
const Product = require('./product')

const purchaseSchema = new mongoose.Schema({
    quantity: String,
    userId: String,
})

purchaseSchema.virtual('ean', {
    ref: 'Product',
    localField: 'ean',
    foreignField: 'ean',
    justOne: true // for many-to-1 relationships
})

purchaseSchema.statics.format = (purchase) => {
    return {
        id: purchase.id,
        quantity: purchase.quantity,
        userId: purchase.userId,
        ean: purchase.ean && Product.format(purchase.ean),
    }
}

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase