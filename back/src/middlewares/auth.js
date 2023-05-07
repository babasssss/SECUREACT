const jwt = require('jsonwebtoken')

const withAuth = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
      if (decoded && decoded.id) {
        req.userId = decoded.id
        next()
      } else {
        return res.status(401).send()
      }
    } catch (error) {
      return res.status(401).send(error)
    }
  } else {
    return res.status(401).send()
  }
}

module.exports = withAuth
