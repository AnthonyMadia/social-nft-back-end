import { Profile } from "../models/profile.js"
import { ChatHistory } from '../models/chatHistory.js'

function getChatHistories (req, res) {
    console.log('sanity check - getChatHist in messagesCtrl', req.user)
    Profile.findById(req.user.profile)
    .then(profile => 
        profile.populate('chatHistories')
        .then(populatedProfile => res.json(populatedProfile.chatHistories)))
    .catch(err => console.log('MY ERROR From getChatHistories in Messages Controller: ', err))

}

export {
    getChatHistories
}