const { getProductById, createProduct, deleteProduct } = require('../../controllers/productController')

const router = require('express').Router()
const withAuth = require('../../middlewares/auth')

router.route('/:id')
  // Récupérer la liste des produits par l'id users
  .get(withAuth, async (req, res) => {
    const custumers = await getProductById(req.params.id)
    return res.send(custumers)
  })

  // Supprimer un produit
  .delete(withAuth, async (req, res) => {
    try {
      // console.log(req.params.id)
      await deleteProduct(req.params.id)
      return res.send(`Le produit ayant l'id ${req.params.id} à bien été supprimer !`)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

router.route('/')
  // Création d'un produit
  .post(withAuth, async (req, res) => {
    try {
      // on recuper le produit créer
      const createdTaxe = await createProduct(req.body)
      return res.send(createdTaxe)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

module.exports = router
