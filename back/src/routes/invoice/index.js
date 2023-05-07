const { getInvoiceById, createInvoice, deleteInvoice, updateInvoiceById } = require('../../controllers/invoiceController')

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
  // Suppression d'une facture
  .delete(withAuth, async (req, res) => {
    try {
      // On supprime la facture
      await deleteInvoice(req.params.id)
      return res.send(`La facture id : ${req.params.id} a été supprimer ! `)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })
  // Update Invoice
  .patch(async (req, res) => {
    try {
      const invoiceUpdate = await updateInvoiceById(req.params.id, req.body)
      return res.send(invoiceUpdate)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
router.route('/')
  // Création d'une facture
  .post(withAuth, async (req, res) => {
    try {
      // console.log(req.body)
      // on recuper la facture créer
      const createdInvoice = await createInvoice(req.body)
      return res.send(createdInvoice)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

module.exports = router
