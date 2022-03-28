function checkAuthor(req, res, next) {
  console.log(req.body)
  if (req.body.resourceAuthorID == req.user.profile) {
    return next()
  } else {
     return res.status(401).json({ msg: 'Not Authorized - Not the author of the resource' })
  }
  
 
}


export {
  checkAuthor,
}