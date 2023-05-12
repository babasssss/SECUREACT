const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
  customer: { // REF client
    type: Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  user: { // REF User
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  numInvoice: { // Numéro de la facture
    type: Number
    // unique: true
  },
  date: { // Date de la facture
    type: Date,
    get: function (date) {
      return date.toLocaleDateString('fr-FR')
    }
  },
  paymentType: { // Type de paiement (Durée)
    type: Number,
    required: true,
    enum: [0, 7, 14, 30, 60, 90] // 0j, 7j, 14, 30, ...
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
  },

  products: [{ // Contenu du,des produits
    product: { // REF produits
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    quantity: { // Quantité du produit
      type: Number
    },
    unit: { // REF Unité
      type: Schema.Types.ObjectId,
      ref: 'units'
    },
    tax: { // REF Taxe
      type: Schema.Types.ObjectId,
      ref: 'taxes'
    },
    amount: {
      type: String
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model.Invoice || mongoose.model('Invoice', invoiceSchema)
