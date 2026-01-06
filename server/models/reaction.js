const mongoose = require('mongoose')

const reactionSchema =new mongoose.Schema({
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

type: {
type:String,
enum: ['like','dislike'],
required:true
  }
})

reactionSchema.index({article:1,user:1 }, {unique:true })


reactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Reactions', reactionSchema)
