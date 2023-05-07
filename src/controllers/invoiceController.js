const Invoice = require('../data/models/Invoice')
const Customer = require('../data/models/Customer')

// Visualiser la facture par ID
const getInvoiceById = async (invoiceID) => {
  console.log(invoiceID)
  const invoice = await Invoice.find({ _id: invoiceID }).exec()
  if (!invoiceID) {
    throw new Error('Missing Invoice Data ')
  }
  return invoice
}

const createInvoice = async (invoice) => {
  // console.log(invoice)
  // Vérification des données OBLIGATOIRE
  if (!invoice.customer) {
    throw new Error('missing data')
  }
  // Vérifier si le client exist
  const existingCustomer = await Customer.findById(invoice.customer)
  if (!existingCustomer) {
    throw new Error(`Client with ID ${invoice.customer} not found`)
  }
  console.log(existingCustomer)
  // création tuple facture
  const _invoice = new Invoice({
    customer: invoice.customer, // Ajouter l'ID du client à la facture
    numInvoice: invoice.numInvoice,
    date: invoice.date,
    paymentType: invoice.paymentType,
    maturity: invoice.maturity,
    message: invoice.message,
    products: invoice.products
  })

  // Enregistrement du tuple
  const savedInvoice = await _invoice.save()

  // On met à jour le document client avec l'id de la facture
  await Customer.findByIdAndUpdate(
    invoice.customer,
    { $push: { invoices: savedInvoice._id } },
    { new: true, useFindAndModify: false }
  )
  // -Sécurité-
  const savedInvoiceObject = savedInvoice.toObject()

  // On retourne les informations de la facture créer
  return savedInvoiceObject
}
const deleteInvoice = async (invoice) => {
  if (!invoice) {
    throw new Error('missing data')
  }
  // Verifier l'exitance de la facture
  const existingInvoice = await Invoice.findById(invoice)
  if (!existingInvoice) {
    throw new Error('Invoice not found')
  }

  // Supprimer la facture
  await Invoice.findByIdAndDelete(invoice)
  // Supprimer l'ID facture du client dans le champ "invoices" de tous les documents Taxe
  await Customer.updateMany({}, { $pull: { invoices: invoice } })
}

module.exports = {
  getInvoiceById,
  createInvoice,
  deleteInvoice
}
