import { Post } from '../models/post.js'
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  console.log('req:' ,req.body)
  req.body.author = req.user.profile
  console.log('BODY.Author is', req.body.author)
  if (req.body.images === 'undefined' || !req.files['images']) {
    delete req.body['images']
    Post.create(req.body)
    .then(post => {
      post.populate('author')
      .then(populatedPost => {
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
  console.log('author is!!!:', req.body.author)
  Post.find({})
  //.populate('author')
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    console.log('MY ERROR:', err)
    res.status(500).json(err)
  })
}

export { 
  create,
  getNewsFeed
}
