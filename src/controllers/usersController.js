const User = require('../data/models/User')

const getUsers = async () => {
  const users = await User.find().select('-password')
  return users
}
const createUser = async (user) => {
  // Vérification des données
  if (!user.email || !user.password || !user.firstName || !user.lastName || !user.phone) {
    throw new Error('missing data')
  }

  // création tuple user
  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })

  // Enregistrement du tuple
  const savedUser = await _user.save()

  // -Sécurité-
  const savedUserObject = savedUser.toObject()
  delete savedUserObject.password

  // on retourne les informations de l'user sans son mot de passe
  return savedUserObject
}

module.exports = {
  getUsers,
  createUser
}
