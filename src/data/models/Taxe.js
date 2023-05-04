const mongoose = require('mongoose')
const { Schema } = mongoose

const taxeSchema = new Schema({
  numberTaxe: {
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

module.exports = mongoose.model.Taxe || mongoose.model('Taxe', taxeSchema)
