const Customer = require('../data/models/Customer')
const User = require('../data/models/User')

// Visualiser tous les clients
const getCustomerById = async (customerId) => {
  const customer = await Customer.find({ user: customerId }).exec()
  return customer
}

// Créer un client
const createCustumer = async (customer) => {
  // Vérification des données
  // console.log(customer)
  if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
    throw new Error('missing data')
  }

  // création tuple custumer
  const _customer = new Customer({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    customerType: customer.customerType,
    address: {
      street: customer.address.street,
      postalCode: customer.address.postalCode,
      city: customer.address.city,
      country: customer.address.country
    },
    user: customer.user
  })

  // Enregistrem  ent du tuple
  const savedCustomer = await _customer.save()
  console.log(savedCustomer)
  if (savedCustomer) {
    await User.findByIdAndUpdate(customer.user,
      { $push: { customer: savedCustomer._id } },
      { new: true, useFindAndModify: false })
  }
  // -Sécurité-
  const savedUserObject = savedCustomer.toObject()

  // on retourne les informations de l'user sans son mot de passe
  return savedUserObject
}

// Supprimer un customer via son ID et l'ID user
const deleteCustomerByIdUser = async (idUser, idCustomer) => {
  if (!idUser || !idCustomer) {
    throw new Error('missing data')
  }

  const customer = await Customer.findOne({ _id: idCustomer, user: idUser })
  if (!customer) {
    throw new Error('Customer not found')
  }

  await Customer.findByIdAndDelete(idCustomer)
}
module.exports = {
  createCustumer,
  getCustomerById,
  deleteCustomerByIdUser
}
