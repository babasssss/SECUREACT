const Product = require('../data/models/Product')
const Taxe = require('../data/models/Taxe')
const Unit = require('../data/models/Unit')
const User = require('../data/models/User')

// Visualiser touts les produits d'un user
const getProductById = async (userId) => {
  console.log(userId)
  const taxe = await Product.find({ users: userId }).exec()
  return taxe
}

// Créer d'une produit
const createProduct = async (product) => {
  // Vérification des données
  if (!product.nameProduct || !product.users) {
    throw new Error('missing data')
  }
  // Création du produit
  const _product = new Product({
    nameProduct: product.nameProduct,
    comment: product.comment,
    initPrix: product.initPrix,
    prix: product.prix,
    unit: product.unit,
    taxe: product.taxe,
    users: product.users
  })

  // Vérification de l'existence de l'unité
  if (product.unit && !(await Unit.exists({ _id: product.unit }))) {
    throw new Error('Invalid unit reference')
  }
  // Association du produit à l'unité
  if (product.unit) {
    await Unit.findByIdAndUpdate(
      product.unit,
      { $push: { products: _product._id } },
      { new: true, useFindAndModify: false }
    )
  }

  // Vérification de l'existence de la taxe
  if (product.taxe && !(await Taxe.exists({ _id: product.taxe }))) {
    throw new Error('Invalid taxe reference')
  }
  // Association du produit à la taxe
  if (product.taxe) {
    await Taxe.findByIdAndUpdate(
      product.taxe,
      { $push: { products: _product._id } },
      { new: true, useFindAndModify: false }
    )
  }
  // Vérification de l'existence de la taxe
  if (product.users && !(await User.exists({ _id: product.users }))) {
    throw new Error('Invalid user reference')
  }
  // Association du produit à la taxe
  if (product.users) {
    await User.findByIdAndUpdate(
      product.users,
      { $push: { products: _product._id } },
      { new: true, useFindAndModify: false }
    )
  }

  // Enregistrement du tuple
  const savedProduct = await _product.save()

  // -Sécurité-
  const savedProductObject = savedProduct.toObject()

  // on retourne les informations du produit
  return savedProductObject
}

// Supprimer un produit via l'ID
const deleteProduct = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  // Verifier l'exitance du produit
  const existingproduct = await Product.findById(id)
  if (!existingproduct) {
    throw new Error('product not found')
  }

  // Supprimer l'ID du produit
  await Product.findByIdAndDelete(id)
  // Supprimer l'ID du produit dans le champ "products" de tous les documents Taxe
  await Taxe.updateMany({}, { $pull: { products: id } })
  // Supprimer l'ID du produit dans le champ "products" de tous les documents Unit
  await Unit.updateMany({}, { $pull: { products: id } })
  // Supprimer l'ID du produit dans le champ "products" de tous les documents User
  await User.updateMany({}, { $pull: { products: id } })
}

module.exports = {
  getProductById,
  createProduct,
  deleteProduct
}
