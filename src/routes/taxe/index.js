const { getTaxeById, createTaxe, deleteTaxe } = require('../../controllers/taxeController')

const router = require('express').Router()
// const withAuth = require('../../middlewares/auth')

router.route('/:id')
// Récupérer la liste la taxe par id client
  .get(async (req, res) => {
    const custumers = await getTaxeById(req.params.id)
    return res.send(custumers)
  })
  // Création d'une taxe
  .post(async (req, res) => {
    try {
      // on recuper la taxe créer
      const createdTaxe = await createTaxe(req.body)
      return res.send(createdTaxe)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
// Suppression d'une taxe par son id
  .delete(async (req, res) => {
    try {
      // On supprime la taxe
      const deletedTaxe = await deleteTaxe(req.params.id)
      return res.send(deletedTaxe)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

module.exports = router
