const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    required: true
  },
  customerType: {
    type: Number,
    required: true,
    enum: [0, 1] // Client Professionnel [1] ou particulier[0]
  },
  // Coordonnée Client
  address: {
    street: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  // Attribution du client(customer) à un seul et unique utilisateur(users)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  invoices: [{ // Ajout de la référence à la collection de factures
    type: Schema.Types.ObjectId,
    ref: 'invoices'
  }]

}, { timestamps: true })

module.exports = mongoose.model.Customer || mongoose.model('Customer', customerSchema)
