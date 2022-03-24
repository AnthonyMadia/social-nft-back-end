import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({ 
    text: String,
    date: {
        type: Date,
        default: Date.now 
    },
    author: {type: mongoose.Schema.ObjectId, ref: 'Profile'}

},{ timestamps: true})

const Message = mongoose.model('Message', messageSchema)

export {
    messageSchema,
    Message
}