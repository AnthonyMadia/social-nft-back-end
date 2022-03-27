import mongoose from 'mongoose'
import { commentSchema } from './comment.js'

const postSchema = new mongoose.Schema({
    images: {type: [String], required: true},
    caption: {type: String, default:''},
    comments: {type: [commentSchema], ref: 'Comment', default: []},
    likedBy: [{type: mongoose.Schema.ObjectId, ref: 'Profile', default:[]}],
    dateCreated: {
        type: Date,
        default: Date.now 
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
    
},{ timestamps: true})

const Post = mongoose.model('Post', postSchema)

export {
    postSchema,
    Post
}