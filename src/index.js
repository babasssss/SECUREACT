require('dotenv').config() // Appel .ENV
const helmet = require('helmet') // Apell Helmet SECU
const cors = require('cors')// Appel Cors SECU

const morgan = require('morgan')

const express = require('express') // Appel de Express

const app = express()
const port = process.env.PORT

// Parmétrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))// Mise en place de l'affichages des routes et autres en ligne de commande
app.use(helmet())
app.use(cors())

// Connexion BDD
const connect = require('./data/helpers/db')
connect()

// L'ensembles de nos routes
app.use('/users', require('./routes/users'))
app.use('/customers', require('./routes/customer'))
app.use('/auth', require('./routes/auth'))
app.use('/protected', require('./routes/protected'))
app.use('/taxe', require('./routes/taxe'))
app.use('/unit', require('./routes/unit'))
app.use('/product', require('./routes/product'))

// Route initiale
app.get('/', (req, res) => {
  res.send("Bienvenu sur l'API SECUREACT!")
})

app.listen(port, () => {
  console.log('Le serveur est en cours d’exécution sur le port ' + port)
})
