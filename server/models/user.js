const mongoose = require('mongoose')
const userSchema =new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    passwordHash: {
        type:String,
        required:true
    },

    role: {
        type:String,
        enum: ['user','author','admin'],
        default:'user'
    },

    bio:String,

    createdAt: {
        type:Date,
        default:Date.now
    }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})


module.exports = mongoose.model('User', userSchema)