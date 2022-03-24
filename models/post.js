import mongoose from 'mongoose'
import { commentSchema } from './comment'

const postSchema = new mongoose.Schema({
    images: [String],
    caption: String,
    numLikes: Number,
    comments: {type: [commentSchema], ref: 'Comment'},
    likedBy: [{type: mongoose.Schema.ObjectId, ref: 'Profile'}],
    dateCreated: {
        type: Date,
        default: Date.now 
    },
    author: {type: mongoose.Schema.ObjectId, ref: 'Profile'}
    
},{ timestamps: true})

export {
    postSchema
}