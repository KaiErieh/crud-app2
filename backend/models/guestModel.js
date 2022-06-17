const mongoose = require('mongoose')

const guestSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please, add an email!"],
      unique: true
    },
    code: {
      type: String

    }
  }
)

module.exports = mongoose.model('Guest',guestSchema)