import mongoose from 'mongoose'
import { collectionSchema } from './collection.js'


const profileSchema = new mongoose.Schema({
  profilePicture: {type: String, default: 'http://res.cloudinary.com/dijfte1iv/image/upload/v1648513770/zw5mmfafb3cxdxjsbhyd.jpg'},
  username: {type: String, minlength: 1},
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
