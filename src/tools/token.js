const jwt = require('jsonwebtoken')

const getUserIdFromToken = (token) => {
  if (token) {
    const decoded = jwt.decode(token)
    console.log(decoded)
    return decoded.id
  }
}

module.exports = {
  getUserIdFromToken
}
