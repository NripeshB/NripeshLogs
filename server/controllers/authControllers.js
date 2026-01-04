const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const config = require('../utils/config.js')

// This is the signup logic
const signup = async(req, res)=>{
    // destructures the request body
    const {username, email, password} = req.body

    // checks if the password is valid or not 
    if(!password || password.length<6){
        return res.status(400).json({
            error: 'Password should at least be greater than 6 digits. '
        })
    }

    // hashes the valid password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Creates the new user in the user database
    const user = new User({
        username,
        email,
        passwordHash,
    })

    // saves the new user in the user database
    const savedUser = await user.save()

    // returns the newly saved user (without the password hash as defined in the schema )
    res.status(201).json(savedUser)
}


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
// This function is used to hydrate the state on reloads and to check the state
// of the current user after login

const me = async(req,res)=>{
    // returns the recieved json object of the logged user
    res.json({
        id : req.user.id,
        username : req.user.username,
        role : req.user.role

    })
}



module.exports = {
    login,
    signup,
    me,
}