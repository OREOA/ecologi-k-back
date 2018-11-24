const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  sex: String,
  ageGroup: String
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    sex: user.sex,
    ageGroup: user.ageGroup
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User