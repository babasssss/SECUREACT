const Invoice = require('../data/models/Invoice')

// Visualiser la facture par ID
const getInvoiceById = async (invoiceID) => {
  console.log(invoiceID)
  const invoice = await Invoice.find({ _id: invoiceID }).exec()
  if (!invoiceID) {
    throw new Error('Missing Invoice Data ')
  }
  return invoice
}

module.exports = {
  getInvoiceById
}
