const { createCustumer, getCustomerById, deleteCustomerByIdUser } = require('../../controllers/customerController')

const router = require('express').Router()
const withAuth = require('../../../middlewares/auth')

router.route('/:id')
// Récupérer la liste des clients By users
  .get(withAuth, async (req, res) => {
    const custumers = await getCustomerById(req.params.id)
    return res.send(custumers)
  })
router.route('/:idUser/:idCustomer')
// Supprimer un client By users By clients
  .delete(withAuth, async (req, res) => {
    try {
      await deleteCustomerByIdUser(req.params.idUser, req.params.idCustomer)
      return res.send(`Le client ayant id : ${req.params.idCustomer} a bien été supprimer ! `)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

router.route('/')
// Création d'un Client
  .post(withAuth, async (req, res) => {
    try {
    // on recuper le client créer
      // console.log(req.body)
      const createdCustomer = await createCustumer(req.body)
      return res.send(createdCustomer)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
module.exports = router
