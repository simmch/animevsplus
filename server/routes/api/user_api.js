const express = require("express");
const router = express.Router();
const request = require("request");
const User = require("../models/users")

// @route   GET crown/users/
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {

    try {
        const users = await User.find({})
        res.json(users);
        if (!users) {
            return res
                .status(400)
                .json({ msg: "No users were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/users/$disname
// @desc    Get users by name
// @access  Public
router.get("/:disname", async (req, res) => {

    try {
        const users = await User.findOne({ 'DISNAME' : req.params.disname });
        res.json(users);
        if (!users) {
            return res
                .status(400)
                .json({ msg: "No users were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/users/new
// @desc    Create new user
// @access  Public
router.post("/new", async (req, res) => {

    const {
        DISNAME,
        NAME,
        DID,
        AVATAR,
        IGN,
        GAMES,
        TEAM,
        FAMILY,
        TITLE,
        CARD,
        DECK,
        ARM,
        PET,
        MATCHES,
        TOURNAMENT_WINS,
        PRICE,
        AVAILABLE,
        CROWN_TALES,
        DUNGEONS,
        REFERRED,
        REFERRER,
        TIMESTAMP,
        IS_ADMIN
    } = req.body
    const userFields = {...req.body}

    try {
        let user = await User.findOne({ DISNAME: DISNAME })
        if (user) {
            res.send("User already exist. ")
            return
        }

        user = new User(userFields)
        response = await User.save()
        res.status(200).send("User added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/Users/update
// @desc    Update User info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        DISNAME,
        NAME,
        DID,
        AVATAR,
        IGN,
        GAMES,
        TEAM,
        FAMILY,
        TITLE,
        CARD,
        DECK,
        ARM,
        PET,
        MATCHES,
        TOURNAMENT_WINS,
        PRICE,
        AVAILABLE,
        CROWN_TALES,
        DUNGEONS,
        REFERRED,
        REFERRER,
        TIMESTAMP,
        IS_ADMIN
    } = req.body
    const userFields = {...req.body}

    try {
        await User.updateOne({ DISNAME: DISNAME }, userFields)
        res.status(200).send("User successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/Users/delete
// @desc    Delete a User
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await User.findOneAndRemove({DISNAME: req.body.DISNAME})
        res.status(200).send("User successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router