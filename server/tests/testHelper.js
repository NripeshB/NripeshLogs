const User = require('../models/user')

// this function just gets all the users from the DB in json format
const usersInDb = async()=>{
    const users = await User.find({})
    return users.map((u)=>u.toJSON())

}

// the below function iteratively deletes each user from the Db
const clearUsers = async()=>{
    await User.deleteMany({})
}

module.exports = {usersInDb, clearUsers}