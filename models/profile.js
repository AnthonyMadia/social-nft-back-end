import mongoose from 'mongoose'
import { collectionSchema } from './collection.js'


const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  following: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
  collections: {type: [collectionSchema], ref: 'Collection'},
  chatHistories: [{type: mongoose.Schema.Types.ObjectId, ref: "ChatHistory"}],
  bio: String,
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
