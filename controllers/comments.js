//import { Comment } from "../models/comment"
import { Post } from "../models/post.js"

function create (req, res) {

    console.log("🚀 ~ req", req.body);
    const comment = {text: req.body.commentFormData}
    comment.likedBy = []
    //comment.numLikes = 0
    comment.author = req.user.profile
    comment.post = req.body.postID
    console.log('our new comment: ', comment)
    Post.findById(req.body.postID)
    .then(post => {post.comments.push(comment);post.save().then(res.json(post))})
    .catch(err => console.log('error in creating post: ', err))



    //Post.findById() //console.log('sanity check create comment controller')
    
}

export {
    create
}