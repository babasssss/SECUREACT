// Dépendance mongoose pour la BDD
const mongoose = require('mongoose')

// Requete de connexion à la BDD
const connect = () => {
  try {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
    console.log('Connexion BDD -> Validé')
  } catch (error) {
    console.log('Connexion BDD -> Refusé :' + JSON.stringify(error))
  }
}

module.exports = connect
