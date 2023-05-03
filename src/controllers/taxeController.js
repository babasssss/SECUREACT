const Taxe = require('../data/models/Taxe')
const User = require('../data/models/User')

// Visualiser toutes les taxes de l'users
const getTaxeById = async (userId) => {
  console.log(userId)
  const taxe = await Taxe.find({ users: userId }).exec()
  return taxe
}

// Créer une taxe
const createTaxe = async (taxe) => {
  // Vérification des données
  if (!taxe.numberTaxe || !taxe.users) {
    throw new Error('missing data')
  }

  // Vérifier si la taxe existe déjà
  const existingTaxe = await Taxe.findOne({ numberTaxe: taxe.numberTaxe })
  if (existingTaxe) {
    // Vérifier si la taxe n'est pas déjà associée à l'utilisateur
    if (existingTaxe.users.includes(taxe.users)) {
      throw new Error('taxe already associated with user')
    }

    // Associer la taxe à l'utilisateur
    await User.findByIdAndUpdate(
      taxe.users,
      { $push: { taxes: existingTaxe._id } },
      { new: true, useFindAndModify: false }
    )

    // -Sécurité-
    const existingTaxeObject = existingTaxe.toObject()

    // Retourner les informations de la taxe existante
    return existingTaxeObject
  }

  // création tuple taxe
  const _taxe = new Taxe({
    numberTaxe: taxe.numberTaxe,
    users: taxe.users
  })

  // Enregistrement du tuple
  const savedTaxe = await _taxe.save()

  // On met à jour le document utilisateur avec l'id de la taxe
  await User.findByIdAndUpdate(
    taxe.users,
    { $push: { taxes: savedTaxe._id } },
    { new: true, useFindAndModify: false }
  )

  // -Sécurité-
  const savedTaxeObject = savedTaxe.toObject()

  // On retourne les informations de la taxe créée
  return savedTaxeObject
}

const deleteTaxe = async (taxeId) => {
  // Trouver la taxe à supprimer
  // const taxeToDelete = await Taxe.findById(taxeId)

  // Vérifier si la taxe appartient à plusieurs user
  const userCount = await User.countDocuments({ taxes: taxeId })

  if (userCount > 1) {
    // La taxe appartient à plusieurs users, supprimer la référence de taxe dans les documents User
    await User.updateMany(
      { taxes: taxeId },
      { $pull: { taxes: taxeId } },
      { useFindAndModify: false }
    )
  } else {
    // La taxe appartient à un seul utilisateur, supprimer la taxe et mettre à jour le document User
    const deletedTaxe = await Taxe.findByIdAndDelete(taxeId)

    if (deletedTaxe) {
      await User.findByIdAndUpdate(
        deletedTaxe.users,
        { $pull: { taxes: deletedTaxe._id } },
        { new: true, useFindAndModify: false }
      )
    }

    return deletedTaxe
  }
}

module.exports = {
  getTaxeById,
  createTaxe,
  deleteTaxe
}
