import { Profile } from '../models/profile.js'

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
       try{
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

export { index, show, follow }
