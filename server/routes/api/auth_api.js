const express = require("express")
const router = express.Router()
const passport = require("passport");
const isAuth = require("../middleware/isAuthorized")

router.get("/", passport.authenticate('discord'));
router.get("/redirect", passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}))

router.get("/user", isAuth, (req, res) => {
    if(req.user){ 
        res.send({"data": req.user, "authenticated": true}) 
    } else {
        res.send({"message": "User not authenticated. Please login.", "authenticated": false})
    }
    
    
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router