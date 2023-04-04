const Customer = require('../data/models/Customer')

// Visualiser tous les clients
const getCustomerById = async (customerId) => {
  const customer = await Customer.find({ user: customerId }).exec()
  return customer
}

// Créer un client
const createCustumer = async (customer) => {
  // Vérification des données
  // console.log(customer)
  if (!customer.firstName) {
    throw new Error('missing data')
  }

  // création tuple custumer
  const _customer = new Customer({
    firstName: customer.firstName
    // lastName: customer.lastName,
    // email: customer.email,
    // phone: customer.phone,
    // customerType: customer.customerType
    // address: {
    //   street: customer.address.street,
    //   postalCode: customer.address.postalCode,
    //   city: customer.address.city,
    //   country: customer.address.country
    // },
    // user: customer.user
  })

  // Enregistrement du tuple
  const savedCustomer = await _customer.save()
  // -Sécurité-
  const savedUserObject = savedCustomer.toObject()

  // on retourne les informations de l'user sans son mot de passe
  return savedUserObject
}

// Supprimer un utilisateur via l'ID
// const deleteUserById = async (id) => {
//   if (!id) {
//     throw new Error('missing data')
//   }
//   // await File.remove({ user: id }).exec()
//   // TODO : supprimer le fichier physiquement
//   await User.findByIdAndDelete(id)
// }
module.exports = {
  createCustumer,
  getCustomerById

}
