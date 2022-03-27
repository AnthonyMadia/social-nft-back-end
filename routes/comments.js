import { Router } from 'express'
import * as commentsCtrl from '../controllers/comments.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
//import { initPost } from '../middleware/post.js'

const router = Router()


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
//router.use(initPost)

//router.get('/', checkAuth, postsCtrl.getNewsFeed)
//// router.get('/newsfeed', checkAuth, postsCtrl.getNewsFeed)
//// router.get('/explore', checkAuth, postsCtrl.getExploreFeed)
//router.post('/', checkAuth, postsCtrl.create)

router.post('/', checkAuth, commentsCtrl.create)
router.patch('/likes', checkAuth, commentsCtrl.toggleLike)

export { router }
