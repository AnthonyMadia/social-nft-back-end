import mongoose from 'mongoose'
import { messageSchema } from './message.js'

const chatHistorySchema = new mongoose.Schema({ 
    messages : {type: [messageSchema]},
    chatHistoryMembers: {type: [mongoose.Schema.ObjectId], ref: 'Profile'}

},{ timestamps: true})

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)

export {
    chatHistorySchema,
    ChatHistory
}