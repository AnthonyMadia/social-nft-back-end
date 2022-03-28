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
router.post('/chat-history/new', checkAuth, messagesCtrl.createChatHistory)
router.post('/chat-history/new-message', checkAuth, messagesCtrl.createMessage)


export { router }
