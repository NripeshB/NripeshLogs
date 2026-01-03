const router = require('express').Router
const login = require('../controllers/login')
const signup = require('../controllers/signup')


router.post('/signup', signup.signup)
router.post('/login', login.login)

module.exports = router