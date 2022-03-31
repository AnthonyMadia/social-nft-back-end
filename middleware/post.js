//import * as mongoose from "mongoose"
//import { ObjectId } from "mongoose"

import mongoose from 'mongoose';
//import { Profile } from '../models/profile';



//var ObjectId = require('mongodb').ObjectId;

const initPost = (req,res,next) => {
  

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