const mongoose = require('mongoose')
const { Schema } = mongoose

const unitSchema = new Schema({
  nameUnit: {
    type: String,
    unique: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }]

}, { timestamps: true })

module.exports = mongoose.model.Unit || mongoose.model('Unit', unitSchema)
