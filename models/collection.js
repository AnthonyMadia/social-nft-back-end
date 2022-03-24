import mongoose from 'mongoose'
import { postSchema } from './post.js'

const collectionSchema = new mongoose.Schema({
    Profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    posts: [postSchema],
    numLikes: Number,
    dateCreated: Date,
    dateUpdated: Date,
},{ timestamps: true})

const Collection = mongoose.model('Collection', collectionSchema)

export {
    collectionSchema,
    Collection,
}