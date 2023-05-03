const { getTaxeById, createTaxe, deleteTaxe } = require('../../controllers/taxeController')

const router = require('express').Router()
const withAuth = require('../../middlewares/auth')

router.route('/:id')
// Récupérer la liste la taxe par id client
  .get(withAuth, async (req, res) => {
    const custumers = await getTaxeById(req.params.id)
    return res.send(custumers)
  })
router.route('/')
  // Création d'une taxe
  .post(withAuth, async (req, res) => {
    try {
      // on recuper la taxe créer
      const createdTaxe = await createTaxe(req.body)
      return res.send(createdTaxe)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

router.route('/:idTaxes/:idUser')
// Suppression d'une taxe par son iduser
  .delete(withAuth, async (req, res) => {
    try {
      // On supprime la taxe
      await deleteTaxe(req.params.idTaxes, req.params.idUser)
      return res.send(`La taxe id : ${req.params.idTaxes} a été supprimer de l'user id :${req.params.idUser}  ! `)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })
module.exports = router
