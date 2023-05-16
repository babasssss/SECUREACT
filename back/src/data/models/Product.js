const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  nameProduct: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  initPrix: {
    type: String,
    enum: ['HT', 'TTC']
  },
  prix: {
    type: String
  },
  quantity: {
    type: Number
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'units'
  },
  taxe: {
    type: Schema.Types.ObjectId,
    ref: 'taxes'
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model.Product || mongoose.model('Product', productSchema)
