const router = require('express').Router()
const { loginUser, registerUser } = require('../../controllers/authController')

router.route('/login')
  .post(async (req, res) => {
    const credentials = req.body
    try {
      loginUser(credentials, (error, result) => {
        if (error) {
          return res.status(500).send(error)
        }
        return res.send(result)
      })
      // return res.send({ user: _user, token })
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })
router.route('/register')
  // Create user PUBLIQUE
  .post(async (req, res) => {
    try {
      const userCreated = await registerUser(req.body)
      loginUser(req.body, (error, result) => {
        if (error) {
          return res.status(500).send(error)
        }
        return res.send(result)
      })
      return (userCreated)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

module.exports = router
