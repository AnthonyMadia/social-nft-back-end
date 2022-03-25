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

export { index, show }
