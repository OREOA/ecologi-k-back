const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  name: String,
  description: String,
  goal: Number,
  field: String
})

challengeSchema.statics.format = (challenge) => {
  return {
    id: challenge.id,
    name: challenge.name,
    description: challenge.description,
    goal: challenge.goal,
    field: challenge.field
  }
}

const Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = Challenge