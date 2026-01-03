const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const config = require('./utils/config.js')

// login function 
const login = async(req, res)=>{
    // destructures the request body
    const { username, password } = req.body

    // finding the user in the database 
    const user = await User.findOne({username})

    // if the user doesn't exist or password is incorrect 
    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

    // send the valid error
    if (!user || !passwordCorrect) {
        return res.status(401).json({
            error: 'invalid username or password',
        })
    }

    // creating the object to sign into the token
    const userForToken = {
        id: user._id,
        username: user.username,
        role: user.role
    }

    // signing the jwt, this expires in 1h hence users have to login again after 1 hour 
    const token = jwt.sign(
        userForToken,
        config.SECRET,
        {expiresIn : '1h' }
    )

    // sends the token as well as the username and role in the response of the function
    res.json({
        token,
        username: user.username,
        role: user.role
    })
}

module.exports = {
    login
}