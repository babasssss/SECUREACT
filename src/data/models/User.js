const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  },
  customer: [{
    type: Schema.Types.ObjectId,
    ref: 'customers'
  }]

}, { timestamps: true })

// Remplace le mot de passe de l'utilisateur par un équivalent crypté avant l'enregistrement dans la BDD
userSchema.pre('save', function (next) {
  // On récupère le user au travers du contexte "this"
  const user = this
  // On regarde si le mot de passe à changer OU si l'utilisateur est nouveau
  if (this.isModified('password') || this.isNew) {
    // On génère du "sel" = une clef aléatoire pour hasher le mot de passe
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        throw new Error(error)
      }
      // On hash le mot de passe avec le "sel", puis on le remplace dans le user que l'on va sauvegarder
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          throw new Error(error)
        }

        user.password = hash

        return next()
      })
    })
  }
})

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error, null)
    }
    return callback(null, isMatch)
  })
}

module.exports = mongoose.model.User || mongoose.model('User', userSchema)
