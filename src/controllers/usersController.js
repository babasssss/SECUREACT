const User = require('../data/models/User')

// Visualiser tous les utilisateurs
const getUsers = async () => {
  const users = await User.find().select('-password')
  return users
}

// Créer un utilisateur
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

// Supprimer un utilisateur via l'ID
const deleteUserById = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  // await File.remove({ user: id }).exec()
  // TODO : supprimer le fichier physiquement
  await User.findByIdAndDelete(id)
}
module.exports = {
  getUsers,
  createUser,
  deleteUserById
}
