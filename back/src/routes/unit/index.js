const { getUnitById, createUnit, deleteUnit, updateUnitById } = require('../../controllers/unitContoller')

const router = require('express').Router()
const withAuth = require('../../middlewares/auth')

router.route('/:id')
  // Récupérer la liste la l'unité par id client
  .get(withAuth, async (req, res) => {
    const custumers = await getUnitById(req.params.id)
    return res.send(custumers)
  })
  // Update Unité
  .patch(async (req, res) => {
    try {
      const unnitUpdate = await updateUnitById(req.params.id, req.body)
      return res.send(unnitUpdate)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
router.route('/')
  // Création d'une unité
  .post(withAuth, async (req, res) => {
    try {
      // on recuper l'unité créer
      const createdUnit = await createUnit(req.body)
      return res.send(createdUnit)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

router.route('/:idUnit/:idUser')
  // Suppression d'une unité par son iduser
  .delete(withAuth, async (req, res) => {
    try {
      // On supprime l'unité
      await deleteUnit(req.params.idUnit, req.params.idUser)
      return res.send(`L'unité id : ${req.params.idUnit} a été supprimer de l'user id :${req.params.idUser}  ! `)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
