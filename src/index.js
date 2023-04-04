// console.log('test')
require('dotenv').config() // Appel .ENV

const logger = require('morgan')

const express = require('express') // Appel de Express

const app = express()
const port = process.env.PORT

// Parmétrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))// Mise en place de l'affichages des routes et autres en ligne de commande

// Connexion BDD
const connect = require('./data/helpers/db')
connect()

// L'ensemble de nos routes
app.use('/users', require('./routes/users'))

app.get('/', (req, res) => {
  res.send('Bienvenu sur l\'API SECUREACT!')
})

app.listen(port, () => {
  console.log('Le serveur est en cours d’exécution sur le port ' + port)
})
