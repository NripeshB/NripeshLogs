const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const tokenExtractor = (req, res, next) => {
    // gets the token 
    // Reads the "Authorization" header from the request
    // Example header:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  const authorization = req.get('authorization')
  // edits it such that only the token remains and attaches it to the request 
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  // takes to the next step as its a middleware
  next()
}

const userExtractor = (req, res, next) => {
  try {
    // if the requested token doesn't exist return error
    if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
    }
    // verifies the token
    const decodedToken = jwt.verify(req.token, config.SECRET)
       // as the final catch statement already catches any error the below
       
//     // can be commented 
//     // if the token is invalid throws another error 
//     // if (!decodedToken.id) {
//     //   return res.status(401).json({ error: 'token invalid' })
//     // }


    // attaches the decoded token to the request body 
    req.user = decodedToken
    // takes to the next step as its a middleware
    next()
  } catch (err) {
    console.error('userExtractor error:', err.message)
    res.status(401).json({ error: 'token invalid or missing' })
  }
}

module.exports = {
  tokenExtractor,
  userExtractor,
}
