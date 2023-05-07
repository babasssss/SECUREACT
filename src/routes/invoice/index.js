const { getInvoiceById } = require('../../controllers/invoiceController')

const router = require('express').Router()
const withAuth = require('../../middlewares/auth')

router.route('/:id')
  // Récupérer la facture par ID
  .get(withAuth, async (req, res) => {
    try {
      const invoices = await getInvoiceById(req.params.id)
      return res.send(invoices)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
// router.route('/')
//   // Création d'une unité
//   .post(withAuth, async (req, res) => {
//     try {
//       // on recuper l'unité créer
//       const createdUnit = await createUnit(req.body)
//       return res.send(createdUnit)
//     } catch (error) {
//       return res.status(500).send(error)
//     }
//   })

// router.route('/:idUnit/:idUser')
//   // Suppression d'une unité par son iduser
//   .delete(withAuth, async (req, res) => {
//     try {
//       // On supprime l'unité
//       await deleteUnit(req.params.idUnit, req.params.idUser)
//       return res.send(`L'unité id : ${req.params.idUnit} a été supprimer de l'user id :${req.params.idUser}  ! `)
//     } catch (error) {
//       console.error(error)
//       return res.status(500).send(error)
//     }
//   })

module.exports = router
