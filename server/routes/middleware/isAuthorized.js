function validator(req, res, next) {
    if (req.user) {
        next();
    } else {        
        // res.redirect("/")
        res.status(401).send({"message": "User not authenticated.", "status": 401})
    }
};

module.exports = validator