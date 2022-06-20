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

    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Guest', guestSchema)