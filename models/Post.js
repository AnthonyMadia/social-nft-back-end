import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    images: [String],
    caption: String,
    numLikes: Number,
    // comments: [String], to schema
    likedBy: [{type: mongoose.Schema.ObjectId, ref: 'Profile'}],
    dateCreated: {
        type: Date,
        default: Date.now 
    },
},{ timestamps: true})

export {
    postSchema
}