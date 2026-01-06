const mongoose = require('mongoose')

const commentSchema =new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    content: {
        type:String,
        required:true,
        trim: true
    },
}, {timestamps: true})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})


module.exports = mongoose.model('Comment', commentSchema)