function isSignedIn(req, res, next){
    // if(session)
    if (req.session.isSignedIn) {
        
        next()
    } else {
        res.redirect('/signin')
    }
    // console.log(req.session);
}
module.exports = isSignedIn