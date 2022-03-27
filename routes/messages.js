import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
//import { initPost } from '../middleware/post.js'

const router = Router()


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
//router.use(initPost)

//router.get('/', checkAuth, postsCtrl.getNewsFeed)
router.get('/', checkAuth, messagesCtrl.getChatHistories)


export { router }
