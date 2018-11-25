const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    value: Number,
    completed: Boolean,
    customer: {type: mongoose.Schema.Types.String, ref: 'Customer'},
    challenge: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'}
})

resultSchema.statics.format = (result) => {
    return {
        id: result.id,
        value: result.value,
        completed: result.completed,
        customer: result.customer,
        challenge: result.challenge
    }
}

const Result = mongoose.model('Result', resultSchema)

module.exports = Result