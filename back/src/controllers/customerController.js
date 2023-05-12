const Customer = require('../data/models/Customer')
const User = require('../data/models/User')

// Visualiser un client par son ID
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

  // Vérification de l'existence de l'user
  if (customer.user && !(await User.exists({ _id: customer.user }))) {
    throw new Error('Invalid user reference')
  }
  // Association du customer à l'user
  if (customer.user) {
    await User.findByIdAndUpdate(
      customer.user,
      { $push: { customer: _customer._id } },
      { new: true, useFindAndModify: false }
    )
  }
  // Enregistrement du tuple
  const savedCustomer = await _customer.save()
  // console.log(savedCustomer)
  // -Sécurité-
  const savedUserObject = savedCustomer.toObject()

  // on retourne les informations de l'user sans son mot de passe
  return savedUserObject
}

// Supprimer un customer via l'ID user Puis l'ID customer
const deleteCustomerByIdUser = async (idUser, idCustomer) => {
  if (!idUser || !idCustomer) {
    throw new Error('missing data')
  }

  const customer = await Customer.findOne({ _id: idCustomer, user: idUser })
  if (!customer) {
    throw new Error('Customer not found')
  }

  // Supprimer l'id du client dans le tableau "customer" de l'utilisateur
  await User.findByIdAndUpdate(idUser, { $pull: { customer: idCustomer } })

  await Customer.findByIdAndDelete(idCustomer)
}

const updateCustomerById = async (id, customer) => {
  if (!id) {
    throw new Error('missing data')
  }
  if (!customer) {
    throw new Error('missing customer')
  }

  // On met à jour du client via la méthode mongoose findByIdAndUpdate
  const customerUpdate = await Customer.findByIdAndUpdate(id, customer, { new: true })

  const customerObject = customerUpdate.toObject()

  return customerObject
}

module.exports = {
  createCustumer,
  getCustomerById,
  deleteCustomerByIdUser,
  updateCustomerById
}
