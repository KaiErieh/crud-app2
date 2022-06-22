const mongoose = require('mongoose')

const guestSchema = mongoose.Schema(
  {
    name: {
      type: String,

    },
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
    },
    startDate: {
      type: String,

    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Guest', guestSchema)