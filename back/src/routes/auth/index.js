const router = require('express').Router()
const { loginUser } = require('../../controllers/authController')

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

module.exports = router
