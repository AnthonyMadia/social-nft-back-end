import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
// // create routes for /api/profiles
// router.get('/', profilesCtrl.getAllProfiles)
// router.get('/:id', profilesCtrl.getProfileById)
// //create routes for /api/profiles/:id/followers
// router.get('/:id/followers', profilesCtrl.getFollowers)
// router.get('/:id/following', profilesCtrl.getFollowing)
// router.get('/:id/following/:followerId', profilesCtrl.getFollowingById)
// router.get('/:id/followers/:followerId', profilesCtrl.getFollowerById)
// router.post('/:id/followers', profilesCtrl.addFollower)
// router.delete('/:id/followers/:followerId', profilesCtrl.removeFollower)
// //create routes for /api/profiles/:id/posts
// router.get('/:id/posts', profilesCtrl.getPosts)
// router.get('/:id/posts/:postId', profilesCtrl.getPostById)
// router.post('/:id/posts', profilesCtrl.addPost)
// router.delete('/:id/posts/:postId', profilesCtrl.removePost)
// // create routes for /api/profiles/:id/comments
// router.get('/:id/comments', profilesCtrl.getComments)
// router.get('/:id/comments/:commentId', profilesCtrl.getCommentById)
// router.post('/:id/comments', profilesCtrl.addComment)
// router.delete('/:id/comments/:commentId', profilesCtrl.removeComment)
// // create routes for /api/profiles/:id/likes
// router.get('/:id/likes', profilesCtrl.getLikes)
// router.get('/:id/likes/:likeId', profilesCtrl.getLikeById)
// router.post('/:id/likes', profilesCtrl.addLike)
// router.delete('/:id/likes/:likeId', profilesCtrl.removeLike)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:username', checkAuth, profilesCtrl.show)
router.patch('/follow', checkAuth, profilesCtrl.follow)
router.patch('/unfollow', checkAuth, profilesCtrl.unfollow)

export { router }
