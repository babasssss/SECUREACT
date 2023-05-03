const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.route('/')
  .get((req, res) => {
    const headers = req.headers
    console.log(headers)
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
    console.log(decoded)
    return res.send('Route protegé')
  })

module.exports = router
