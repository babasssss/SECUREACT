const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers'
  }

}, { timestamps: true })

module.exports = mongoose.model.User || mongoose.model('User', userSchema)
