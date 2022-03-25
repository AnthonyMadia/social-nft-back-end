//import * as mongoose from "mongoose"
//import { ObjectId } from "mongoose"

import mongoose from 'mongoose';
//import { Profile } from '../models/profile';



//var ObjectId = require('mongodb').ObjectId;

const initPost = (req,res,next) => {
  //console.log(typeof req.user.profile)
  console.log('USER PROFILE:', req.user.profile)
  
  
  //try {
    //let profile = req.user.profile
    //console.log('type of objectId: ',typeof mongoose.Schema.ObjectId)
    //if (req.user.profile) req.body.author = new mongoose.Types.ObjectId(profile)
  //} catch (err) {
    //console.log('err: ', err)
    //req.body.author = ''
  //}
  
  //console.log('Author is: ', req.body.author)
  //Profile.find({})

  req.body.author = req.user.profile //new mongoose.Types.ObjectId(req.user.profile)
  //req.body.likedBy = []
  //req.body.comments = []
  if (!req.body.dateCreated){
    delete req.body.dateCreated
  }
  //console.log(req.body)
  next()
}

export {
  initPost
}