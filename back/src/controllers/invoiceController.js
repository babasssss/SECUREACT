const Invoice = require('../data/models/Invoice')
const Customer = require('../data/models/Customer')
const User = require('../data/models/User')

// Visualiser la facture par ID user
const getInvoiceById = async (invoiceID) => {
  console.log(invoiceID)
  const invoice = await Invoice.find({ user: invoiceID }).exec()
  if (!invoiceID) {
    throw new Error('Missing Invoice/user Data ')
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

  // Vérifier si l'user exist
  const existingUser = await User.findById(invoice.user)
  if (!existingUser) {
    throw new Error(`User with ID ${invoice.user} not found`)
  }
  console.log(existingUser)

  // création tuple facture
  const _invoice = new Invoice({
    customer: invoice.customer, // Ajouter l'ID du client à la facture
    user: invoice.user, // Ajouter l'ID de l'user à la facture
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

const updateInvoiceById = async (id, invoice) => {
  if (!invoice) {
    throw new Error('missing invoice')
  }

  // Mettre à jour la date de facturation
  invoice.date = new Date(invoice.date)
  // Mettre à jour la date d'échéance
  const maturityDate = new Date(invoice.date)
  maturityDate.setMonth(maturityDate.getMonth() + 1)
  invoice.maturity = maturityDate

  // Utilisez la méthode findByIdAndUpdate pour mettre à jour la facture en utilisant l'ID récupéré
  const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice, { new: true })
  return updatedInvoice
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
  deleteInvoice,
  updateInvoiceById
}
