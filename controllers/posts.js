import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  function addPostToProfile(post,profileID) {
    Profile.findById(profileID)
    .then(profile => {profile.posts.push(post); return profile})
    .then(profile => profile.save())
    .catch(err=>console.log('addPostoProfile Error: ', err))
  }


  req.body.author = req.user.profile
  if (req.body.images === 'undefined' || !req.files['images']) {
    delete req.body['images']
    Post.create(req.body)
    .then(post => {
      post.populate('author')
      .then(populatedPost => {
        addPostToProfile(populatedPost,req.user.profile)
        res.status(201).json(populatedPost)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.images.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.images = image.url
      Post.create(req.body)
      .then(post => {
        post.populate('author')
        .then(populatedPost => {
          addPostToProfile(populatedPost,req.user.profile)
          res.status(201).json(populatedPost)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

function getNewsFeed(req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    console.log(posts)
    res.json(posts)
  })
  .catch(err => {
    console.log('MY ERROR:', err)
    res.status(500).json(err)
  })
}

function getExploreFeed (req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    console.log(posts)
    res.json(posts)
  })
  .catch(err => {
    console.log('MY ERROR:', err)
    res.status(500).json(err)
  })
}

export { 
  create,
  getNewsFeed,
  getExploreFeed
}
