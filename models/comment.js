import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({ 
    text: String,
    //numLikes: Number,
    likedBy: [{type: mongoose.Schema.ObjectId, ref: 'Profile'}],
    date: {
        type: Date,
        default: Date.now 
    },
    author: {type: mongoose.Schema.ObjectId, ref: 'Profile'},
    post: {type: mongoose.Schema.ObjectId, ref: 'Post'}

},{ timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

export {
    commentSchema,
    Comment
}