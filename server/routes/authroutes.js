const router = require('express').Router()
const {tokenExtractor,userExtractor} = require('../middleware/auth')
const authControllers = require('../controllers/authControllers')

// These are the public routes 
router.post('/signup', authControllers.signup)
router.post('/login', authControllers.login)

// This is a Private route meant for rehydrating state
router.get('/me', tokenExtractor,userExtractor,authControllers.me)

module.exports = router