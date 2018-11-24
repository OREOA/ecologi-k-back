const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  value: Number,
  expiration: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }
})

resultSchema.statics.format = (result) => {
  return {
    id: result.id,
    value: result.value,
    expiration: result.expiration,
    user: result.user,
    challenge: result.challenge
  }
}

const Result = mongoose.model('Result', resultSchema)

module.exports = Result