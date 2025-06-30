const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
// const User = require('../models/user')
const api = require("../api")

const isLoggedIn = async (req, res, next) => {
  let token

  console.log(req.headers.authorization.split(' ')[1], 'GOT IN')
  // return res.status(200).send({auth: true, token: req.headers.authorization.split(' ')[1]})
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      if(token == "null")  return res.status(400).send({auth: false, message: "not logged in"})
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded, "decoded")
      // Get user from the token
      req.user = await api.findUserById(decoded.id)
      console.log(req.user.email, "req.user")
      
      if(!req.user) {
        return res.status(400).send({auth: false, message: "not logged in"})
      }

      return next()
    } catch (e) {
      console.error('Token verification error:', e);
      return res.status(401)
      // throw new Error('Not authorized')
    }
  }

  if (!token) {
    // res.status(401)
    return res.status(400).send('Not authorized, no token')
  }
}

module.exports = {
  isLoggedIn
}