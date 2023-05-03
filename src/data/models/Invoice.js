const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
  customer: [{ // REF client
    type: Schema.Types.ObjectId,
    ref: 'customers'
  }],
  numInvoice: {
    type: Number
  },
  date: {
    type: String
  },
  maturity: { // Echeance par Default 1 mois après la date de la facture
    type: String
  },
  message: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model.Invoice || mongoose.model('Invoice', invoiceSchema)
