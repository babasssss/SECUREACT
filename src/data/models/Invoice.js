const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
  customer: [{ // REF client
    type: Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  }],
  numInvoice: {
    type: Number
  },
  date: {
    type: Date,
    get: function (date) {
      return date.toLocaleDateString('fr-FR')
    }
  },
  maturity: { // Echeance par Default 1 mois après la date de la facture
    type: Date,
    default: function () {
      const oneMonthLater = new Date(this.date)
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1)
      return oneMonthLater
    },
    get: function (date) {
      return date.toLocaleDateString('fr-FR')
    }
  },
  message: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model.Invoice || mongoose.model('Invoice', invoiceSchema)
