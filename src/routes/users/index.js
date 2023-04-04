const { getUsers, createUser, deleteUserById } = require('../../controllers/usersController')
const router = require('express').Router()

router.route('/')
  // Récupérer la liste des users
  .get(async (req, res) => { // TODO WITHAUTH
    const users = await getUsers()
    return res.send(users)
  })

// Création d'un user
  .post(async (req, res) => {
    try {
      // on recuper l'user créer
      const createdUser = await createUser(req.body)
      return res.send(createdUser)
    } catch (error) {
      return res.status(500).send(error)
    }
  })
router.route('/:id')
  // Supprimer un utilisateur
  .delete(async (req, res) => {
    try {
      await deleteUserById(req.params.id)
      return res.send(`L'utilisateur ayant id : ${req.params.id} a bien été supprimer ! `)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
