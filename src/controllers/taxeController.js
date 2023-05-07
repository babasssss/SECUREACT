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
    // Associer l'utilisateur à la taxe
    await Taxe.findByIdAndUpdate(
      existingTaxe._id,
      { $push: { users: taxe.users } },
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

const deleteTaxe = async (taxeId, userId) => {
  // Vérifier si la taxe existe
  const existingTaxe = await Taxe.findById(taxeId)
  if (!existingTaxe) {
    throw new Error('taxe not found')
  }

  // Retirer l'ID de la taxe de l'utilisateur connecté
  await User.findByIdAndUpdate(
    userId,
    { $pull: { taxes: taxeId } },
    { new: true, useFindAndModify: false }
  )

  // Retirer l'ID  de l'utilisateur connecté  de la taxe
  await Taxe.findByIdAndUpdate(
    taxeId,
    { $pull: { users: userId } },
    { new: true, useFindAndModify: false }
  )

  // Vérifier si la taxe est associée à aucun utilisateur
  if (existingTaxe.users.length === 0) {
    await existingTaxe.delete()
    // -Sécurité-
    const existingTaxeObject = existingTaxe.toObject()
    // Retourner les informations de la taxe supprimée
    return existingTaxeObject
  } else {
    throw new Error('You no longer own the tax! However it is impossible to remove the tax because it is associated with other users')
  }
}
const updateTaxeById = async (id, taxe) => {
  if (!id) {
    throw new Error('missing data')
  }
  if (!taxe) {
    throw new Error('missing taxe')
  }

  // On met à jour le la taxe via la méthode mongoose findByIdAndUpdate
  const taxeUpdate = await Taxe.findByIdAndUpdate(id, taxe, { new: true })

  const taxeObject = taxeUpdate.toObject()

  return taxeObject
}

module.exports = {
  getTaxeById,
  createTaxe,
  deleteTaxe,
  updateTaxeById
}
