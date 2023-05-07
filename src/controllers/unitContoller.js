const Unit = require('../data/models/Unit')
const User = require('../data/models/User')

// Visualiser toutes les unités de l'users
const getUnitById = async (userId) => {
  console.log(userId)
  const unit = await Unit.find({ users: userId }).exec()
  return unit
}

// Créer une unité
const createUnit = async (unit) => {
  // Vérification des données
  if (!unit.nameUnit || !unit.users) {
    throw new Error('missing data')
  }

  // Vérifier si l'unité existe déjà
  const existingUnit = await Unit.findOne({ nameUnit: unit.nameUnit })
  if (existingUnit) {
    // Vérifier si l'unité n'est pas déjà associée à l'utilisateur
    if (existingUnit.users.includes(unit.users)) {
      throw new Error('unit already associated with user')
    }

    // Associer l'unité à l'utilisateur
    await User.findByIdAndUpdate(
      unit.users,
      { $push: { units: existingUnit._id } },
      { new: true, useFindAndModify: false }
    )
    // Associer l'utilisateur à l'unité'
    await Unit.findByIdAndUpdate(
      existingUnit._id,
      { $push: { users: unit.users } },
      { new: true, useFindAndModify: false }
    )

    // -Sécurité-
    const existingUnitObject = existingUnit.toObject()

    // Retourner les informations de l'unité existante
    return existingUnitObject
  }

  // création tuple Unité
  const _unit = new Unit({
    nameUnit: unit.nameUnit,
    users: unit.users
  })

  // Enregistrement du tuple
  const savedUnit = await _unit.save()

  // On met à jour le document utilisateur avec l'id de l'unité'
  await User.findByIdAndUpdate(
    unit.users,
    { $push: { units: savedUnit._id } },
    { new: true, useFindAndModify: false }
  )

  // -Sécurité-
  const savedUnitObject = savedUnit.toObject()

  // On retourne les informations de l'unité créée
  return savedUnitObject
}

const deleteUnit = async (unitId, userId) => {
  // Vérifier si l'unité existe
  const existingUnit = await Unit.findById(unitId)
  if (!existingUnit) {
    throw new Error('unit not found')
  }

  // Retirer l'ID de l'unité de l'utilisateur connecté
  await User.findByIdAndUpdate(
    userId,
    { $pull: { units: unitId } },
    { new: true, useFindAndModify: false }
  )

  // Retirer l'ID  de l'utilisateur connecté  de l'unité
  await Unit.findByIdAndUpdate(
    unitId,
    { $pull: { users: userId } },
    { new: true, useFindAndModify: false }
  )

  // Vérifier si l'unité est associée à aucun utilisateur
  if (existingUnit.users.length === 0) {
    await existingUnit.delete()
    // -Sécurité-
    const existingUnitObject = existingUnit.toObject()
    // Retourner les informations de l'unité supprimée
    return existingUnitObject
  } else {
    throw new Error('You no longer own the unit! However it is impossible to delete the unit because it is associated with other users')
  }
}

const updateUnitById = async (id, unit) => {
  if (!id) {
    throw new Error('missing data')
  }
  if (!unit) {
    throw new Error('missing unit')
  }

  // On met à jour l'unite via la méthode mongoose findByIdAndUpdate
  const userUpdate = await Unit.findByIdAndUpdate(id, unit, { new: true })

  const userObject = userUpdate.toObject()

  return userObject
}

module.exports = {
  getUnitById,
  createUnit,
  deleteUnit,
  updateUnitById
}
