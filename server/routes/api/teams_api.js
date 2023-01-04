const express = require("express");
const router = express.Router();
const request = require("request");
const User = require("../models/teams")

// @route   GET pcg/teams/
// @desc    Get all teams
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

// @route   GET pcg/teams/
// @desc    Get all teams
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

// @route   GET pcg/teams/$OWNER
// @desc    Get team by owner
// @access  Public
router.get("/:owner", async (req, res) => {

    try {
        const team = await Team.findOne({ 'OWNER' : req.params.owner });
        res.json(team);
        if (!team) {
            return res
                .status(400)
                .json({ msg: "No teams were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/teams/$TNAME
// @desc    Get team by team name
// @access  Public
router.get("/:tname", async (req, res) => {
    console.log(req.params.tname)

    try {
        const team = await Team.findOne({ 'TNAME' : req.params.tname });
        res.json(team);
        if (!team) {
            return res
                .status(400)
                .json({ msg: "No teams were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST pcg/users/new
// @desc    Create new team
// @access  Public
router.post("/new", async (req, res) => {

    const {
        OWNER,
        TNAME,
        MEMBERS,
        TOURNAMENT_WINS,
        SCRIM_WINS,
        SCRIM_LOSSES,
        GAMES,
        LOGO_URL,
        LOGO_FLAG,
        BADGES,
        TIMESTAMP
    } = req.body
    const teamFields = {...req.body}

    try {
        let team = await Team.findOne({ OWNER: OWNER })
        if (team) {
            res.send("Team already exist. ")
            return
        }

        team = new Team(teamFields)
        response = await Team.save()
        res.status(200).send("Team added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST pcg/Users/update
// @desc    Update User info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        OWNER,
        TNAME,
        MEMBERS,
        TOURNAMENT_WINS,
        SCRIM_WINS,
        SCRIM_LOSSES,
        GAMES,
        LOGO_URL,
        LOGO_FLAG,
        BADGES,
        TIMESTAMP
    } = req.body
    const teamFields = {...req.body}

    try {
        await Team.updateOne({ OWNER: OWNER }, teamFields)
        res.status(200).send("Team successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE pcg/team/delete
// @desc    Delete a Team
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Team.findOneAndRemove({OWNER: req.body.OWNER})
        res.status(200).send("Team successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router