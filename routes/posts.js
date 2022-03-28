import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import { checkAuthor } from '../middleware/author.js'
import { initPost } from '../middleware/post.js'

const router = Router()


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.use(initPost)

//router.get('/', checkAuth, postsCtrl.getNewsFeed)
router.get('/newsfeed', checkAuth, postsCtrl.getNewsFeed)
router.get('/explore', checkAuth, postsCtrl.getExploreFeed)
router.post('/', checkAuth, postsCtrl.create)
router.patch('/likes', checkAuth, postsCtrl.toggleLike)

router.delete('/delete', checkAuth, checkAuthor, postsCtrl.delete)


export { router }
