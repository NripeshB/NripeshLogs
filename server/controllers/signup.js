const bcrypt = require('bcrypt')
const User = require('../models/user.js')
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

module.exports = {
    signup,
}