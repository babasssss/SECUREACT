const { createCustumer, getCustomerById } = require('../../controllers/customerController')

const router = require('express').Router()

router.route('/:id')
// Récupérer la liste des clients By users
  .get(async (req, res) => {
    const custumers = await getCustomerById(req.params.id)
    return res.send(custumers)
  })

router.route('/')
// Création d'un Client
  .post(async (req, res) => {
    console.log(req.body)
    try {
    // on recuper le client créer
      const createdCustomer = await createCustumer(req.body)
      console.log('cool')
      return res.send(createdCustomer)
    } catch (error) {
      // console.log('test')
      return res.status(500).send(error)
    }
  })
module.exports = router
