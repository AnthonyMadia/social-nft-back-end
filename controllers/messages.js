import { Profile } from "../models/profile.js"
import { ChatHistory } from '../models/chatHistory.js'

function getChatHistories (req, res) {
    Profile.findById(req.user.profile)
    .then(profile => 
        profile.populate('chatHistories')
        .then(populatedProfile => res.json(populatedProfile.chatHistories)))
    .catch(err => console.log('MY ERROR From getChatHistories in Messages Controller: ', err))

}

function createChatHistory (req, res) {

    function pushCreatedChatHistoryID (profile, createdChatHistoryID) {
        try {
            profile.chatHistories.push(createdChatHistoryID)
        } catch (error) {
            console.log('whaaaaaaaaaaaaaaaaaaaaaaat!!!!!!!!!!!!!!!!!!!', error)
            profile.chatHistories = [createdChatHistoryID]
        }

        profile.save()
    }

    //console.log('create chat history: ', req.user.profile)
    let ourProfileID = req.user.profile
    let othersProfileID = req.body.othersProfileID
    let newChatHistory = {messages:[], chatHistoryMembers: [ourProfileID, othersProfileID]}

    Profile.findById(ourProfileID)
    .then(ourProfile => {
        Profile.findById(othersProfileID)
        .then(othersProfile => {
            ChatHistory.create(newChatHistory)
            .then(createdChatHistory => {
                console.log('asldkjflsdjkf: ', ourProfileID, othersProfileID)
                if (ourProfile && othersProfile && ourProfileID && othersProfileID && (ourProfileID != othersProfileID) && (createdChatHistory.chatHistoryMembers.length === 2)) {
                    console.log('making chat history!!!!!!!!!!!!!!!!!!!!!!!!!')
                    pushCreatedChatHistoryID(ourProfile, createdChatHistory._id)
                    pushCreatedChatHistoryID(othersProfile, createdChatHistory._id)
                    return res.json(createdChatHistory)                    
                } else {
                    return 
                }
            })
        })
    })

}

function createMessage(req, res) {
    console.log('createMessage is running!!!!!!!', req.body)
    ChatHistory.findById(req.body.chatHistory)
    .then(chatHistory => {
        let newMessage = {author: req.body.author, text: req.body.text}
        try{
            if (chatHistory.messages) {
                chatHistory.messages.push(newMessage)
            } else {
                chatHistory.messages = [newMessage]
            }
        }

        catch (error) {
            console.log('why did it crash?', error)
            return
        }


        chatHistory.save()
        res.json(chatHistory)
    })
    
}

export {
    getChatHistories,
    createChatHistory,
    createMessage
}