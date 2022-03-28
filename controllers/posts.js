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
    //console.log(posts)
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
    //console.log(posts)
    res.json(posts)
  })
  .catch(err => {
    console.log('MY ERROR:', err)
    res.status(500).json(err)
  })
}

function toggleLike(req, res) {
  console.log('sanity check - toggle like controller')
  console.log('req body - ', req.body)

  Post.findById(req.body.postID)
  .then(post => {
    if (post.likedBy == null) post.likedBy = []
    if (post.likedBy?.includes(req.body.profileID)) {
      post.likedBy = post.likedBy.filter(profID => !profID.equals(req.body.profileID))
    } else {
      if (post.likedBy) {
        post.likedBy.push(req.body.profileID)
      } else {
        post.likedBy = [req.body.profileID]
      }
    }
    console.log('finished likedBy: ', post.likedBy)
    post.save()
    res.json(post.likedBy)
  })
}

function deletePost (req, res) {
  //console.log('delete post sanity check', req.body.postID)
  Post.findByIdAndDelete(req.body.postID)
  .then(deletedDoc => res.json(deletedDoc))
  .catch(error => res.status(500).json(error))
}

function update(req, res) {
  cloudinary.uploader.upload(req.files.images.path, {tags: `${req.body.name}`})
  .then(image => {
    Post.findById(req.body.postID)
    .then(post => {
      post.caption = req.body.caption
      post.images = [image.url]
      post.save()
      res.json(post)
    })
    .catch(error => res.status(500).json(error))
  })
  .catch(error => res.status(500).json(error))
}

export { 
  create,
  getNewsFeed,
  getExploreFeed,
  toggleLike,
  deletePost as delete,
  update
}
