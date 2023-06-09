const jwt = require('jsonwebtoken')
const User = require('../data/models/User')

const loginUser = async (credentials, callback) => {
  let _error
  // Je vérifie la présence des paramètres
  if (!credentials.email || !credentials.password) {
    _error = 'Invalid credentials'
  }

  // On cherche l'utilisateur dans la base de données
  const user = await User.findOne({ email: credentials.email })

  if (!user) {
    _error = 'Invalid credentials'
    return callback(_error, null)
  }

  // On compare son mot de passe
  user.comparePassword(credentials.password, (error, isMatch) => {
    if (isMatch) {
      const payload = {
        id: user.id
      }
      // On créé le token
      jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' }, (error, token) => {
        if (error) {
          _error = 'Invalid credentials'
        }
        // On supprime le mot de passe de l'utilisateur récupéré en base
        const _user = user.toObject()
        delete _user.password
        // On retourne l'utilisateur et le token
        return callback(_error, {
          _user,
          token
        })
      })
    } else {
      _error = 'Invalid credentials'
      return callback(_error, null)
    }
    if (error) {
      _error = 'Invalid credentials'
      return callback(_error, null)
    }
  })
}
const registerUser = async (user) => {
  // Verif présence email password
  if (!user.email || !user.password) {
    throw new Error('missing data')
  }

  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })

  // On enregistre le user et on récup dans MongoDB
  const savedUser = await _user.save()

  // Retirer le password de la route
  const savedUserObject = savedUser.toObject()
  delete savedUserObject.password
  // On renvoit le user dans la réponse de l'API
  return savedUserObject
}

module.exports = {
  loginUser,
  registerUser
}
