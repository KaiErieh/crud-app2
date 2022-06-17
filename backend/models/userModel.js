const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please, add a name!"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please add a password!"]

    },
    email: {
      type: String,
    }
  }
)

module.exports = mongoose.model('User',userSchema)