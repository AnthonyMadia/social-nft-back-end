import mongoose from 'mongoose'
import { messageSchema } from './message'

const chatHistorySchema = new mongoose.Schema({ 
    messages : {type: [messageSchema], ref: 'Message'},
    chatHistoryMembers: {type: [mongoose.Schema.ObjectId], ref: 'Profile'}

},{ timestamps: true})

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)

export {
    chatHistorySchema,
    ChatHistory
}