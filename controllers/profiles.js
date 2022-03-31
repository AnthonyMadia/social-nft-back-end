import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show (req, res) {

  //change query to find username not name when username implemented:
  Profile.findOne({email: req.params.username})
  .populate('posts')
  .then(profile => res.json(profile))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function follow(req,res){
  //console.log('Follow req', req.body)
  // followerEmail = req.body.
  Profile.find({email: req.body.followerEmail})
  .then(followerProfile => {
    Profile.find({email: req.body.followeeEmail})
    .then(followeeProfile =>  {
       //console.log('follower/followee email: ', followerProfile[0].email,followeeProfile[0].email)
       

       if (!followerProfile[0].following?.includes(followeeProfile[0]._id)) {
       try {
         followeeProfile[0].followers.push(followerProfile[0]._id)
        } catch (error) {
          followeeProfile[0].followers = [followerProfile[0]._id]
        }

        try {
          followerProfile[0].following.push(followeeProfile[0]._id)

        } catch (error) {
          followerProfile[0].following = [followeeProfile[0]._id]
        }

       } else {
         console.log('Already following')
       }

       followerProfile[0].save()
       followeeProfile[0].save()

      //  console.log('followers: ',followeeProfile[0].followers, followeeProfile[0].followers.length)
      //  console.log('following: ',followerProfile[0].following, followerProfile[0].following.length)
       res.json({followerProfile: followerProfile[0], followeeProfile: followeeProfile[0]})
    })  
  })
}

function unfollow(req,res){
  //console.log('sanity check in unfollow function')
  //console.log('Follow req', req.body)
  // followerEmail = req.body.
  Profile.find({email: req.body.followerEmail})
  .then(followerProfile => {
    Profile.find({email: req.body.followeeEmail})
    .then(followeeProfile =>  {
       //console.log('follower/followee email: ', followerProfile[0].email,followeeProfile[0].email)
       

       if (followerProfile[0].following?.includes(followeeProfile[0]._id)) {
        console.log("🚀 Followee's followers before - ", followeeProfile[0].followers)
        console.log("🚀 Follower's followees before - ", followerProfile[0].following)
        followeeProfile[0].followers = followeeProfile[0].followers.filter(profileId => !(profileId.equals(followerProfile[0]._id)))
        //console.log("🚀 ~ followeeProfile[0].followers", followeeProfile[0].followers);
        followerProfile[0].following = followerProfile[0].following.filter(profileId => !(profileId.equals(followeeProfile[0]._id)))
        console.log("🚀 Followee's followers after - ", followeeProfile[0].followers)
        console.log("🚀 Follower's followees after - ", followerProfile[0].following)


       } else {
         console.log('Already not following')
       }

       followerProfile[0].save()
       followeeProfile[0].save()

      //  console.log('followers: ',followeeProfile[0].followers, followeeProfile[0].followers.length)
      //  console.log('following: ',followerProfile[0].following, followerProfile[0].following.length)
       res.json({followerProfile: followerProfile[0], followeeProfile: followeeProfile[0]})
    })  
  })
}

function showSelect (req, res) {
  Profile.find({_id: {$in: req.body.profileList}})
  .then(profiles => res.json(profiles))
}

function update(req, res) {
  console.log('update: ', req.files)
  cloudinary.uploader.upload(req.files.profilePicture.path, {tags: 'profilePicture'})
  .then(image => {
    Profile.findById(req.user.profile)
    .then(profile => {
      profile.bio = req.body.bio
      profile.profilePicture = image.url
      profile.save()
      res.json(profile)
    })
    .catch(error => res.status(500).json(error))
  })
  .catch(error => res.status(500).json(error))
}

function getSuggestions (req, res) {
  //console.log('get suggestions sanity check')
  Profile.find({})
  .then(profiles => {
    profiles.sort((a,b)=> b.followers.length - a.followers.length)
    if (profiles.length < 10) {
      res.json(profiles)
    }
    else {
      profiles = profiles.slice(0,10)
      console.log('popular profiles: ', profiles)
      res.json(profiles)
    }
  })
}

export { index, show, follow, unfollow, showSelect, update, getSuggestions }
